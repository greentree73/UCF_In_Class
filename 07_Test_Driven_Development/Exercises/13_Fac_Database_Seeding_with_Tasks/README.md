# Facilitator Demo: Database Seeding with Cypress Tasks

## 🎯 Demo Goal
Use Cypress Node tasks to manage MongoDB state for repeatable API tests.

This activity demonstrates:
- cleaning collections before tests,
- seeding deterministic records through `cy.task()`,
- querying seeded data through GraphQL.

## 🧠 Introduction: What Is Database Seeding?
Database seeding is the process of inserting known records into your database before tests run.

In test automation, seeding helps you:
- guarantee a predictable starting state,
- avoid flaky tests caused by leftover data,
- validate business behavior against realistic fixtures,
- keep tests independent from one another.

Without seeding, tests often depend on data created by previous tests or manual setup, which makes failures harder to diagnose.

## 🧠 Introduction: What Are Cypress Tasks?
`cy.task()` lets Cypress tests call code that runs in the Node process (outside the browser/test runner context).

This is important because test code in a spec should not directly open database connections. Instead, tasks provide a safe boundary:
- spec file calls `cy.task("db:...")`,
- Cypress routes that call to `setupNodeEvents` in `cypress.config.ts`,
- Node-side task executes database logic and returns a result.

In short, tasks are the bridge between Cypress tests and backend-only operations like direct MongoDB cleanup and seeding.

## 🧱 Why We Use Seeding + Tasks Together
Using tasks for seeding creates deterministic tests:
1. Clear the target collection.
2. Insert exactly the records needed for the current test.
3. Run GraphQL queries/mutations.
4. Assert expected behavior.

This pattern removes hidden dependencies and keeps each test self-contained.

## 🧱 Stack
- Express + Apollo Server
- Mongoose + MongoDB
- Cypress API tests
- Cypress tasks in `cypress.config.ts`

## 🔄 How It Works in This Activity
1. The API starts with Express + Apollo Server and connects to MongoDB.
2. Cypress registers Node tasks in `cypress.config.ts`.
3. Before each test, the spec calls:
  - `cy.task("db:clearBooks")`
  - `cy.task("db:seedBooks", fixtures)`
4. The test calls GraphQL using `cy.gql(...)`.
5. Assertions verify API responses based on known seeded data.

This demonstrates realistic end-to-end backend verification while still controlling test data precisely.

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
4. Start the API server:
   ```bash
   npm run dev
   ```

## ▶️ Run Cypress
- Open interactive runner:
  ```bash
  npm run cypress:open
  ```
- Run headless:
  ```bash
  npm run cypress:run
  ```
- Run this demo spec only:
  ```bash
  npm run cypress:run -- --spec cypress/e2e/database-seeding-tasks.cy.ts
  ```

## 🔧 Task Design
Defined in `cypress.config.ts` via `setupNodeEvents`:
- `db:clearBooks`: deletes all records in `books`.
- `db:seedBooks`: inserts book fixtures with generated unique slugs.

These tasks run in Cypress’s Node process, so tests can directly control DB setup without exposing special test-only API routes.

## ✅ Teaching Takeaways
By the end of this facilitator demo, students should understand:
- what seeding is and why it matters for test reliability,
- how Cypress tasks execute backend setup logic,
- why `beforeEach` seeding improves test isolation,
- how to verify seeded records through GraphQL queries.

## ⚠️ Best Practices
- Keep seed data small and purpose-driven per test.
- Clear only the collections you need for the current suite.
- Avoid relying on test order.
- Return useful values from tasks (`deletedCount`, `insertedCount`) for debugging.
- Keep DB task logic in `cypress.config.ts` (or extracted task modules), not in spec files.

## 🧪 Demo Spec
File:
- `cypress/e2e/database-seeding-tasks.cy.ts`

What it shows:
1. `beforeEach` uses tasks to clear then seed the DB.
2. GraphQL query verifies seeded records are returned.
3. A second test clears via task and verifies an empty result.

## 💬 Suggested Facilitation Flow
1. Show task registration in `cypress.config.ts`.
2. Explain why `cy.task()` is ideal for DB setup/teardown.
3. Run spec and highlight deterministic outcomes.
4. Connect this pattern to future query/mutation test suites.

## 📚 References
- [Cypress `cy.task()`](https://docs.cypress.io/api/commands/task)
- [Cypress Node Events](https://docs.cypress.io/api/node-events/overview)
- [Mongoose](https://mongoosejs.com/docs/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server)
