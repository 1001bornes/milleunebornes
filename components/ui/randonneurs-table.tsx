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
import { Randonneur } from '@/components/ui/randonneur';
import { SearchInput } from '@/components/ui/search';
import { SelectRandonneur } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export function RandonneursTable({ randonneurs, typeRandonneurs, nameSearch }:
  Readonly<{ randonneurs: SelectRandonneur[]; typeRandonneurs: string; nameSearch: string }>) {

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

  function createCsvContent(randonneurs: SelectRandonneur[]) {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Nom,Prénom,No Tél\n" +
      randonneurs.map(randonneur =>
        `"${randonneur.nom},${randonneur.prenom},${randonneur.no_tel}"`
      ).join("\n");
    console.log(csvContent);
    return encodeURI(csvContent);
  }

  function downloadCSV() {
    console.log("downloadCSV");
    const csvContent = createCsvContent(randonneurs);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "randonneurs.csv");
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
