'use server';

import { revalidatePath } from "next/cache";
import {
  convertToRoleRandonneesEnum,
  deleteRandonneeById,
  getRandonneeUsersId,
  InsertRandonnee,
  InsertRandonneeUsers,
  randonnees,
  randonneesUsers
} from "./randonneesDb";
import { db } from "./db";
import { SelectRandonneur } from "./randonneursDb";
import { and, eq } from "drizzle-orm";

export async function deleteRandonnee(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteRandonneeById(id);
  revalidatePath('/');
}

export async function createRandonnee(randonnee: InsertRandonnee) {
  "use server";
  // Handle form submission logic here
  console.log('Form data submitted:', randonnee);
  db.insert(randonnees).values(randonnee).execute();
  revalidatePath('/randonnees');
}

export async function updateRandonneeAnimateurs(randonneeId: number, typeRandonneur: string, randonneurs: SelectRandonneur[]) {
  "use server";

  let typeRandonneurEnum = convertToRoleRandonneesEnum([typeRandonneur])[0];
  const prevAnimateurs = new Map((await getRandonneeUsersId(randonneeId, true))
    .filter(randonneur => randonneur.role === typeRandonneur)
    .map(randonneur => [randonneur.id, randonneur] as const));
  console.log("prevAnimateurs", prevAnimateurs);
  const newAnimateurs = new Map(randonneurs.map(randonneur => [randonneur.id, randonneur] as const));
  console.log("newAnimateurs", newAnimateurs);
  const deletedAnimateurs = prevAnimateurs.keys().filter(prevAnimateurId => newAnimateurs.has(prevAnimateurId) === false);
  deletedAnimateurs.forEach(randonneurId => {
    console.log("deletedAnimateurs", randonneurId, typeRandonneurEnum);
    db.delete(randonneesUsers)
      .where(and(
        eq(randonneesUsers.randonnee_id, randonneeId),
        eq(randonneesUsers.user_id, randonneurId),
        eq(randonneesUsers.role_randonnee, typeRandonneurEnum)))
      .execute();
  });
  const addeedAnimateurs = newAnimateurs.values().filter(newAnimateur => !prevAnimateurs.has(newAnimateur.id));
  console.log("addedAnimateurs", addeedAnimateurs);
  addeedAnimateurs.forEach(randonneur => {
    console.log("addedAnimateurs", randonneur);
    let randonneeUser: InsertRandonneeUsers = {
      randonnee_id: randonneeId,
      user_id: randonneur.id,
      role_randonnee: typeRandonneurEnum
    }
    db.insert(randonneesUsers)
      .values(randonneeUser)
      .execute();
  });
  revalidatePath('/randonnees');

}


