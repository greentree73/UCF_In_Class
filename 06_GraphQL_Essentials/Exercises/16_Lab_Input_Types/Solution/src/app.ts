import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import mongoose from 'mongoose';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import './seeds';

async function startServer() {
  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/movies-input-types-lab');
  console.log('📊 Connected to MongoDB: movies-input-types-lab');

  // Start Apollo Server
  await server.start();

  // Create Express app
  const app = express();
  const PORT = 4016;

  // Apply Apollo GraphQL middleware
  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`);
    console.log('🎬 Try some Input Type operations!');
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
});