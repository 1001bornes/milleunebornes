"use client";

import { SelectRandonneur } from "@/lib/randonneursDb";
import { Download } from "lucide-react";

export function ExportRandonneurs({ filename, randonneurs }: Readonly<{ filename: string; randonneurs: SelectRandonneur[]; }>) {
  function createCsvContent(randonneurs: SelectRandonneur[]) {
    const csvContent = "data:text/csv;charset=utf-8," +
      '"Nom","No Tél","Email"\n' +
      randonneurs.map(randonneur =>
        [
          randonneur.nom,
          randonneur.no_tel,
          randonneur.email
        ]
          .map(str => str == null ? "" : `"${str.replace(/"/g, '"')}"`)
          .join(","))
        .join("\n");
    return encodeURI(csvContent);
  }

  function downloadRandonneursCSV() {
    const csvContent = createCsvContent(randonneurs);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", filename + ".csv");
    document.body.appendChild(link);
    link.click();
  };

    return (
      <button type="button" onClick={downloadRandonneursCSV} className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Export</span>
        <Download className="w-5" />
      </button>
  );

}