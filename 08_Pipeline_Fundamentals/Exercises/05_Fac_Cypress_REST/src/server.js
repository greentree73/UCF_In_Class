const app = require('./app');

// Use provided PORT in hosted environments, fallback to 3000 locally.
const port = process.env.PORT || 3000;

// Start the API server.
app.listen(port, () => {
  console.log(`Cypress REST demo API running at http://localhost:${port}`);
});
