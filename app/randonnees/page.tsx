import { RandonneesTable } from '@/components/ui/randonnees/randonnees-table';
import { RandonneesFilter, getRandonnees } from '@/lib/randonneesDb';

export default async function RandonneursPage(
  props: Readonly<{
    searchParams: Promise<{ page: string; q: string | null; type: string | null }>;
  }>
) {
  const searchParams = await props.searchParams;
  const nameSearch = searchParams.q ?? null;
  const currentPage = Number(searchParams.page) || 1;

    let randonneursPerPage = 5;
    const randonneesQuery :RandonneesFilter = {
            search: nameSearch,
            randonneurType: 'all'
          };
    const { randonnees, totalPages } = await getRandonnees(
      randonneesQuery,
      currentPage,
      randonneursPerPage
    );
  
  return (
        <RandonneesTable
          randonnees={randonnees}
          typeRandonneurs={randonneesQuery.randonneurType}
          nameSearch={nameSearch?? ''}
          totalPages={totalPages}
        />
  );
}
