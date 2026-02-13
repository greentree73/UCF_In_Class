Demo: Express + MongoDB (Node.js driver)
=====================================

This folder contains a small TypeScript Express app that demonstrates connecting to MongoDB with the official Node.js driver and exposes a few simple routes for demo and teaching.

File: `app.ts`
- GET  /              -> status
- GET  /posts         -> list up to 100 documents from `posts` collection
- GET  /posts/:id     -> get a single post by _id
- POST /posts/seed    -> insert three sample documents (returns inserted docs)

Prerequisites
- Node.js (14+), npm
- MongoDB server running locally (mongod) or reachable via `MONGO_URL`

Install dependencies

In this folder run:

```bash
npm install express mongodb dotenv
# If you use TypeScript/ts-node for direct run, also install:
npm install -D typescript ts-node @types/node @types/express
```

Environment variables
- `MONGO_URL` — MongoDB connection string (defaults to `mongodb://localhost:27017`)
- `MONGO_DB`  — database name to use (defaults to `demo`)
- `PORT`      — port for the Express server (defaults to `3000`)

Run the demo

Option A — run with ts-node (development, no build step):

```bash
npx ts-node app.ts
```

Option B — compile and run with Node:

```bash
npx tsc app.ts --outDir dist
node dist/app.js
```

Quick curl examples

- Check server status:

```bash
curl -sS http://localhost:3000/
```

- Seed sample posts (creates 3 documents):

```bash
curl -sS -X POST http://localhost:3000/posts/seed | jq
```

- List posts:

```bash
curl -sS http://localhost:3000/posts | jq
```

- Get a single post by id (replace <id> with an ObjectId from the list):

```bash
curl -sS http://localhost:3000/posts/<id> | jq
```

Notes
- Ensure `mongod` is running before starting this app. If you installed MongoDB locally the default command is typically `mongod` (or use your platform's service manager).
- This demo uses the minimal, direct mongodb driver approach to show basic CRUD patterns. For real projects consider using a higher-level ODM like Mongoose or adding TypeScript types for documents.

Instructor tips
- Use the `/posts/seed` route to create data students can explore with Compass.
- Demonstrate `mongosh` queries and how Compass shows the inserted documents.
