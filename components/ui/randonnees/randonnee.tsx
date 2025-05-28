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
import { getRandonneeUsersId, SelectRandonnee } from '@/lib/randonneesDb';
import Link from 'next/link';
import { cn, formatDateToLocal } from '@/lib/utils';
import { ProfileImage } from '../profile-image';

export async function Randonnee({ randonnee }: Readonly<{ randonnee: SelectRandonnee }>) {

  let animateurs = await getRandonneeUsersId(randonnee.id, true);
  let distance_denivele = "";
  if (randonnee.distance_km) {
    distance_denivele = "(" + randonnee.distance_km + 'km' + (randonnee.denivele_m ? " " + randonnee.denivele_m + 'm' : "") + ")";
  }
  const typeRandonnee = randonnee.type_rando + " " + distance_denivele;
  let classDateProgrammation = "{classDateProgrammetion} font-medium capitalize";
  if (randonnee.is_programmation_speciale)
    classDateProgrammation += " text-red-500";
  let classLieuDepart = "font-medium";
  if (randonnee.is_lieu_depart_special)
    classLieuDepart += " text-red-500";
  return (
    <TableRow>
      <TableCell className={cn(classDateProgrammation)}>{formatDateToLocal(randonnee.programmation_time)}</TableCell>
      <TableCell className="font-medium">
        {typeRandonnee}
        {randonnee.note_speciale &&
          <>
            <br />
            <span className="text-xs text-muted-foreground text-red-500">
              {randonnee.note_speciale}
            </span>
          </>
        }
      </TableCell>
      <TableCell className="font-medium capitalize">{randonnee.description}</TableCell>
      <TableCell className="font-medium">
        <Link href="/randonneurs?type=animateurs">
          <span className="flex  overflow-auto gap-2">
            {animateurs.map((animateur) => (
              <ProfileImage key={animateur.id} url_photo={animateur.image ?? animateur.url_photo} nom={animateur.nom} role={animateur.role} />
            ))}
          </span>
        </Link>
      </TableCell>
      <TableCell className="font-medium">
        <Link href={`https://www.openrunner.com/route-details/${randonnee.id_openrunner}`} target="_blank">
          {randonnee.id_openrunner}
        </Link>
        &nbsp;
        <Link href={`https://api.openrunner.com/api/v2/routes/${randonnee.id_openrunner}/export/gpx-track`}>
          (GPX)
        </Link>
        <br />
        <Link href={`${randonnee.parcours_openrunner}`} target="_blank">
          {randonnee.localisation}
        </Link>
      </TableCell>
      <TableCell className={cn(classLieuDepart)}>
        {randonnee.lieu_depart}
      </TableCell>
      <TableCell >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={'/randonnees/' + randonnee.id}>
                <span>Edit</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
