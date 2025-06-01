import { db } from '../db';
import { inventory } from '../db/schema.ts';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const InventoryRepository = {
    deleteByFilmId: async (filmId: number) => {
        try {
            console.log(`Intentando eliminar relaciones en inventory para film_id ${filmId}.`);
            const result = await db.delete(inventory).where(eq(inventory.film_id, filmId));
            console.log(`Relaciones eliminadas en inventory para film_id ${filmId}.`);
            return result;
        } catch (error) {
            console.error(`Error al eliminar relaciones en inventory para film_id ${filmId}:`, error);
            throw error;
        }
    },

    findByFilmId: async (filmId: number) => {
        try {
            console.log(`Buscando inventarios relacionados con film_id ${filmId}.`);
            const result = await db.select().from(inventory).where(eq(inventory.film_id, filmId));
            console.log(`Inventarios encontrados para film_id ${filmId}:`, result);
            return result;
        } catch (error) {
            console.error(`Error al buscar inventarios para film_id ${filmId}:`, error);
            throw error;
        }
    },
};