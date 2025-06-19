"use client";
import RandonneeEditForm from "@/components/ui/randonnees/randonnee-edit-form";
import { createRandonnee } from "@/lib/actions";
import { SelectRandonneur, SelectRandonneurWithRole } from "@/lib/randonneursDb";

export default function RandonneeCreateForm({
    allAnimateurs,
    animateurs,
    isAnimateur,
}: Readonly<{
    allAnimateurs: SelectRandonneur[];
    animateurs: SelectRandonneurWithRole[];
    isAnimateur: boolean;
}>) {
    return (
        <RandonneeEditForm allAnimateurs={allAnimateurs} animateurs={animateurs} action={(randonnee) => createRandonnee(randonnee)}  isAnimateur={isAnimateur} />
    );
}
