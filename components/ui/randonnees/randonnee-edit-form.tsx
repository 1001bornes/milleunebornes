"use client";
import { InsertRandonnee, SelectRandonnee } from "@/lib/randonneesDb";
import { ChevronsDown, ChevronsUp, Link } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../button";
import { SelectRandonneur, SelectRandonneurWithRole } from "@/lib/randonneursDb";
import { ProfileImage } from "../profile-image";
import { RandonneursSelect } from "../randonneurs/randonneurs-select";
import { updateRandonneeAnimateurs } from "@/lib/actions";

const defaultValues: SelectRandonnee = {
    id: 0,
    description: "",
    create_time: new Date(), // Default to current date and time
    statut: "A concevoir",
    reconnaissance_time: null,
    programmation_time: null,
    is_programmation_speciale: false,
    lieu_depart: "Rond-point de la rue de Verdun",
    is_lieu_depart_special: false,
    cout_euros: null,
    distance_km: 0,
    denivele_m: 0,
    type_rando: "Randonnée avec pique-nique tiré du sac",
    localisation: "",
    id_openrunner: 0,
    parcours_openrunner: "",
    note_speciale: "",
};

export default function RandonneeEditForm({
    randonnee,
    allAnimateurs,
    animateurs,
    onSubmit,
}: Readonly<{
    randonnee?: SelectRandonnee;
    allAnimateurs: SelectRandonneur[];
    animateurs: SelectRandonneurWithRole[];
    onSubmit?: (values: SelectRandonnee) => void;
}>) {
    const [form, setForm] = useState<SelectRandonnee>(randonnee ?? defaultValues);
    const [showMoreFields, setShowMoreFields] = useState(false);

    let concepteurs = animateurs.filter((animateur) => animateur.role === 'Concepteur');
    let reconnaisseurs = animateurs.filter((animateur) => animateur.role === 'Reconnaisseur');

    const router = useRouter();
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    }

    function handleSubmit(formData: FormData) {
        if (onSubmit) {
            onSubmit(form);
        }
        router.back(); // Navigate back after submission
    }

    return (
        <div className="space-y-4 max-w-xl">
            <div>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={form.description} onChange={handleChange} required className="w-full border rounded p-2" />
            </div>
            <div hidden={true}>
                <label htmlFor="create_time">Date de création</label>
                <input type="datetime-local" id="create_time" name="create_time" value={form.create_time?.toISOString().slice(0, 16)} onChange={handleChange} required className="w-full border rounded p-2" />
            </div>
            <div hidden={true}>
                <label htmlFor="statut">Statut</label>
                <select id="statut" name="statut" value={form.statut} onChange={handleChange} required className="w-full border rounded p-2">
                    <option value="A concevoir">A concevoir</option>
                    <option value="A reconnaître">A reconnaître</option>
                    <option value="Programmée">Programmée</option>
                    <option value="Terminée">Terminée</option>
                </select>
            </div>
            <div>
                <label htmlFor="reconnaissance_time">Date de reconnaissance</label>
                <input type="datetime-local" id="reconnaissance_time" name="reconnaissance_time" value={form.reconnaissance_time?.toISOString().slice(0, 16)} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
                <label htmlFor="programmation_time">Date de programmation</label>
                <input type="datetime-local" id="programmation_time" name="programmation_time" value={form.programmation_time?.toISOString().slice(0, 16)} onChange={handleChange} className="w-full border rounded p-2" />
                <label htmlFor="is_programmation_speciale">Programmation spéciale ? </label>
                <input type="checkbox" id="is_programmation_speciale" name="is_programmation_speciale" checked={!!form.is_programmation_speciale} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="localisation">Localisation</label>
                <input id="localisation" name="localisation" value={form.localisation ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
            <div>
                <label htmlFor="id_openrunner">ID Openrunner</label>
                <input type="number" id="id_openrunner" name="id_openrunner" value={form.id_openrunner ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
            </div>
                {randonnee?.id && (
                    <>
                        <span className="flex  overflow-auto gap-2 align-middle">
                            Concepteur:
                            <RandonneursSelect randonneeId={randonnee.id} randonneurs={allAnimateurs} initialSelected={concepteurs}
                                typeRandonneur="Concepteur"
                                action={(randonneeId, typeRandonneur, selectedRandonneurs) =>
                                    updateRandonneeAnimateurs(randonneeId, typeRandonneur, selectedRandonneurs)} />
                            <span className="flex  overflow-auto gap-2">
                                {concepteurs.map((animateur) => (
                                    <ProfileImage key={animateur.id} url_photo={animateur.image ?? animateur.url_photo} nom={animateur.nom} role={animateur.role} />
                                ))}
                            </span>
                        </span>
                        <span className="flex  overflow-auto gap-2 align-middle">
                            Reconnaisseur(s):
                            <RandonneursSelect randonneeId={randonnee.id} randonneurs={allAnimateurs} initialSelected={reconnaisseurs}
                                typeRandonneur="Reconnaisseur"
                                action={(randonneeId, typeRandonneur, selectedRandonneurs) =>
                                    updateRandonneeAnimateurs(randonneeId, typeRandonneur, selectedRandonneurs)} />
                            <span className="flex  overflow-auto gap-2">
                                {reconnaisseurs.map((animateur) => (
                                    <ProfileImage key={animateur.id} url_photo={animateur.image ?? animateur.url_photo} nom={animateur.nom} role={animateur.role} />
                                ))}
                            </span>
                        </span>
                    </>
                )}
            <Button type="button" onClick={() => setShowMoreFields(!showMoreFields)} className="py-2 px-4 border border-gray-400 rounded shadow">
                {showMoreFields ?
                    (<>
                        <span>Masquer</span>
                        <ChevronsUp className="ml-auto h-5 w-5 text-gray-50" />
                    </>)
                    :
                    (<>
                        <span>Afficher</span>
                        <ChevronsDown className="ml-auto h-5 w-5 text-gray-50" />
                    </>)
                }
            </Button>
            <div hidden={!showMoreFields}>
                <div>
                    <label htmlFor="lieu_depart">Lieu de départ</label>
                    <input id="lieu_depart" name="lieu_depart" value={form.lieu_depart} onChange={handleChange} required className="w-full border rounded p-2" />
                    <label htmlFor="is_lieu_depart_special">Lieu de départ spécial ? </label>
                    <input type="checkbox" id="is_lieu_depart_special" name="is_lieu_depart_special" checked={!!form.is_lieu_depart_special} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cout_euros">Coût (€)</label>
                    <input type="number" step="0.01" id="cout_euros" name="cout_euros" value={form.cout_euros ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="distance_km">Distance (km)</label>
                    <input type="number" id="distance_km" name="distance_km" value={form.distance_km ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="denivele_m">Dénivelé (m)</label>
                    <input type="number" id="denivele_m" name="denivele_m" value={form.denivele_m ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="type_rando">Type de rando</label>
                    <input id="type_rando" name="type_rando" value={form.type_rando ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="parcours_openrunner">URL parcours Openrunner</label>
                    <input id="parcours_openrunner" name="parcours_openrunner" value={form.parcours_openrunner ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="note_speciale">Note spéciale</label>
                    <textarea id="note_speciale" name="note_speciale" value={form.note_speciale ?? ""} onChange={handleChange} className="w-full border rounded p-2" />
                </div>
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" className="bg-red-600 text-white px-4 py-2 rounded" onClick={() => router.back()}>Annuler</button>
                <button type="submit" formAction={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Créer</button>
            </div>
        </div>
    );
}
