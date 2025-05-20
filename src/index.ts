import Fastify from "fastify";
import { sendAnalytics } from "./plugins/sendAnalytics";
import { serverVersion } from "./plugins/serverVersion";
import { routes } from "./routes";

const fastify = Fastify();

fastify.register(routes);
fastify.register(serverVersion);
fastify.register(sendAnalytics);

fastify.setErrorHandler((error, request, reply) => {
  console.error({ error });
  reply.code(500).send({ error: "Internal Server Error" });
});

// fastify.addContentTypeParser(
//   "application/xml",
//   async (request, payload, _done) => {
//     const chunks = [];
//     for await (const chunk of payload) {
//       chunks.push(chunk);
//     }

//     return Buffer.concat(chunks).toString("utf-8");
//   }
// );

// type Request = FastifyRequest<{
//   Params: { id: string };
//   Querystring: { page: number };
//   Body: { name: string };
//   Headers: { org: string };
//   Reply: {
//     201: {
//       id: string;
//     };
//     "4xx": {
//       code: string;
//       message: string;
//     };
//   };
// }>;

// fastify.post(
//   "/users/:id",
//   {
//     errorHandler: (error, request, reply) => {
//       console.error({ error });
//       reply.code(400).send(error.message);
//     },
//   },
//   async (request: Request, reply) => {
//     //          /users/:id?
//     const { body } = request;

//     console.log("body", body);

//     if (!body.name) {
//       throw new Error("Name is required");
//       // return reply.code(400).send({
//       //   code: "name_required",
//       //   message: "Name is required",
//       // });
//     }

//     reply.code(201).send({
//       id: randomUUID(),
//     });
//   }
// );

// fastify.post("/users/:id-:qualquercoisa", (request, reply) => {
//   const { body, headers, query, params } = request;

//   reply.code(201).send({
//     body: {
//       name: body.name,
//     },
//     headers: {
//       org: headers.org,
//     },
//     query: {
//       page: query.page,
//     },
//     params: {
//       id: params.id,
//     },
//     message: "Hello world",
//   });
// });

async function main() {
  try {
    const host = await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server is running on", host);
  } catch (error) {
    console.error(error);
  }
}

main();
