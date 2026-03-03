const express = require('express');

// Create the Express app instance.
const app = express();

// Parse JSON request bodies.
app.use(express.json());

// Welcome route for quick sanity checks.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the headless CI demo API'
  });
});

// Health route often checked in CI pipelines.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: 'ci-demo'
  });
});

// Sample items route used by Cypress assertions.
app.get('/api/items', (_req, res) => {
  res.status(200).json({
    items: [
      { id: 1, name: 'Monitor CI' },
      { id: 2, name: 'Fix failing test' }
    ]
  });
});

module.exports = app;
