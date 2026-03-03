const express = require('express');

// Create Express app instance.
const app = express();

// Parse JSON bodies from requests.
app.use(express.json());

// Intro route so students can verify the server is running.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the Cypress REST demo API'
  });
});

// Health route commonly used for uptime checks and smoke tests.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok'
  });
});

// Simple data route to practice response body assertions.
app.get('/api/users', (_req, res) => {
  res.status(200).json({
    users: [
      { id: 1, name: 'Ada' },
      { id: 2, name: 'Grace' }
    ]
  });
});

module.exports = app;
