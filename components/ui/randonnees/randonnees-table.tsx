import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Randonnee } from '@/components/ui/randonnees/randonnee';
import { SearchInput } from '@/components/ui/search';
import { getRandonnees, RandonneesFilter } from '@/lib/randonneesDb';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Pagination from '../pagination';
import { ExportRandonnees } from './export-randonnees';
import Link from 'next/link';

export async function RandonneesTable({ randonneesFilter, currentPage, randonneesPerPage }:
  Readonly<{ randonneesFilter: RandonneesFilter; currentPage: number; randonneesPerPage: number; }>) {

  const { randonnees, totalPages } = await getRandonnees(
    randonneesFilter,
    currentPage,
    randonneesPerPage
  );

  function getPageTitle(typeRandonnees: string[]) {
    return typeRandonnees.join(', ');
  }

  const pageTitle = getPageTitle(randonneesFilter.randonneesStatuts);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CardTitle className="text-transform: capitalize">{pageTitle}</CardTitle>
          <SearchInput searchTerm={randonneesFilter.search ?? ''} />
          <div className="ml-auto flex items-center gap-2">
            <ExportRandonnees filename={pageTitle} randonnees={randonnees} />
            <Link href="/randonnees/create" className="no-underline">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Ajouter une randonnée
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <CardDescription>
          Liste des {pageTitle}.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rendez-vous</TableHead>
              <TableHead>Type de randonnée</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Animateurs</TableHead>
              <TableHead>Parcours OpenRunner</TableHead>
              <TableHead>Lieu du rendez-vous</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {randonnees.map((randonnee) => (
              <Randonnee key={randonnee.id} randonnee={randonnee} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong> {randonnees.length}</strong> {pageTitle}
        </div>
        <div className="ml-auto">
          <Pagination
            totalPages={totalPages}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
