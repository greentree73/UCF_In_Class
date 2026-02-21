import 'dotenv/config';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './schema/resolvers.js';

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
  });

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Apollo_Splashdown';
  await mongoose.connect(MONGODB_URI);
  console.log('📊 Connected to MongoDB:', MONGODB_URI);

  await server.start();

  const app = express();

  app.use(
    '/graphql',
    cors({
      origin: (origin, callback) => {
        if (!origin) {
          callback(null, true);
          return;
        }

        const isLocalhostOrigin = /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin);
        callback(null, isLocalhostOrigin);
      },
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async () => {
        return {
          timestamp: new Date().toISOString(),
        };
      },
    })
  );

  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'apollo-splashdown-backend',
      timestamp: new Date().toISOString(),
      mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    });
  });

  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => {
    console.log('🚀 Apollo Server with Express running!');
    console.log(`   📍 GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log(`   📍 Health check: http://localhost:${PORT}/health`);
    console.log('');
    console.log('🎯 Try some GraphQL queries:');
    console.log('   • Query all questions');
    console.log('   • Create a new question');
    console.log('   • Search and filter questions');
  });
}

process.on('SIGINT', async () => {
  console.log('🛑 Shutting down server...');
  await mongoose.connection.close();
  process.exit(0);
});

startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});
