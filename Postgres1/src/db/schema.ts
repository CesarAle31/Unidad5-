import { integer, pgTable, serial, varchar, timestamp, doublePrecision, text } from 'drizzle-orm/pg-core';

// Tabla actors
export const actors = pgTable('actor', {
    actor_id: serial('actor_id').primaryKey(),
    first_name: varchar('first_name', { length: 100 }),
    last_name: varchar('last_name', { length: 100 }),
    last_update: timestamp('last_update'),
});

// Tabla films
export const films = pgTable('film', {
    film_id: serial('film_id').primaryKey(),
    title: varchar('title', { length: 255 }),
    description: varchar('description'),
    release_year: integer('release_year'),
    language_id: integer('language_id'),
    rental_duration: integer('rental_duration'),
    length: integer('length'),
    replacement_cost: doublePrecision('replacement_cost'),
    rating: varchar('rating', { length: 10 }),
    last_update: timestamp('last_update').defaultNow(),
    special_features: varchar('special_features', { length: 50 }).array(),
    fulltext: text('fulltext'),
});

// Tabla film_actor
export const film_actor = pgTable('film_actor', {
    film_id: integer('film_id').notNull().references(() => films.film_id),
    actor_id: integer('actor_id').notNull().references(() => actors.actor_id),
});

// Tabla inventory
export const inventory = pgTable('inventory', {
    inventory_id: serial('inventory_id').primaryKey(),
    film_id: integer('film_id').notNull().references(() => films.film_id, { onUpdate: "cascade", onDelete: "restrict" }),
    store_id: integer('store_id').notNull(),
    last_update: timestamp('last_update').defaultNow(),
});

// Tabla category
export const category = pgTable('category', {
    category_id: serial('category_id').primaryKey(),
    name: varchar('name', { length: 25 }).notNull(),
    last_update: timestamp('last_update').defaultNow(),
});

// Tabla film_category
export const film_category = pgTable('film_category', {
    film_id: integer('film_id').notNull().references(() => films.film_id, { onUpdate: "cascade", onDelete: "restrict" }),
    category_id: integer('category_id').notNull().references(() => category.category_id, { onUpdate: "cascade", onDelete: "restrict" }),
});

// Tabla rental
export const rental = pgTable('rental', {
    rental_id: serial('rental_id').primaryKey(),
    rental_date: timestamp('rental_date').notNull(),
    inventory_id: integer('inventory_id').notNull().references(() => inventory.inventory_id, { onUpdate: "cascade", onDelete: "restrict" }),
    customer_id: integer('customer_id').notNull(),
    return_date: timestamp('return_date'),
    staff_id: integer('staff_id').notNull(),
    last_update: timestamp('last_update').defaultNow(),
});
