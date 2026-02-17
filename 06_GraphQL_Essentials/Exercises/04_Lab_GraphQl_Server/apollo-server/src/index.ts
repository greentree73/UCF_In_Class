import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import jwt from 'jsonwebtoken';

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/hackhaven_graphql';
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

async function start() {
  await mongoose.connect(MONGO);
  console.log('Connected to MongoDB', MONGO);

  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req.headers.authorization || '';
        if (!auth) return {};
        const parts = auth.split(' ');
        if (parts.length !== 2) return {};

        try {
          const payload: any = jwt.verify(parts[1], JWT_SECRET);
          return { user: { id: payload.id, username: payload.username } };
        } catch (err) {
          return {};
        }
      },
    })
  );

  app.listen(PORT, () => console.log(`Apollo server ready at http://localhost:${PORT}/graphql`));
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
