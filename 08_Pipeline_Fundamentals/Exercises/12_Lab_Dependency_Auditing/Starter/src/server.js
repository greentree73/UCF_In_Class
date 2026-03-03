const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(
    `Dependency auditing starter API running at http://localhost:${port}`
  );
});
