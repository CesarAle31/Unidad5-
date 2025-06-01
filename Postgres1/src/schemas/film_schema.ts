import { z } from 'zod';

export const filmSchema = z.object({
    title: z.string(),
    description: z.string(),
    release_year: z.number(),
    language_id: z.number(),
    rental_duration: z.number(),
    length: z.number().optional(),
    replacement_cost: z.number().optional(),
    rating: z.string().optional(),
    special_features: z.union([
        // Acepta string y lo convierte a array
        z.string().transform(value => {
            if (value.trim() === '') return [];
            if (value.startsWith('[') && value.endsWith(']')) {
                try {
                    return JSON.parse(value);
                } catch {
                    return value.split(',').map(item => item.trim());
                }
            }
            return [value.trim()]; // Si es un solo valor como "Trailers", lo convierte a ["Trailers"]
        }),
        z.array(z.string())
    ]),
    fulltext: z.string().optional()
});

export type FilmInput = z.infer<typeof filmSchema>;