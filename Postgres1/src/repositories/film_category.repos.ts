import { db } from '../db';
import { film_category } from '../db/schema.ts';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const FilmCategoryRepository = {
    deleteByFilmId: async (filmId: number) => {
        try {
            console.log(`Intentando eliminar relaciones en film_category para film_id ${filmId}.`);
            const result = await db.delete(film_category).where(eq(film_category.film_id, filmId));
            console.log(`Relaciones eliminadas en film_category para film_id ${filmId}.`);
            return result;
        } catch (error) {
            console.error(`Error al eliminar relaciones en film_category para film_id ${filmId}:`, error);
            throw error;
        }
    },
};