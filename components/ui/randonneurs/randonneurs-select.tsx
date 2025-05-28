"use client";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableFooter,
  TableCell
} from '@/components/ui/table';
import { Randonneur } from '@/components/ui/randonneurs/randonneur';
import { SelectRandonneur } from '@/lib/randonneursDb';
import { useState } from 'react';
import { Button } from '../button';
import { UsersRound } from 'lucide-react';

export function RandonneursSelect({ randonneeId, randonneurs, initialSelected, typeRandonneur, action }:
  Readonly<{
    randonneeId: number;
    randonneurs: SelectRandonneur[];
    initialSelected: SelectRandonneur[];
    typeRandonneur: string;
    action: ((randonneeId: number, typeRandonneur: string, selectedRandonneurs: SelectRandonneur[]) => void | Promise<void>)
  }>) {


  const selectedRandonneurs = new Map<string, SelectRandonneur>();
  const [showSelectAnimateur, setShowSelectAnimateur] = useState(false);

  initialSelected?.forEach((selectedRandonneur) =>
    selectedRandonneurs.set(selectedRandonneur.id, selectedRandonneur));

  return (
    <>
      <Button type="button" onClick={() => setShowSelectAnimateur(!showSelectAnimateur)} className="py-2 px-4 border border-gray-400 rounded-lg shadow">
        {!showSelectAnimateur &&
          (
            <UsersRound className="ml-auto h-5 w-5 text-gray-50 rounded-lg" />
          )
        }
      </Button>
      {showSelectAnimateur &&
        <form action={async () => {
          await action(randonneeId, typeRandonneur, selectedRandonneurs.values().toArray())
        }} >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Tél</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                randonneurs.map((randonneur) =>
                (
                  <Randonneur
                    key={randonneur.id}
                    randonneur={randonneur}
                    displayFonction={false}
                    selected={initialSelected.filter((item) => item.id === randonneur.id).length > 0}
                    onSelect={(selectedRandonneur, isSelected) => {
                      console.log((isSelected ? "Adding " : "Removing ") + " " + selectedRandonneur.id);
                      isSelected
                        ? selectedRandonneurs.set(selectedRandonneur.id, selectedRandonneur)
                        : selectedRandonneurs.delete(selectedRandonneur.id);
                    }}
                  />
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell />
                <TableCell />
                <TableCell className="flex justify-end space-x-2">
                  <button type="button" className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => setShowSelectAnimateur(false)}>Annuler</button>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Modifier</button>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </form>
      }
    </>
  );
}
