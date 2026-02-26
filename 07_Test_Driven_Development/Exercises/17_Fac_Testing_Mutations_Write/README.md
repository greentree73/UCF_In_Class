# Facilitator Demo: Testing Mutations (Write)

## 🎯 Demo Goal
Show how to test GraphQL write operations for both API-level correctness and actual database persistence.

This activity introduces:
- `createBook` mutation testing,
- `updateBook` mutation testing,
- dual-layer assertions on GraphQL response and MongoDB state.

## 🧠 What Students Should Learn
- Why mutation tests should validate both transport payload and stored data.
- How to use Cypress tasks to inspect database state after write operations.
- How update tests can prove that persisted fields changed as expected.

## 🧱 Project Stack
- Express + Apollo Server
- Mongoose + MongoDB
- Cypress API tests
- Cypress tasks for DB cleanup, seeding, and lookup

## 🔄 Mutation Testing Workflow
1. Reset DB state in `beforeEach`.
2. Execute mutation with `cy.gql(...)`.
3. Assert GraphQL response fields.
4. Fetch DB record via `cy.task("db:getBookById", id)`.
5. Assert DB values match response expectations.

## 🧪 How We Test Mutations in Cypress
### 1) Arrange deterministic starting data
- Use `cy.task("db:clearBooks")` before each test to remove leftover records.
- Seed only when needed (for update scenarios) so test intent is explicit.
- This ensures each mutation test starts from a known state.

### 2) Act by sending a GraphQL mutation request
- Use `cy.gql(mutation, variables)` to POST to `/graphql`.
- For **create**, send a brand-new input object.
- For **update**, seed a record first, then send mutation with that record id.

### 3) Assert API response behavior
- Confirm transport success: `response.status === 200`.
- Confirm GraphQL success: `response.body.errors` is `undefined`.
- Confirm returned mutation fields match expected values.

### 4) Assert persistence behavior in MongoDB
- Read the stored record using `cy.task("db:getBookById", id)`.
- Verify persisted fields actually changed (not just response payload).
- This catches resolver bugs where response may look correct but DB is wrong.

### 5) Why this is important
- Mutation tests validate both layers:
  - GraphQL contract (what clients receive)
  - Database truth (what is actually saved)
- This gives stronger confidence than response-only assertions.

## ⚠️ Common Mutation Testing Mistakes
- [ ] Only asserting on `response.status` and skipping payload checks.
- [ ] Asserting mutation response values but not validating persisted DB state.
- [ ] Reusing static titles/slugs that cause uniqueness collisions across runs.
- [ ] Forgetting to clear/seed DB in `beforeEach`, causing flaky tests.
- [ ] Hard-coding ids instead of using ids returned from seeded/created records.
- [ ] Updating records without asserting exactly which fields changed.

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
- Run mutation spec only:
  ```bash
  npm run cypress:run -- --spec cypress/e2e/testing-mutations-write.cy.ts
  ```

## 📚 References
- [GraphQL Mutations](https://graphql.org/learn/queries/#mutations)
- [Cypress `cy.task()`](https://docs.cypress.io/api/commands/task)
- [Mongoose `findByIdAndUpdate`](https://mongoosejs.com/docs/tutorials/findoneandupdate.html)
