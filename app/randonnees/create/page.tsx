import RandonneeEditForm from "@/components/ui/randonnees/randonnee-edit-form";
import { createRandonnee } from "@/lib/actions";

export default async function CreateRandonneePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Création d'une nouvelle randonnée ȧ concevoir</h1>
            <RandonneeEditForm onSubmit={(randonnee) => createRandonnee(randonnee)} />
        </div>
    );
}