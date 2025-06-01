import type { MiddlewareHandler } from 'hono';
import { ZodSchema } from 'zod';
import { HttpResponse } from '../utils/http_reponse.ts';

export const validateBody = <T>(schema: ZodSchema<T>): MiddlewareHandler => {
    return async (c, next) => {
        try {
            const body = await c.req.json();
            const parsed = schema.safeParse(body);

            if (!parsed.success) {
                const messages = parsed.error.errors.map((e) => {
                    const path = e.path.join('.');
                    return `Campo '${path}': ${e.message}`;
                });

                const message = messages.join('; ');
                const res = HttpResponse.badRequest(`Datos inválidos: ${message}`);
                return new Response(JSON.stringify(res.body), {
                    status: res.status,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            c.set('validatedBody', parsed.data as T);
            await next();
        } catch (err) {
            const res = HttpResponse.badRequest('Cuerpo de la solicitud inválido o no es JSON');
            return new Response(JSON.stringify(res.body), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    };
};