const express = require('express');

// Create app instance.
const app = express();

app.use(express.json());

// TODO (student): Remove this unused variable to satisfy ESLint.
const unusedValue = 'remove me';

// Intro route.
app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the starter lint/format API' });
});

// Health route.
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok' });
});

module.exports = app;
