import React from "react"
import { redirect } from 'next/navigation'
 
export default function AppPage() {
  redirect('/randonnees') // Navigate to the randonnees page
  return (
    <>
    </>
  );
}