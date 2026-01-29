## Exercise: Initialize Sequelize (Postgres) in an Express TypeScript Server

Goal
- Add the code necessary to initialize a Sequelize connection to a Postgres database from an existing Express TypeScript server.
- This is an introductory activity: you will only wire up the database connection and verify it connects. No routes or models are required for this task.

Prerequisites
- Node.js and npm installed (recommended Node 16+)
- A Postgres server you can connect to (local or cloud). If you don't have Postgres installed, you can use a free cloud provider or install locally.
- A working Express TypeScript project scaffold (this exercise assumes you have an Express server in `src/index.ts` and a `src` folder).

What you'll add
- Install runtime and type dependencies for Sequelize + Postgres.
- Add a `.env` file with a `DATABASE_URL` connection string.
- Create a simple `src/config/database.ts` module that initializes Sequelize from `process.env.DATABASE_URL` and exports the Sequelize instance.
- Update `src/index.ts` to import the Sequelize instance, authenticate, and sync (or test-connection only).

Step 1 — Install packages
Run these commands in your project root (where `package.json` lives).

```bash
npm install sequelize pg pg-hstore dotenv
npm install --save-dev @types/node typescript
```

Notes:
- `pg` is the Postgres client for Node; `pg-hstore` is a helper package used by Sequelize for serializing JSON/JSONB fields.
- Newer versions of Sequelize include their own TypeScript types; you typically don't need `@types/sequelize`.

Step 2 — Add a `.env` file
Create a `.env` file in your project root (don't commit it). Use the example below and replace the values with your Postgres credentials.

```
# .env (example)
DATABASE_URL=postgres://username:password@localhost:5432/my_database
PORT=4000
```

Step 3 — Add `src/config/database.ts`
Create a new file at `src/config/database.ts` and paste the following TypeScript code. This file reads `DATABASE_URL` from the environment, constructs a Sequelize instance, and exports it.

```ts
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in .env');
}

// If your DATABASE_URL uses SSL (for hosted DBs), you may need to adjust options.
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false, // set to console.log to see SQL queries
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

export default sequelize;
```

Step 4 — Update `src/index.ts` to test the connection
Edit your server bootstrap (commonly `src/index.ts`) to import the `sequelize` instance, then attempt to authenticate and optionally sync. If your project already imports `dotenv` early, you don't need to re-import it here.

Below is an example snippet you can add near the top of `src/index.ts` (after creating your Express app):

```ts
import express from 'express';
import sequelize from './config/database';

const app = express();

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Try to authenticate with the DB
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Optional: sync({ alter: true }) will create tables based on models (not needed for this exercise)
    // await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

start();
```

Step 5 — Run and verify
1. Ensure `.env` exists and `DATABASE_URL` points to a reachable Postgres instance.
2. Start the server (use your project's start script):

```bash
npm run dev   # or `npm start` depending on your setup
```

3. Expected output on success:
- "Database connection has been established successfully." and "Server listening on port ..."

If you see an authentication or connection error, check the `DATABASE_URL`, network access (firewall), and Postgres credentials.

Troubleshooting tips
- "SequelizeDatabaseError: password authentication failed for user ..." — check username/password and ensure the user exists in Postgres.
- "connect ECONNREFUSED" — ensure Postgres server is running and you're connecting to the right host/port.
- SSL errors for hosted DBs — enable the `dialectOptions.ssl` block in the Sequelize options and set `rejectUnauthorized: false` if necessary.
- Missing packages or types — run `npm install` for runtime packages and `npm install --save-dev` for TypeScript types.

Extensions (optional next steps)
- Add a `src/models` folder and create a simple model (User) using Sequelize's Model class.
- Add a route `GET /health` that returns a JSON object with dbConnected: true when `sequelize.authenticate()` succeeded.

Acceptance criteria (how your instructor will verify)
- The project has a `src/config/database.ts` file exporting a Sequelize instance.
- `src/index.ts` attempts `sequelize.authenticate()` during startup and logs success or failure.
- Running `npm run dev` with a valid `DATABASE_URL` logs the successful DB connection and starts the server.

Estimated time: 20–40 minutes for beginners (longer if installing Postgres locally).

Good luck — shout if you hit a specific error and paste the exact error text.
