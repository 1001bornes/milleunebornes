"use client";
import { SelectRandonnee } from "@/lib/randonneesDb";
import { formatDateToLocal } from "@/lib/utils";
import { Download } from "lucide-react";

export function ExportRandonnees({ filename, randonnees }: Readonly<{ filename: string; randonnees: SelectRandonnee[]; }>) {
  function createRandonneesCsvContent(randonnees: SelectRandonnee[]) {
    const csvContent = "data:text/csv;charset=utf-8," +
      '"Description","Date","Lieu départ","Distance (km)","Dénivelé (m)","Localisation","ID OpenRunner","Note"\n' +
      randonnees.map(randonnee =>
        [
          randonnee.description,
          formatDateToLocal(randonnee.programmation_time),
          randonnee.lieu_depart,
          randonnee.distance_km?.toString(),
          randonnee.denivele_m?.toString(),
          randonnee.localisation,
          randonnee.id_openrunner?.toString(),
          randonnee.note_speciale
        ]
          .map(str => str == null ? "" : `"${str.replace(/"/g, '"')}"`)
          .join(","))
        .join("\n");
    return encodeURI(csvContent);
  }

  const downloadRandonneesCSV = () => {
    const csvContent = createRandonneesCsvContent(randonnees);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", filename + ".csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <button type="button" onClick={downloadRandonneesCSV} className="rounded-md border p-2 hover:bg-gray-100">
      <span className="sr-only">Export</span>
      <Download className="w-5" />
    </button>
  );
}
