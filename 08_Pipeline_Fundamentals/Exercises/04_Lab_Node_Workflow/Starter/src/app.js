const express = require('express');

// Create our Express application.
const app = express();

// Parse JSON request bodies.
app.use(express.json());

// Basic welcome route.
app.get('/', (_req, res) => {
  res.status(200).json({
    message: 'Welcome to the starter Node workflow API!'
  });
});

// TODO: Add GET /health route.
// It should return status 200 and this JSON body:
// { status: 'ok', service: 'node-workflow-demo' }

module.exports = app;
