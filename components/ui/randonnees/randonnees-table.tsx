"use client";
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
import { SelectRandonnee } from '@/lib/randonneesDb';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Pagination from '../pagination';

export function RandonneesTable({ randonnees, typeRandonneurs, nameSearch, totalPages }:
  Readonly<{ randonnees: SelectRandonnee[]; typeRandonneurs: string; nameSearch: string; totalPages: number; }>) {

  function getPageTitle(typeRandonneurs: string) {
    switch (typeRandonneurs) {
      case 'CA':
        return "membres du conseil d'administration";
      case 'animateurs':
        return 'animateurs';
      case 'all':
        return 'randonnées';
      default:
        return 'Tous les randonnées';
    };
  }

  function createCsvContent(randonnees: SelectRandonnee[]) {
    const csvContent = "data:text/csv;charset=utf-8," +
      '"Nom","Prénom","No Tél"\n' +
      randonnees.map(randonnee =>
        [
          randonnee.description,
          // randonnee.prenom,
          // randonnee.no_tel
        ]
          .map(str => str == null ? "" : `"${str.replace(/"/g, '"')}"`)
          .join(","))
        .join("\n");
    console.log(csvContent);
    return encodeURI(csvContent);
  }

  function downloadCSV() {
    const csvContent = createCsvContent(randonnees);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", pageTitle + ".csv");
    document.body.appendChild(link);
    link.click();
  };

  const pageTitle = getPageTitle(typeRandonneurs);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <CardTitle className="text-transform: capitalize">{pageTitle}</CardTitle>
          <SearchInput searchTerm={nameSearch} />
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1" onClick={downloadCSV}>
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Ajouter une randonnée
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
