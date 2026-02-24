# Facilitator Demo: Project Initialization (Express + Apollo + Mongoose)

## 🎯 Demo Goal
Show students how to initialize a testable backend project by combining:
- an Express HTTP server,
- an Apollo GraphQL server,
- and Mongoose models for MongoDB.

By the end of this demo, students should understand the core startup flow and why this structure makes testing easier.

## 🧠 Why This Setup?
This architecture is common in modern backend applications:
- **Express** handles HTTP routes and middleware.
- **Apollo Server** provides GraphQL schema + resolver execution.
- **Mongoose** provides schema modeling and database access.

Using clear layers helps students write tests at multiple levels:
- unit tests for resolver behavior,
- integration tests for GraphQL endpoint behavior,
- and system checks for server startup/health.

## 📁 Project Structure
- `src/config.ts` → environment config (`PORT`, `MONGODB_URI`)
- `src/models/book.ts` → Mongoose model definition
- `src/schema.ts` → GraphQL type definitions
- `src/resolvers.ts` → resolver logic (built for testability via dependency injection)
- `src/server.ts` → Express + Apollo + Mongo wiring
- `src/resolvers.test.ts` → unit tests for resolver behavior

## 🚀 Setup Instructions
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Ensure MongoDB is running locally.
4. Start the server:
   ```bash
   npm run dev
   ```

## ▶️ Useful Commands
- Start server once: `npm start`
- Start server with watch mode: `npm run dev`
- Run tests: `npm test`
- Type-check project: `npm run typecheck`

## 🧪 Demo Walkthrough (Facilitator)
1. **Open `src/server.ts`** and explain startup order:
   - load config,
   - connect database,
   - start Apollo,
   - mount middleware,
   - listen for requests.
2. **Show `src/resolvers.ts`** and explain dependency injection for testing.
3. **Run `npm test`** and show how resolver behavior is validated without a real DB.
4. **Call health route**:
   - `GET http://localhost:4000/health`
5. **Test GraphQL quickly** at `/graphql` using this mutation:
   ```graphql
   mutation {
     createBook(input: { title: "TDD for APIs", author: "Instructor" }) {
       id
       title
       author
     }
   }
   ```
6. Run this query:
   ```graphql
   query {
     books {
       id
       title
       author
     }
   }
   ```

## 💬 Teaching Talking Points
- Why startup order matters for reliability.
- Why resolvers should be small and predictable.
- Why tests should validate behavior, not implementation details.
- How this initialization sets up future Cypress/API testing labs.

## 📚 References
- [Express Documentation](https://expressjs.com/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server)
- [GraphQL Learn](https://graphql.org/learn/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Node.js Test Runner](https://nodejs.org/api/test.html)
