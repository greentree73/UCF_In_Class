const express = require('express');

// Create app instance.
const app = express();

// Parse JSON request bodies.
app.use(express.json());

// Welcome route.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the Cypress REST starter API'
  });
});

// Health route.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

// TODO: Implement GET /api/users.
// Return status 200 and this response shape:
// {
//   users: [
//     { id: 1, name: 'Ada' },
//     { id: 2, name: 'Grace' }
//   ]
// }

module.exports = app;
