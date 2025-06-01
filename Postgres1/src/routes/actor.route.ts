import { Hono } from 'hono';
import type { Context } from 'hono';
import { actorSchema } from '../schemas/actor_schema.ts';
import { ActorController } from '../controllers/actor.controller.ts';
import { validateBody } from '../middlewares/validate.ts'; // Middleware de validación

const actorRouter = new Hono();

// Define el tipo del cuerpo validado
type ActorBody = {
    first_name: string;
    last_name: string;
};

// Contexto extendido para acceder a `validatedBody`
type ValidatedContext = Context<{
    Variables: {
        validatedBody: ActorBody;
    };
}>;

// Endpoint para obtener todos los actores
actorRouter.get('/actors', async (c) => {
    const { status, body } = await ActorController.getAll();
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
});

// Endpoint para obtener un actor por ID
actorRouter.get('/actors/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await ActorController.getById(id);
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
});

// Endpoint para crear un nuevo actor
actorRouter.post(
    '/actors',
    validateBody(actorSchema),
    async (c: ValidatedContext) => {
        const bodyValidated = c.get('validatedBody');
        const { status, body } = await ActorController.add(bodyValidated);
        return new Response(JSON.stringify(body), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

// Endpoint para actualizar un actor existente
actorRouter.put(
    '/actors/:id',
    validateBody(actorSchema),
    async (c: ValidatedContext) => {
        const id = Number(c.req.param('id'));
        const bodyValidated = c.get('validatedBody');
        const { status, body } = await ActorController.update(id, bodyValidated);
        return new Response(JSON.stringify(body), {
            status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

// Endpoint para eliminar un actor
actorRouter.delete('/actors/:id', async (c) => {
    const id = Number(c.req.param('id'));
    const { status, body } = await ActorController.delete(id);
    return new Response(JSON.stringify(body), {
        status,
        headers: { 'Content-Type': 'application/json' }
    });
});

export default actorRouter;
