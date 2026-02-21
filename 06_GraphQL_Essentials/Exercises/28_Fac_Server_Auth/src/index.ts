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

// This server shows the Apollo auth pattern:
// 1) client logs in/registers and receives a JWT
// 2) client sends JWT in Authorization header: "Bearer <token>"
// 3) Apollo context reads and verifies JWT for every request
// 4) resolvers use context.user to allow/deny protected actions
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
      // Apollo context runs once per GraphQL request.
      // We use it to decode JWT and attach authenticated user info
      // so every resolver can access context.user.
      context: async ({ req }) => {
        const auth = req.headers.authorization || '';
        // If no auth header is sent, request is treated as anonymous.
        if (!auth) return {};

        // Expected format: "Bearer <token>"
        const parts = auth.split(' ');
        if (parts.length !== 2) return {};

        try {
          // Verify token signature + expiration.
          // If valid, we expose only the minimum user fields needed by resolvers.
          const payload = jwt.verify(parts[1], JWT_SECRET) as {
            id: string;
            username: string;
          };
          return { user: { id: payload.id, username: payload.username } };
        } catch (err) {
          // Invalid/expired token => unauthenticated request.
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
