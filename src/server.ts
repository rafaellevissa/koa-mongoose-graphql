import Koa from "koa";
import cors from "@koa/cors";
import bodyParser from "koa-bodyparser";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { koaMiddleware } from "@as-integrations/koa";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { config } from "./config/config";
import { connectDB } from "./shared/database";
import { typeDefs } from "./graphql/schemas";
import { resolvers } from "./graphql/resolvers";

const initializeServer = async () => {
  const port = config.server.port;
  const app = new Koa();
  const httpServer = http.createServer(app.callback());

  // Initialize ApolloServer
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // Middleware
  app.use(bodyParser());
  app.use(cors());

  // Database connection
  await connectDB();

  // Start ApolloServer
  await server.start();
  app.use(
    koaMiddleware(server, {
      context: async ({ ctx }) => ({ token: ctx.headers.authorization }),
    })
  );

  // Start HTTP server
  await new Promise(() => httpServer.listen({ port }));
  console.log(`🚀 Server ready at http://localhost:${port}`);
};

initializeServer().catch((error) => {
  console.error("Error starting server:", error);
});
