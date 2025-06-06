import { ActorService } from '../services/actor.service.ts';
import { HttpResponse } from '../utils/http_reponse.ts';

export const ActorController = {
    getAll: async () => {
        try {
            const actors = await ActorService.getAll();
            return HttpResponse.ok(actors, "Actores recuperados correctamente");
        } catch (error) {
            console.error("Error al recuperar actores:", error);
            return HttpResponse.error("Error al recuperar los actores");
        }
    },

    getById: async (id: number) => {
        try {
            const actor = await ActorService.getById(id);
            if (!actor) {
                return HttpResponse.notFound("Actor no encontrado");
            }
            return HttpResponse.ok([actor], "Actor encontrado");
        } catch (error) {
            console.error(`Error al recuperar el actor con ID ${id}:`, error);
            return HttpResponse.error("Error al recuperar el actor");
        }
    },

    add: async (body: { first_name: string; last_name: string }) => {
        try {
            const newActor = await ActorService.add(body.first_name, body.last_name);
            return HttpResponse.created(newActor, "Actor creado");
        } catch (error) {
            console.error("Error al crear el actor:", error);
            return HttpResponse.error("Error al crear el actor");
        }
    },

    update: async (id: number, body: { first_name: string; last_name: string }) => {
        try {
            const updatedActor = await ActorService.update(id, body.first_name, body.last_name);
            if (!updatedActor) {
                return HttpResponse.notFound("Actor no encontrado para actualizar");
            }
            return HttpResponse.ok([updatedActor], "Actor actualizado correctamente");
        } catch (error) {
            console.error(`Error al actualizar el actor con ID ${id}:`, error);
            return HttpResponse.error("Error al actualizar el actor");
        }
    },

    delete: async (id: number) => {
        try {
            // Usar directamente ActorService.delete que ya maneja las referencias internamente
            const deletedActor = await ActorService.delete(id);
            if (!deletedActor) {
                return HttpResponse.notFound("Actor no encontrado para eliminar");
            }
            return HttpResponse.ok([], "Actor eliminado correctamente");
        } catch (error) {
            console.error(`Error al eliminar el actor con ID ${id}:`, error);
            return HttpResponse.error("Error al eliminar el actor");
        }
    },
};