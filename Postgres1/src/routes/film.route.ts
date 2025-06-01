import { Hono } from 'hono';
import { filmSchema } from '../schemas/film_schema.ts';
import { FilmController } from '../controllers/film.controller.ts';
import { validateBody } from '../middlewares/validate.ts';

const filmRouter = new Hono();

// GET /films
filmRouter.get('/films', async (): Promise<Response> => {
    const { status, body } = await FilmController.getAll();
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

// GET /films/:id
filmRouter.get('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "ID inválido" }), { status: 400 });
    }
    const { status, body } = await FilmController.getById(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

// POST /films
filmRouter.post(
    '/films',
    validateBody(filmSchema),
    async (c) => {
        const bodyValidated = (c as any).get('validatedBody');

        // No es necesario modificar nada aquí - la validación ya está manejada por el esquema

        const { status, body } = await FilmController.add(bodyValidated);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

// PUT /films/:id - Actualizar una película existente
filmRouter.put(
    '/films/:id',
    validateBody(filmSchema),
    async (c) => {
        const id = Number(c.req.param('id'));
        if (isNaN(id)) {
            return new Response(JSON.stringify({ error: "ID inválido" }), { status: 400 });
        }
        const bodyValidated = (c as any).get('validatedBody');

        // No es necesario modificar nada aquí - la validación ya está manejada por el esquema

        const { status, body } = await FilmController.update(id, bodyValidated);
        return new Response(JSON.stringify(body), {
            status: status,
            headers: { 'Content-Type': 'application/json' }
        });
    }
);

// DELETE /films/:id - Eliminar una película
filmRouter.delete('/films/:id', async (c) => {
    const id = Number(c.req.param('id'));
    if (isNaN(id)) {
        return new Response(JSON.stringify({ error: "ID inválido" }), { status: 400 });
    }
    const { status, body } = await FilmController.delete(id);
    return new Response(JSON.stringify(body), {
        status: status,
        headers: { 'Content-Type': 'application/json' }
    });
});

export default filmRouter;