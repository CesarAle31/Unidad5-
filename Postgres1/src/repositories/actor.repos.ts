import { db } from '../db';
import { actors } from '../db/schema.ts';
import { eq } from "drizzle-orm/sql/expressions/conditions";

export const ActorRepository = {
    findAll: async () => db.select().from(actors),

    findById: async (id: number) => {
        const [actor] = await db
            .select()
            .from(actors)
            .where(eq(actors.actor_id, id));
        return actor;
    },

    add: async (data: { first_name: string; last_name: string }) =>
        db.insert(actors).values({
            first_name: data.first_name,
            last_name: data.last_name,
        }).returning(),

    update: async (id: number, data: { first_name: string; last_name: string }) => {
        const [updated] = await db
            .update(actors)
            .set(data)
            .where(eq(actors.actor_id, id))
            .returning();
        return updated;
    },

    delete: async (id: number) => {
        const [deleted] = await db
            .delete(actors)
            .where(eq(actors.actor_id, id))
            .returning();
        return deleted;
    },
};