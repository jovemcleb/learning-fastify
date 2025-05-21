import { randomUUID } from "crypto";
import { FastifyPluginAsync } from "fastify";
import { usersRoutes } from "./usersRoutes";

export const privateRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.decorateRequest("user", null);
  fastify.addHook(/*"onRequest"*/ "preHandler", async (request, reply) => {
    const { authorization } = request.headers;

    if (!authorization) {
      return reply.code(401).send({
        code: "unauthorized",
        message: "Authorization header is required",
      });
    }

    console.log(request.body.name);

    request.user = {
      id: randomUUID(),
    };
  });

  fastify.register(usersRoutes, { prefix: "/users" });
};
