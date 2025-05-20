import fp from "fastify-plugin";

export const serverVersion = fp((fastify) => {
  fastify.decorate("serverVersion", "0.0.10");
});
