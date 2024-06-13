import Koa, { Context } from "koa";
import cors from "@koa/cors";
import { config } from "./config/config";
import bodyParser from "koa-bodyparser";
import { connectDB } from "./shared/database";
import { ApolloServer } from "@apollo/server";
import { koaMiddleware } from "@as-integrations/koa";
import { typeDefs } from "./graphql/schemas";
import http from "http";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { resolvers } from "./graphql/resolvers";

const port = config.server.port;
const app = new Koa();

const httpServer = http.createServer(app.callback());
const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
app.use(bodyParser());
app.use(cors());
connectDB();

const bootstap = async () => {
  await server.start().then(() => {
    app.use(
      koaMiddleware(server, {
        context: async ({ ctx }) => ({ token: ctx.headers.authorization }),
      })
    );
  });
  await new Promise(() => httpServer.listen({ port }));
  console.log(`🚀 Server ready at http://localhost:4000`);
};

bootstap();

/* 
  app.use(userRoutes.routes());
  app.use(accountRoutes.routes());
  app.use(transactionRoutes.routes());
*/
