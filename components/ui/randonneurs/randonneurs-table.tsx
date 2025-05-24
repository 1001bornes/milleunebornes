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
import { Randonneur } from '@/components/ui/randonneurs/randonneur';
import { SearchInput } from '@/components/ui/search';
import { getRandonneurs, RandonneursFilter } from '@/lib/randonneursDb';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { ExportRandonneurs } from './export-randonneurs';

export async function RandonneursTable({ randonneursFilter, currentPage,  randonneursPerPage } :
  Readonly<{randonneursFilter: RandonneursFilter; currentPage: number; randonneursPerPage: number}>) {
        const { randonneurs } = await getRandonneurs(
          randonneursFilter,
          currentPage,
          randonneursPerPage
        );
      
    
  function getPageTitle(typeRandonneurs: string) {
    switch (typeRandonneurs) {
      case 'CA':
        return "membres du conseil d'administration";
      case 'animateurs':
        return 'animateurs';
      case 'all':
        return 'randonneurs';
      default:
        return 'Tous les randonneurs';
    };
  }

  const pageTitle = getPageTitle(randonneursFilter.randonneurType);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CardTitle className="text-transform: capitalize">{pageTitle}</CardTitle>
          <SearchInput searchTerm={randonneursFilter.search?? ''} />
          <div className="ml-auto flex items-center gap-2">
            <ExportRandonneurs filename={pageTitle} randonneurs={randonneurs} />
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter un randonneur
              </span>
            </Button>
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
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nom</TableHead>
              <TableHead>Prénom</TableHead>
              <TableHead className="hidden md:table-cell">Téléphone</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {randonneurs.map((randonneur) => (
              <Randonneur key={randonneur.id} randonneur={randonneur} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          <strong> {randonneurs.length}</strong> {pageTitle}
        </div>
      </CardFooter>
    </Card>
  );
}
