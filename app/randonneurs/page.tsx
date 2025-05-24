import { RandonneursTable } from '@/components/ui/randonneurs/randonneurs-table';
import { RandonneursFilter } from '@/lib/randonneursDb';

export default async function RandonneursPage(
  props: Readonly<{
    searchParams: Promise<{ page: string; q: string | null; type: string | null }>;
  }>
) {
  const searchParams = await props.searchParams;
  const nameSearch = searchParams.q ?? null;
  const typeRandonneurs = searchParams.type ?? 'all';
  let randonneursPerPage = 1000;
  const currentPage = Number(searchParams.page) || 1;
  const randonneurQuery: RandonneursFilter = {
    search: nameSearch,
    randonneurType: typeRandonneurs
  };
  return (
    <RandonneursTable
      randonneursFilter={randonneurQuery}
      currentPage={currentPage}
      randonneursPerPage={randonneursPerPage}
    />
  );
}
