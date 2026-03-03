const express = require('express');

// Create app instance.
const app = express();

// Parse JSON requests.
app.use(express.json());

// Welcome route.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the headless CI starter API'
  });
});

// Health route.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    environment: 'ci-demo'
  });
});

// TODO: Implement GET /api/items.
// Return status 200 with this JSON:
// {
//   items: [
//     { id: 1, name: 'Monitor CI' },
//     { id: 2, name: 'Fix failing test' }
//   ]
// }

module.exports = app;
