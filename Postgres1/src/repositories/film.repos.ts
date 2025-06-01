import { db } from '../db';
import { films, film_actor } from '../db/schema.ts';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const FilmRepository = {
    findAll: async () => db.select().from(films),

    findById: async (id: number) => {
        const [film] = await db.select().from(films).where(eq(films.film_id, id));
        return film;
    },

    add: async (data: {
        title: string;
        description: string;
        release_year: number;
        language_id: number;
        rental_duration: number;
        length: number;
        replacement_cost: number;
        rating: string;
        special_features: string[];
        fulltext: string;
    }) => {
        try {
            const result = await db.insert(films).values(data).returning();
            return result;
        } catch (error) {
            console.error("Error al insertar película en la base de datos:", error);
            throw error;
        }
    },

    update: async (id: number, data: {
        title: string;
        description: string;
        release_year: number;
        language_id: number;
        rental_duration: number;
        length: number;
        replacement_cost: number;
        rating: string;
        special_features: string[];
        fulltext: string;
    }) => {
        const [updated] = await db.update(films).set(data).where(eq(films.film_id, id)).returning();
        return updated;
    },

    delete: async (id: number) => {
        try {
            // Eliminar referencias en film_actor
            await db.delete(film_actor).where(eq(film_actor.film_id, id));

            // Eliminar la película
            const [deleted] = await db.delete(films).where(eq(films.film_id, id)).returning();
            if (!deleted) {
                console.error(`Película con ID ${id} no encontrada en la base de datos.`);
                return null;
            }
            console.log(`Película con ID ${id} eliminada de la base de datos.`);
            return deleted;
        } catch (error) {
            console.error(`Error en la base de datos al intentar eliminar la película con ID ${id}:`, error);
            throw error;
        }
    },
};