const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./graphql/schema');

// Create Express app instance.
const app = express();

// Parse JSON body payloads.
app.use(express.json());

// Basic REST route for quick sanity checks.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to dependency auditing demo API'
  });
});

// Health route with pipeline-focused metadata.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    checks: ['npm-audit', 'snyk', 'cypress']
  });
});

// GraphQL endpoint. GraphiQL enabled for learning/demo.
app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

module.exports = app;
