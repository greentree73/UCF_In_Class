const app = require('./app');

// Use PORT from environment when provided.
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Headless CI demo API running at http://localhost:${port}`);
});
