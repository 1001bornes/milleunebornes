import { db } from "./db";

import {
  pgTable,
  text,
  boolean,
  timestamp,
  pgEnum,
  serial
} from 'drizzle-orm/pg-core';
import { eq, ilike, and, SQL } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';

export class RandonneursFilter {
  search: string | null;
  randonneurType: string;
  constructor() {
    this.search = null;
    this.randonneurType = 'all';
  }
};


export const fonctionsCaEnum = pgEnum('fonctions_ca',
  ['Président',
    'Vice-Président',
    'Trésorier',
    'Vice-Trésorier',
    'Secrétaire',
    'Administrateur'
  ]);

export const randonneurs = pgTable('randonneurs', {
  id: serial('id').primaryKey(),
  create_time: timestamp('create_time').defaultNow(),
  nom: text('nom').notNull(),
  prenom: text('prenom').notNull(),
  is_actif: boolean('is_actif').notNull(),
  is_animateur: boolean('is_animateur').notNull(),
  is_CA: boolean('is_ca').notNull(),
  fonction_CA: fonctionsCaEnum('fonction_ca').notNull(),
  url_photo: text('url_photo').notNull(),
  no_tel: text('no_tel').notNull()
});

export type SelectRandonneur = typeof randonneurs.$inferSelect;
export const insertRandonneurSchema = createInsertSchema(randonneurs);
export async function getRandonneurs(
  query: RandonneursFilter,
  offset: number,
  randonneursPerPage: number
): Promise<{
  randonneurs: SelectRandonneur[];
}> {
  const filters: SQL[] = [];
  filters.push(eq(randonneurs.is_actif, true));
  if (query.search) filters.push(ilike(randonneurs.nom, `%${query.search}%`));
  if (query.randonneurType === 'CA') filters.push(eq(randonneurs.is_CA, true));
  if (query.randonneurType === 'animateurs') filters.push(eq(randonneurs.is_animateur, true));
  // Always search the full table, not per page
  if (query.search) {
    return {
      randonneurs: await db.select()
        .from(randonneurs)
        .where(and(...filters))
        .orderBy(randonneurs.nom)
        .limit(1000),
    };
  }

  if (offset === null) {
    return { randonneurs: [] };
  }

  let moreRandonneurs = await db.select()
    .from(randonneurs)
    .where(and(...filters))
    .orderBy(randonneurs.nom)
    .offset(offset)
    .limit(randonneursPerPage);

  return {
    randonneurs: moreRandonneurs
  };
}

export async function deleteRandonneurById(id: number) {
  await db.delete(randonneurs).where(eq(randonneurs.id, id));
}
