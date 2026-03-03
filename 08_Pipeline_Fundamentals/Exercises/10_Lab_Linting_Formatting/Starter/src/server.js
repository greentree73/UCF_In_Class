const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Starter lint/format API running at http://localhost:${port}`);
});
