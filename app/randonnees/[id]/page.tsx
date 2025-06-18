import RandonneeEditForm from "@/components/ui/randonnees/randonnee-edit-form";
import { Tabs } from "radix-ui";
import { isUserAnimateur } from "@/lib/auth";
import { getRandonneeById, getRandonneeUsersId } from "@/lib/randonneesDb";
import { getRandonneurs, RandonneursFilter } from "@/lib/randonneursDb";

export default async function EditRandonneePage(props: Readonly<{ params: Promise<{ id: number }> }>) {
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
    let isAnimateur = await isUserAnimateur();
    const tabsStyle = "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm";
    const tabsContentStyle = "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

    return (
        <Tabs.Root defaultValue={isAnimateur ? "randonnee" : "participants"} orientation="vertical">
            <Tabs.List aria-label="Randonnée" className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                {isAnimateur &&
                    <Tabs.Trigger value="randonnee" className={tabsStyle}>Randonnée</Tabs.Trigger>
                }
                <Tabs.Trigger value="participants" className={tabsStyle}>Participants</Tabs.Trigger>
                <Tabs.Trigger value="affectation-voiture" className={tabsStyle}>Affectation voitures</Tabs.Trigger>
            </Tabs.List>
            {isAnimateur &&
                <Tabs.Content value="randonnee" className={tabsContentStyle}>
                    <RandonneeEditForm randonnee={randonnee} allAnimateurs={allAnimateurs} animateurs={animateurs} isAnimateur={isAnimateur}></RandonneeEditForm>
                </Tabs.Content>
            }
            <Tabs.Content value="participants" className={tabsContentStyle}>
                Participants
            </Tabs.Content>
            <Tabs.Content value="affectation-voiture" className={tabsContentStyle}>
                Affectation voitures
            </Tabs.Content>
        </Tabs.Root>
    )

}