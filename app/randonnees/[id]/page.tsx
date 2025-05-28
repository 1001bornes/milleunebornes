import RandonneeEditForm from "@/components/ui/randonnees/randonnee-edit-form";
import { getRandonneeById, getRandonneeUsersId } from "@/lib/randonneesDb";
import { getRandonneurs, RandonneursFilter } from "@/lib/randonneursDb";

export default async function EditRandonneePage(props: { params: Promise<{ id: number }> }) {
    const params = await props.params;
    const id = params.id;
    const randonnee = await getRandonneeById(id);
    const randonneurQuery: RandonneursFilter = {
        search: '',
        randonneurType: 'animateurs'
    };


    const { randonneurs } = await getRandonneurs(randonneurQuery, 0, 1000)
    const allAnimateurs = randonneurs;
    let animateurs = await getRandonneeUsersId(id, true);
    return (
        <RandonneeEditForm randonnee={randonnee} allAnimateurs={allAnimateurs} animateurs={animateurs} ></RandonneeEditForm>
    )

}