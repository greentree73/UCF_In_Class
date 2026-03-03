const express = require('express');

// Create our Express application.
const app = express();

// Parse JSON request bodies.
app.use(express.json());

// Basic welcome route.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the facilitator Node workflow API!'
  });
});

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    service: 'node-workflow-demo'
  });
});

module.exports = app;
