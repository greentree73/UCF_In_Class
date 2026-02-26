# Facilitator Demo: Testing Queries (Read)

## 🎯 Demo Goal
Introduce Cypress tests for GraphQL **read** operations against live MongoDB data.

This facilitator activity focuses on:
- testing **Find All** query behavior,
- testing **Find by ID** query behavior,
- validating responses from real Mongoose-backed data.

## 🧠 What Students Should Learn
- How to seed deterministic records before query tests.
- How to assert array query results for `books`.
- How to extract a record id and verify `book(id: ID!)` returns the correct document.
- How GraphQL read tests can validate both transport success and response payload correctness.

## 🧱 Project Stack
- Express + Apollo Server
- Mongoose + MongoDB
- Cypress API tests
- Cypress tasks for DB cleanup/seeding

## 🔄 Read Query Workflow in This Demo
1. `beforeEach` clears and seeds MongoDB with known books.
2. Test 1 runs `books` and verifies all expected records are returned.
3. Test 2 obtains an id from live data and runs `book(id)`.
4. Assertions confirm the single returned record matches expected fields.

## 🧪 How We Test Queries in Cypress
### 1) Arrange test data with tasks
- `cy.task("db:clearBooks")` resets the collection.
- `cy.task("db:seedBooks", seedBooks)` inserts known records.
- This gives every test a predictable starting point.

### 2) Act by sending GraphQL queries
- Tests call `cy.gql(query, variables)` to send a POST request to `/graphql`.
- For **Find All**, we send the `books` query.
- For **Find by ID**, we first grab a real id from query results, then send `book(id: ID!)`.

### 3) Assert transport + GraphQL payload
- First assert HTTP transport: `response.status === 200`.
- Then assert GraphQL behavior: `response.body.errors` is `undefined` for successful reads.
- Finally assert returned `data` values match expected seeded records.

### 4) Why this approach works well
- It validates the full request path (GraphQL schema + resolver + Mongo query).
- It avoids brittle hard-coded ids by using ids returned from live seeded data.
- It mirrors how real clients query and consume API responses.

## 📦 Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create env file:
   ```bash
   cp .env.example .env
   ```
3. Start MongoDB locally.
4. Start API server:
   ```bash
   npm run dev
   ```

## ▶️ Run Cypress
- Open Cypress UI:
  ```bash
  npm run cypress:open
  ```
- Run all specs headless:
  ```bash
  npm run cypress:run
  ```
- Run this facilitator spec only:
  ```bash
  npm run cypress:run -- --spec cypress/e2e/testing-queries-read.cy.ts
  ```

## 📚 References
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [Cypress `cy.task()`](https://docs.cypress.io/api/commands/task)
- [GraphQL Queries](https://graphql.org/learn/queries/)
- [Mongoose Queries](https://mongoosejs.com/docs/queries.html)
