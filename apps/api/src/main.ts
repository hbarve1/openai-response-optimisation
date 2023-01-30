import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import http from 'http';
import cors from 'cors';
import { json } from 'body-parser';

import { typeDefs, resolvers } from './schema';

const { CORS_ORIGIN, PORT = 3000 } = process.env;

interface MyContext {
  token?: string;
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

server.start().then(async () => {
  app.use(
    cors({
      origin: CORS_ORIGIN.split(','),
      credentials: true,
    })
  );
  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );

  app.get('/', (req, res) => {
    res.send({ message: 'Hello API' });
  });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
});
