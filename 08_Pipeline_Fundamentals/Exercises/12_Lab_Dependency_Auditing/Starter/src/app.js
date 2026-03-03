const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema, root } = require('./graphql/schema');

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to dependency auditing starter API'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    checks: ['npm-audit', 'snyk', 'cypress']
  });
});

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true
  })
);

module.exports = app;
