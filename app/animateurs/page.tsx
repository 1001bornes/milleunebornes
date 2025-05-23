import { RandonneursTable } from '@/components/ui/randonneurs/randonneurs-table';
import { RandonneursFilter, getRandonneurs } from '@/lib/randonneursDb';

export default async function AnimateursPage(
  props: Readonly<{
    searchParams: Promise<{ offset: string; q: string | null; type: string | null }>;
  }>
) {
  const searchParams = await props.searchParams;
  const nameSearch = searchParams.q ?? null;
    let randonneursPerPage = 1000;
    let requestedOffset: number = 0;
    const randonneurQuery :RandonneursFilter = {
            search: nameSearch,
            randonneurType: 'animateurs'
          };
    const { randonneurs } = await getRandonneurs(
      randonneurQuery,
      requestedOffset,
      randonneursPerPage
    );
  
  return (
        <RandonneursTable
          randonneurs={randonneurs}
          typeRandonneurs={randonneurQuery.randonneurType}
          nameSearch={nameSearch?? ''}
        />
  );
}
