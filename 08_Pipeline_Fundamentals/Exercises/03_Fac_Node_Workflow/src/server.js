const app = require('./app');

// Use environment variable when available, otherwise use local default.
const port = process.env.PORT || 3000;

// Start server.
app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
