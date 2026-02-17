import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';

const app = express();
const PORT = process.env.PORT || 4001;

const hackHavenPost = {
  id: 'post-001',
  title: 'Welcome to HackHaven',
  content: 'HackHaven is where developers gather to share builds and ideas.',
  author: 'Knightro',
  tags: ['hackhaven', 'rest', 'graphql'],
  published: true,
  views: 42,
  createdAt: '2026-02-15T12:00:00.000Z'
};

const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    tags: [String!]!
    published: Boolean!
    views: Int!
    createdAt: String!
  }

  type Query {
    post: Post!
  }
`;

const resolvers = {
  Query: {
    post: () => hackHavenPost
  }
};

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`GraphQL API running at http://localhost:${PORT}/graphql`);
  });
}

start().catch((error) => {
  console.error('Failed to start GraphQL server:', error);
  process.exit(1);
});
