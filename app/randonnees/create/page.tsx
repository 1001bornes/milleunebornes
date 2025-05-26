"use client";
import RandonneeCreateForm from "@/components/ui/randonnees/randonnee-create-form";
import { createRandonnee } from "@/lib/actions";

export default function CreateRandonneePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Création d'une nouvelle randonnée ȧ concevoir</h1>
            <RandonneeCreateForm onSubmit={(randonnee) => createRandonnee(randonnee)} />
        </div>
    );
}