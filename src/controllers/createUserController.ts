import { randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";

export function createUserController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  console.log("user", request.user?.id);
  console.log(request.server.serverVersion);
  request.server.sendAnalytics(request);

  reply.hbs("<h1>{userName}</h1>", { userName: "Caleb" });

  reply.code(201).send({
    id: randomUUID(),
  });
}
