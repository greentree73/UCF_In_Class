# HackHaven Apollo Server Example

This folder contains a minimal Node + Express + Apollo Server example using TypeScript and Mongoose. It's intended as a teaching example for migrating REST routes to GraphQL.

Prerequisites
- Node.js 18+ (or compatible)
- MongoDB running locally (or set MONGO_URL to a remote URI)

Quick start
1. Install dependencies
   cd Back_End_Track/Student_Workbooks/06_GraphQL/Capstone/Solution/apollo-server
   npm install

2. Create an .env file (optional)
   MONGO_URL=mongodb://localhost:27017/hackhaven_graphql
   PORT=4000
   JWT_SECRET=change_me

3. Seed demo data (creates user `demo` / password `password`)
   npm run seed

4. Start dev server
   npm run dev

Open the GraphQL playground at http://localhost:4000/graphql (Apollo Server 3 uses Apollo Studio or GraphQL Playground depending on environment).

Sample operations

Register
mutation {
  register(username: "alice", password: "password") {
    token
    user { id username }
  }
}

Login
mutation {
  login(username: "demo", password: "password") {
    token
    user { id username }
  }
}

Create question (requires Authorization header: Bearer <token>)
mutation {
  createQuestion(title: "Hello", body: "GraphQL is great") {
    id
    title
    body
    author { id username }
  }
}

Queries

query {
  questions {
    id
    title
    body
    author { id username }
  }
}

Links and references
- Apollo Server docs: https://www.apollographql.com/docs/apollo-server/
- Apollo Server with Express: https://www.apollographql.com/docs/apollo-server/integrations/middleware/
- Mongoose docs: https://mongoosejs.com/docs/
- GraphQL SDL guide: https://graphql.org/learn/schema/

Notes
- This example uses a simple JWT flow. For production, secure your secrets and use HTTPS.
- The seed script uses `demo` / `password` to make quick demos simpler for students.
