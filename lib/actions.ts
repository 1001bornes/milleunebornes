'use server';

import { revalidatePath } from "next/cache";
import { deleteRandonneeById, InsertRandonnee, randonnees } from "./randonneesDb";
import { db } from "./db";

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
