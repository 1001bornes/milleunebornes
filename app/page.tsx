'use server'
 
import { redirect } from 'next/navigation'
 
export async function AppPage() {
  redirect(`/randonneurs`) // Navigate to the new post page
}