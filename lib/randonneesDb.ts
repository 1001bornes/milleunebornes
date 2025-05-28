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
import { randonneurs, SelectRandonneurWithRole } from "./randonneursDb";

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
export type InsertRandonnee = typeof randonnees.$inferInsert;

export const rolesRandonnees = pgEnum('roles_randonnee',
  [
    'Concepteur',
    'Reconnaisseur',
    'Participant'
  ]);
export const rolesRandonneesValues = rolesRandonnees.enumValues;
export const randonneesUsers = pgTable('randonnees_users', {
  randonnee_id: integer('randonnee_id').notNull()
    .references(() => randonnees.id, { onDelete: 'cascade' }),
  user_id: text('user_id').notNull()
    .references(() => randonneurs.id, { onDelete: 'cascade' }),
  role_randonnee: rolesRandonnees("role_randonnee").notNull()
});

export type SelectRandonneeUsers = typeof randonneesUsers.$inferSelect;
export type InsertRandonneeUsers = typeof randonneesUsers.$inferInsert;

export async function getRandonnees(query: RandonneesFilter, pageNumber: number, randonneesPerPage: number):
  Promise<{ randonnees: SelectRandonnee[]; totalPages: number; }> {
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
    return { randonnees: [], totalPages: 0 };
  }

  let moreRandonnees = await db.select()
    .from(randonnees)
    .where(and(...filters))
    .orderBy(randonnees.create_time)
    .offset((pageNumber - 1) * randonneesPerPage)
    .limit(randonneesPerPage);
  let totalRandonnees = await db.select({ count: count() })
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

function convertToStatutEnum(randonneesStatuts: string[])
: import("drizzle-orm").SQLWrapper | ("A concevoir" | "A reconnaître" | "Programmée" | "Terminée" | import("drizzle-orm").Placeholder<string, any>)[] {
  return randonneesStatuts.map((statut) => {
    if (statutsRandoValues.includes(statut as any)) {
      return statut as any;
    }
  });
}

export function convertToRoleRandonneesEnum(rolesRandonnees: string[])
: ("Concepteur" | "Reconnaisseur" | "Participant")[] {
  return rolesRandonnees.map((roleRandonnees) => {
    if (rolesRandonneesValues.includes(roleRandonnees as any)) {
      return roleRandonnees as any;
    }
  });
}

export async function getRandonneeById(randonneeId: number): Promise<SelectRandonnee> {
  return await db.select()
  .from(randonnees)
  .where(eq(randonnees.id, randonneeId))
  .then(rows => rows[0] ?? null);
}

export async function getRandonneeUsersId(randonneeId: number, onlyAnimateurs?: boolean): Promise<SelectRandonneurWithRole[]> {
  const filters: SQL[] = [];
  filters.push(eq(randonneesUsers.randonnee_id, randonneeId));
  if (onlyAnimateurs) {
    filters.push(inArray(randonneesUsers.role_randonnee, ['Concepteur', 'Reconnaisseur']));
  }
  const randonneeUsers = await db.select()
    .from(randonneesUsers)
    .where(and(...filters));
  const actualRandonneeUsers = Promise.all(randonneeUsers.map(async (randonneeUserId) => {
    let actualRandonneeUser = await db.select()
      .from(randonneurs)
      .where(eq(randonneurs.id, randonneeUserId.user_id))
      .then(rows => rows[0] ?? null);
    let randonneeUserWithRole: SelectRandonneurWithRole | null = null;
    if (actualRandonneeUser) {
      randonneeUserWithRole = {
        ...actualRandonneeUser,
        role: randonneeUserId.role_randonnee
      }
      return randonneeUserWithRole;
    }
  })

  );
  return (await actualRandonneeUsers).filter((randonneeUser) => randonneeUser !== null) as SelectRandonneurWithRole[];
}