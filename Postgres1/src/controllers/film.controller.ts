import { FilmService } from '../services/film.service.ts';
import { HttpResponse } from '../utils/http_reponse.ts';

export const FilmController = {
    getAll: async () => {
        try {
            const allFilms = await FilmService.getAll();
            return HttpResponse.ok(allFilms, "Películas recuperadas correctamente");
        } catch (error) {
            console.error("Error al recuperar todas las películas:", error);
            return HttpResponse.error("Error al recuperar las películas");
        }
    },

    getById: async (id: number) => {
        try {
            const film = await FilmService.getById(id);
            if (!film) {
                return HttpResponse.notFound("Película no encontrada");
            }
            return HttpResponse.ok([film], "Película encontrada");
        } catch (error) {
            console.error(`Error al recuperar la película con ID ${id}:`, error);
            return HttpResponse.error("Error al recuperar la película");
        }
    },

    add: async (body: {
        title: string;
        description: string;
        release_year: number;
        language_id: number;
        rental_duration: number;
        length: number;
        replacement_cost: number;
        rating: string;
        special_features: string[] | string;
        fulltext: string;
    }) => {
        try {
            if (!body.title || !body.description || !body.release_year || !body.language_id) {
                return HttpResponse.error("Datos incompletos para crear la película");
            }

            const newFilm = await FilmService.add(
                body.title,
                body.description,
                body.release_year,
                body.language_id,
                body.rental_duration,
                body.length,
                body.replacement_cost,
                body.rating,
                body.special_features,
                body.fulltext
            );
            return HttpResponse.created(newFilm, "Película creada");
        } catch (error) {
            console.error("Error al crear la película:", error);
            return HttpResponse.error(`Error al crear la película: }`);
        }
    },

    update: async (id: number, body: {
        title: string;
        description: string;
        release_year: number;
        language_id: number;
        rental_duration: number;
        length: number;
        replacement_cost: number;
        rating: string;
        special_features: string[] | string;
        fulltext: string;
    }) => {
        try {
            if (!body.title || !body.description || !body.release_year || !body.language_id) {
                return HttpResponse.error("Datos incompletos para actualizar la película");
            }

            const updatedFilm = await FilmService.update(
                id,
                body.title,
                body.description,
                body.release_year,
                body.language_id,
                body.rental_duration,
                body.length,
                body.replacement_cost,
                body.rating,
                body.special_features,
                body.fulltext
            );

            if (!updatedFilm) {
                return HttpResponse.notFound("Película no encontrada para actualizar");
            }

            return HttpResponse.ok([updatedFilm], "Película actualizada correctamente");
        } catch (error) {
            console.error(`Error al actualizar la película con ID ${id}:`, error);
            return HttpResponse.error(`Error al actualizar la película: }`);
        }
    },

    delete: async (id: number) => {
        try {
            // Manejo de relaciones antes de eliminar
            const result = await FilmService.delete(id);

            // Verificar si el resultado es un objeto de error
            if (result && typeof result === 'object' && 'error' in result) {
                if (result.type === "RENTALS_EXIST") {
                    return HttpResponse.badRequest(result.message);
                } else if (result.type === "NOT_FOUND") {
                    return HttpResponse.notFound(result.message);
                } else {
                    return HttpResponse.error(result.message);
                }
            }

            return HttpResponse.ok([], "Película eliminada correctamente");
        } catch (error) {
            console.error(`Error al eliminar la película con ID ${id}:`, error);
            return HttpResponse.error("Error al eliminar la película");
        }
    },
};