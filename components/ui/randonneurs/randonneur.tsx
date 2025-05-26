import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectRandonneur } from '@/lib/randonneursDb';
import { ProfileImage } from '@/components/ui/profile-image';

export function Randonneur({ randonneur, displayFonction, role }
  : Readonly<{ randonneur: SelectRandonneur; displayFonction?: boolean, role?: string }>) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <ProfileImage url_photo={randonneur.image ?? randonneur.url_photo} nom={randonneur.nom} role={role} />
      </TableCell>
      <TableCell className="font-medium capitalize">{randonneur.nom}</TableCell>
      {displayFonction && (
        <TableCell className="font-medium capitalize">
          {randonneur.fonction_CA ? randonneur.fonction_CA : "Aucune fonction"}
        </TableCell>
      )}
      <TableCell className="font-medium">{randonneur.no_tel}</TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            {/*<DropdownMenuItem>
              <form action={deleteRandonneur}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem> */}
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
