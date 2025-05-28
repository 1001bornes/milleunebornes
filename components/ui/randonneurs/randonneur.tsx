"use client";

import { TableCell, TableRow } from '@/components/ui/table';
import { SelectRandonneur } from '@/lib/randonneursDb';
import { ProfileImage } from '@/components/ui/profile-image';

export function Randonneur({ randonneur, displayFonction, role, onSelect, selected }
  : Readonly<{
    randonneur: SelectRandonneur; displayFonction?: boolean, role?: string;
    onSelect?: (selectedRandonneur: SelectRandonneur, isSelected: boolean) => void;
    selected: boolean
  }>) {
  return (
    <TableRow aria-selected={selected} onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      const currentAriaChecked = (e.currentTarget.getAttribute("aria-selected") === 'true');
      e.currentTarget.setAttribute("aria-selected", currentAriaChecked ? "false" : "true");
      if (onSelect)
        onSelect(randonneur, !currentAriaChecked)
    }
    }>
      <TableCell className="hidden sm:table-cell">
        <ProfileImage url_photo={randonneur.image ?? randonneur.url_photo} nom={randonneur.nom} role={role} />
      </TableCell>
      <TableCell className={"font-medium capitalize"}>{randonneur.nom}</TableCell>
      {displayFonction && (
        <TableCell className="font-medium capitalize">
          {randonneur.fonction_CA ? randonneur.fonction_CA : "Aucune fonction"}
        </TableCell>
      )}
      <TableCell className="font-medium">{randonneur.no_tel}</TableCell>
    </TableRow>
  );
}
