import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { config } from './config.js';
import { resolvers } from './resolvers.js';
import { typeDefs } from './schema.js';

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await mongoose.connect(config.mongoUri);
  await server.start();

  app.use(cors());
  app.use(express.json());
  app.use('/graphql', expressMiddleware(server));

  app.listen(config.port, () => {
    console.log(`🚀 GraphQL server ready at http://localhost:${config.port}/graphql`);
  });
};

startServer().catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
