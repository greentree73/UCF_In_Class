const app = require('./app');

// Use env port in hosted envs, otherwise local port 3000.
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Starter API running at http://localhost:${port}`);
});
