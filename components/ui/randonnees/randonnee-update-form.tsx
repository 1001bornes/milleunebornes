"use client";
import RandonneeEditForm from "@/components/ui/randonnees/randonnee-edit-form";
import { updateRandonnee } from "@/lib/actions";
import { SelectRandonnee } from "@/lib/randonneesDb";
import { SelectRandonneur, SelectRandonneurWithRole } from "@/lib/randonneursDb";

export default function RandonneeUpdateForm({
    randonnee,
    allAnimateurs,
    animateurs,
    isAnimateur,
}: Readonly<{
    randonnee?: SelectRandonnee;
    allAnimateurs: SelectRandonneur[];
    animateurs: SelectRandonneurWithRole[];
    isAnimateur: boolean;
}>) {
    return (
        <RandonneeEditForm randonnee={randonnee} allAnimateurs={allAnimateurs} animateurs={animateurs} action={(randonnee) => updateRandonnee(randonnee)}  isAnimateur={isAnimateur} />
    );
}
