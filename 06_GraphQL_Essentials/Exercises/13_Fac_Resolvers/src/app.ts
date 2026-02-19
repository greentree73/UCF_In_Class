import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { seedDatabase } from './seeds';

const app = express();
const PORT = Number(process.env.PORT || 4013);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hackhaven-resolvers';

async function connectToMongoDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('📦 Connected to MongoDB');
    
    // Seed the database with sample data
    await seedDatabase();
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
}

async function start() {
  // Connect to MongoDB first
  await connectToMongoDB();
  
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`🚀 Resolvers Demo server running at http://localhost:${PORT}/graphql`);
    console.log('📖 Check the console to see resolver execution in action!');
    console.log('💡 Try the example queries in README.md');
  });
}

start().catch((error) => {
  console.error('Failed to start Resolvers Demo server:', error);
  process.exit(1);
});