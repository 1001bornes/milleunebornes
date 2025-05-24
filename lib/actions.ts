'use server';

import { revalidatePath } from "next/cache";
import { deleteRandonneeById } from "./randonneesDb";

export async function deleteRandonnee(formData: FormData) {
  let id = Number(formData.get('id'));
  await deleteRandonneeById(id);
  revalidatePath('/');
}
