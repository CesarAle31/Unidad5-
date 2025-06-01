import { FilmRepository } from '../repositories/film.repos.ts';
import { db } from '../db';
import { films, film_actor } from '../db/schema.ts';
// Mi modificacion
import { film_category, inventory, rental } from '../db/schema.ts';
import { inArray } from 'drizzle-orm/sql/expressions/conditions';
import { count } from 'drizzle-orm/sql/functions';

import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const FilmService = {
    getAll: () => FilmRepository.findAll(),
    getById: (id: number) => FilmRepository.findById(id),

    update: (
        id: number,
        title: string,
        description: string,
        release_year: number,
        language_id: number,
        rental_duration: number,
        length: number,
        replacement_cost: number,
        rating: string,
        special_features: string[] | string,
        fulltext: string
    ) => {
        // Convertir special_features a array si es un string
        let processedFeatures = special_features;
        if (typeof special_features === 'string') {
            // Si es un string vacío, usar array vacío
            if (special_features.trim() === '') {
                processedFeatures = [];
            }
            // Si es una cadena JSON, intentar parsearlo
            else if (special_features.startsWith('[') && special_features.endsWith(']')) {
                try {
                    processedFeatures = JSON.parse(special_features);
                } catch (error) {
                    // Si falla el parsing, separar por comas
                    processedFeatures = special_features.split(',').map(item => item.trim());
                }
            }
            // De lo contrario, separar por comas
            else {
                processedFeatures = special_features.split(',').map(item => item.trim());
            }
        }

        // Asegurar que sea un array
        if (!Array.isArray(processedFeatures)) {
            processedFeatures = [];
        }

        return FilmRepository.update(id, {
            title,
            description,
            release_year,
            language_id,
            rental_duration,
            length,
            replacement_cost,
            rating,
            special_features: processedFeatures as string[],
            fulltext,
        });
    },

    add: (
        title: string,
        description: string,
        release_year: number,
        language_id: number,
        rental_duration: number,
        length: number,
        replacement_cost: number,
        rating: string,
        special_features: string[] | string,
        fulltext: string
    ) => {
        // Convertir special_features a array si es un string
        let processedFeatures = special_features;
        if (typeof special_features === 'string') {
            // Si es un string vacío, usar array vacío
            if (special_features.trim() === '') {
                processedFeatures = [];
            }
            // Si es una cadena JSON, intentar parsearlo
            else if (special_features.startsWith('[') && special_features.endsWith(']')) {
                try {
                    processedFeatures = JSON.parse(special_features);
                } catch (error) {
                    // Si falla el parsing, separar por comas
                    processedFeatures = special_features.split(',').map(item => item.trim());
                }
            }
            // De lo contrario, separar por comas
            else {
                processedFeatures = special_features.split(',').map(item => item.trim());
            }
        }

        // Asegurar que sea un array
        if (!Array.isArray(processedFeatures)) {
            processedFeatures = [];
        }

        console.log("Datos procesados para agregar película:", {
            title,
            description,
            release_year,
            language_id,
            rental_duration,
            length,
            replacement_cost,
            rating,
            special_features: processedFeatures,
            fulltext,
        });

        return FilmRepository.add({
            title,
            description,
            release_year,
            language_id,
            rental_duration,
            length,
            replacement_cost,
            rating,
            special_features: processedFeatures as string[],
            fulltext,
        });
    },

    delete: async (id: number) => {
        try {
            console.log(`Iniciando proceso de eliminación para película ID ${id}`);

            // Usar transacción para garantizar atomicidad
            return await db.transaction(async (tx) => {
                // 1. Verificar si hay rentals asociados al inventario de esta película
                const inventoryItems = await tx.select({ id: inventory.inventory_id })
                    .from(inventory)
                    .where(eq(inventory.film_id, id));

                if (inventoryItems.length > 0) {
                    console.log(`La película tiene ${inventoryItems.length} elementos en inventario`);

                    const inventoryIds = inventoryItems.map(item => item.id);

                    const rentalsResult = await tx.select({ id: rental.rental_id, count: count() })
                        .from(rental)
                        .where(inArray(rental.inventory_id, inventoryIds))
                        .groupBy(rental.rental_id);

                    const rentalCount = rentalsResult.length;
                    const rentalIds = rentalsResult.map(r => r.id);

                    if (rentalCount > 0) {
                        console.log(`DEMO: La película ID ${id} tiene ${rentalCount} alquileres asociados que serán eliminados`);

                        // PASO 1: PRIMERO eliminar los PAGOS asociados a los alquileres
                        console.log(`DEMO: Eliminando pagos asociados a los alquileres`);
                        await tx.execute(`DELETE FROM payment WHERE rental_id IN (${rentalIds.join(',')})`);

                        // PASO 2: DESPUÉS eliminar los alquileres
                        console.log(`DEMO: Eliminando ${rentalCount} alquileres`);
                        await tx.delete(rental)
                            .where(inArray(rental.inventory_id, inventoryIds));
                    }

                    // 3. Eliminar registros de inventario
                    console.log(`Eliminando ${inventoryItems.length} registros de inventario`);
                    await tx.delete(inventory)
                        .where(eq(inventory.film_id, id));
                }

                // 4. Eliminar referencias en film_category
                console.log(`Eliminando categorías asociadas a película ID ${id}`);
                await tx.delete(film_category)
                    .where(eq(film_category.film_id, id));

                // 5. Eliminar referencias en film_actor
                console.log(`Eliminando relaciones con actores para película ID ${id}`);
                await tx.delete(film_actor)
                    .where(eq(film_actor.film_id, id));

                // 6. Finalmente eliminar la película
                console.log(`Eliminando película ID ${id}`);
                const [deleted] = await tx.delete(films)
                    .where(eq(films.film_id, id))
                    .returning();

                if (!deleted) {
                    return {
                        error: true,
                        type: "NOT_FOUND",
                        message: `Película con ID ${id} no encontrada.`
                    };
                }

                console.log(`Película ID ${id} eliminada exitosamente`);
                return deleted;
            });
        } catch (error) {
            console.error(`Error al intentar eliminar la película con ID ${id}:`, error);
            return {
                error: true,
                type: "UNEXPECTED",
                message: error instanceof Error ? error.message : String(error)
            };
        }
    },
};