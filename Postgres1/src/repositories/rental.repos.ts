import { db } from '../db';
import { rental } from '../db/schema.ts';
import { eq } from 'drizzle-orm/sql/expressions/conditions';

export const RentalRepository = {
    // Eliminar todos los rentals asociados a un inventory_id
    deleteByInventoryId: async (inventoryId: number) => {
        try {
            console.log(`Intentando eliminar relaciones en rental para inventory_id ${inventoryId}.`);
            const result = await db.delete(rental).where(eq(rental.inventory_id, inventoryId));
            console.log(`Relaciones eliminadas en rental para inventory_id ${inventoryId}.`);
            return result;
        } catch (error) {
            console.error(`Error al eliminar relaciones en rental para inventory_id ${inventoryId}:`, error);
            throw error;
        }
    },

    // Encontrar todos los rentals asociados a un inventory_id
    findByInventoryId: async (inventoryId: number) => {
        try {
            console.log(`Buscando rentas relacionadas con inventory_id ${inventoryId}.`);
            const result = await db.select().from(rental).where(eq(rental.inventory_id, inventoryId));
            console.log(`Rentas encontradas para inventory_id ${inventoryId}:`, result);
            return result;
        } catch (error) {
            console.error(`Error al buscar rentas para inventory_id ${inventoryId}:`, error);
            throw error;
        }
    },
};