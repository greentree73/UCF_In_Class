import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

const app = express();
const PORT = Number(process.env.PORT || 4003);

async function start() {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();

  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`SDL lab starter running at http://localhost:${PORT}/graphql`);
  });
}

start().catch((error) => {
  console.error('Failed to start starter server:', error);
  process.exit(1);
});
