# ORM Exercise: Sequelize Postgres Starter

This folder contains a minimal TypeScript Express starter for an in-class exercise.

Objective
- Students will add the code to initialize a Sequelize connection to a Postgres database. No routes or models are required for the in-class activity — just the database connection.

Quick start
1. Copy `.env.example` to `.env` and update `DATABASE_URL`.
2. Install dependencies:

```bash
npm install
```

3. Start the dev server:

```bash
npm run dev
```

Where to edit
- `src/config/database.ts` — add the Sequelize initialization code (there are TODO comments in the file).
- `src/index.ts` — the server bootstrap imports the DB; add code to authenticate and start the server (TODO comments included).
