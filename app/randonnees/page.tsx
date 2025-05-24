import { RandonneesTable } from '@/components/ui/randonnees/randonnees-table';
import { RandonneesFilter } from '@/lib/randonneesDb';

export default async function RandonneursPage(
  props: Readonly<{
    searchParams: Promise<{ page: string; q: string | null; type: string | null }>;
  }>
) {
  const searchParams = await props.searchParams;
  const nameSearch = searchParams.q ?? null;
  const currentPage = Number(searchParams.page) || 1;

  let randonneesPerPage = 5;
  const randonneesFilter: RandonneesFilter = {
    search: nameSearch,
    randonneesStatuts: ['Programmée', 'A reconnaître', 'Terminée']
  };

  return (
    <RandonneesTable
      randonneesFilter={randonneesFilter}
      currentPage={currentPage}
      randonneesPerPage={randonneesPerPage}
    />
  );
}
