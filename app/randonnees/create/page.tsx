import RandonneeEditForm from "@/components/ui/randonnees/randonnee-edit-form";
import { createRandonnee } from "@/lib/actions";
import { getRandonneurs, RandonneursFilter, SelectRandonneurWithRole } from "@/lib/randonneursDb";

export default async function CreateRandonneePage() {
    const randonneurQuery: RandonneursFilter = {
        search: '',
        randonneurType: 'animateurs'
    };
    const { randonneurs } = await getRandonneurs(randonneurQuery, 0, 1000)
    const allAnimateurs = randonneurs;
    let animateurs:SelectRandonneurWithRole[] = [];
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Création d'une nouvelle randonnée ȧ concevoir</h1>
            <RandonneeEditForm allAnimateurs={allAnimateurs} animateurs={animateurs} onSubmit={(randonnee) => createRandonnee(randonnee)} />
        </div>
    );
}