import { randomUUID } from "crypto";
import { FastifyPluginAsync } from "fastify";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";

// OUTRA FORMA DE INICIAR A FUNÇÃO ROUTES PLUGIN
// export function routes(fastify: FastifyInstance, opts: FastifyPluginOptions) {};

// é possível tipar e definir options através de FastifyPluginAsync<{public: boolean}>, ou seja, generics
export const routes: FastifyPluginAsync = async (fastify) => {
  // Decorators são propriedades que podem ser adicionadas ao objeto FastifyInstance
  // Eles são úteis para compartilhar funcionalidades entre rotas
  // e podem ser acessados em qualquer lugar dentro do plugin.
  // Exemplo: fastify.decorate("nome", valor);
  fastify.setGenReqId(() => randomUUID());

  //decorateRequest é usado para adicionar propriedades ao objeto de requisição
  fastify.decorateReply("hbs", function (template, variables) {
    this.send({ template, variables });
  });

  fastify.register(publicRoutes);
  fastify.register(privateRoutes);
};
