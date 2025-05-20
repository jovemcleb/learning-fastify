import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

//usar fastify-plugin somente quando for um plugin que toda aplicação irá usar
export const sendAnalytics = fp((fastify) => {
  fastify.decorate("sendAnalytics", (request: FastifyRequest) => {
    console.log(
      `> Saving analytics for request: ${request.method} ${request.url} ${request.id}`
    );
  });
});
