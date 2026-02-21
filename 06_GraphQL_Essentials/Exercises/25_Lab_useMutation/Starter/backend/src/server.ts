import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';

async function startServer() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/Apollo_Splashdown';
  await mongoose.connect(mongoUri);
  console.log('📊 Connected to MongoDB:', mongoUri);

  const server = new ApolloServer({ typeDefs, resolvers, introspection: true });
  await server.start();

  const app = express();
  app.use(
    '/graphql',
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        const ok = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
        callback(null, ok);
      },
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server)
  );

  const port = Number(process.env.PORT) || 4000;
  app.listen(port, () => {
    console.log(`🚀 GraphQL ready at http://localhost:${port}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('❌ Server failed to start:', error);
  process.exit(1);
});
