import { FastifyRequest } from "fastify";

export type FastifyRequestBody<T> = FastifyRequest<{ Body: T }>;
