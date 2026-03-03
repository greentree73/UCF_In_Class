const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Headless CI starter API running at http://localhost:${port}`);
});
