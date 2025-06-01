import { ActorRepository } from '../repositories/actor.repos.ts';
import { db } from '../db';
import { actors, film_actor } from '../db/schema.ts';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const ActorService = {
    getAll: () => ActorRepository.findAll(),
    getById: (id: number) => ActorRepository.findById(id),
    add: (first_name: string, last_name: string) =>
        ActorRepository.add({ first_name, last_name }),
    update: (id: number, first_name: string, last_name: string) =>
        ActorRepository.update(id, { first_name, last_name }),
    delete: async (id: number) => {
        try {
            // Usar transacción para garantizar atomicidad
            return await db.transaction(async (tx) => {
                // 1. Primero eliminamos todas las relaciones en film_actor
                await tx.delete(film_actor)
                    .where(eq(film_actor.actor_id, id));

                // 2. Después eliminamos el actor
                const [deleted] = await tx.delete(actors)
                    .where(eq(actors.actor_id, id))
                    .returning();

                if (!deleted) {
                    throw new Error(`Actor con ID ${id} no encontrado.`);
                }

                return deleted;
            });
        } catch (error) {
            console.error(`Error al intentar eliminar el actor con ID ${id}:`, error);
            throw new Error(`Error al eliminar el actor:`);
        }
    },
};