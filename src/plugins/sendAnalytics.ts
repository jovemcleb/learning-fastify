import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export const sendAnalytics = fp((fastify) => {
  fastify.decorate("sendAnalytics", (request: FastifyRequest) => {
    console.log(
      `> Saving analytics for request: ${request.method} ${request.url} ${request.id}`
    );
  });
});
