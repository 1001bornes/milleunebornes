import { RandonneursTable } from '@/components/ui/randonneurs-table';
import { RandonneurQuery } from '@/lib/randonneurQuery';
import { getRandonneurs } from '@/lib/db';

export default async function RandonneursPage(
  props: Readonly<{
    searchParams: Promise<{ offset: string; q: string | null; type: string | null }>;
  }>
) {
  const searchParams = await props.searchParams;
  const nameSearch = searchParams.q ?? null;
    let randonneursPerPage = 1000;
    let requestedOffset: number = 0;
    const randonneurQuery :RandonneurQuery = {
            search: nameSearch,
            randonneurType: 'all'
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
