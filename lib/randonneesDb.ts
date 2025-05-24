import { db } from "./db";

import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  serial,
  numeric,
  integer,
  boolean
} from 'drizzle-orm/pg-core';
import { eq, ilike, and, SQL, count, inArray } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export const statutsRando = pgEnum('statuts_rando',
  [
    'A concevoir',
    'A reconnaître',
    'Programmée',
    'Terminée'
  ]);

  export const statutsRandoValues = statutsRando.enumValues;
export class RandonneesFilter {
  search: string | null;
  randonneesStatuts: string[];
  constructor() {
    this.search = null;
    this.randonneesStatuts = ['Programmée', 'A reconnaître', 'Terminée'];
  }
};


export const randonnees = pgTable('randonnees', {
  id: serial('id').primaryKey(),
  description: text('description').notNull(),
  create_time: timestamp('create_time').notNull(),
  statut: statutsRando('statut').notNull(),
  reconnaissance_time: timestamp('reconnaissance_time'),
  programmation_time: timestamp('programmation_time'),
  is_programmation_speciale: boolean('is_programmation_speciale').default(false),
  lieu_depart: text('lieu_depart').notNull(),
  is_lieu_depart_special: boolean('is_lieu_depart_special').default(false),
  cout_euros: numeric('cout_euros'),
  distance_km: integer('distance_km'),
  denivele_m: integer('denivele_m'),
  type_rando: text('type_rando'),
  localisation: text('localisation'),
  id_openrunner: integer('id_openrunner'),
  parcours_openrunner: text('parcours_openrunner'),
  note_speciale: text('note_speciale')
});

export type SelectRandonnee = typeof randonnees.$inferSelect;
export const insertRandonneeSchema = createInsertSchema(randonnees);
export async function getRandonnees( query: RandonneesFilter, pageNumber: number, randonneesPerPage: number):
 Promise<{
  randonnees: SelectRandonnee[];
  totalPages: number;
}> {
  const filters: SQL[] = [];
  if (query.search) filters.push(ilike(randonnees.description, `%${query.search}%`));
  if (query.randonneesStatuts.length > 0) {
    filters.push(inArray(randonnees.statut, convertToStatutEnum(query.randonneesStatuts)));
  }
  if (query.search) {
    return {
      randonnees: await db.select()
        .from(randonnees)
        .where(and(...filters))
        .orderBy(randonnees.create_time)
        .limit(1000),
        totalPages: 1
    };
  }

  if (pageNumber === null) {
    return { randonnees: [] , totalPages: 0};
  }

  let moreRandonnees = await db.select()
    .from(randonnees)
    .where(and(...filters))
    .orderBy(randonnees.create_time)
    .offset((pageNumber-1)*randonneesPerPage)
    .limit(randonneesPerPage);
  let totalRandonnees = await db.select( {count: count()  })
    .from(randonnees)
    .where(and(...filters))
  return {
    randonnees: moreRandonnees,
    totalPages: Math.ceil(totalRandonnees[0].count / randonneesPerPage)
  };
}


export async function deleteRandonneeById(id: number) {
  await db.delete(randonnees).where(eq(randonnees.id, id));
}
function convertToStatutEnum(randonneesStatuts: string[]): import("drizzle-orm").SQLWrapper | ("A concevoir" | "A reconnaître" | "Programmée" | "Terminée" | import("drizzle-orm").Placeholder<string, any>)[] {
  return randonneesStatuts.map((statut) => {
    if (statutsRandoValues.includes(statut as any)) {
      return statut as any;
    }
  });
}

