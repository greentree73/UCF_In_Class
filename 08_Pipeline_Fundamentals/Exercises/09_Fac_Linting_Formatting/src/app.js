const express = require('express');

// Create the Express app instance.
const app = express();

// Parse incoming JSON payloads.
app.use(express.json());

// Intro route for quick API sanity checks.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the linting/formatting CI demo API'
  });
});

// Health route often used in smoke tests and monitoring.
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    checks: ['lint', 'format', 'cypress']
  });
});

module.exports = app;
