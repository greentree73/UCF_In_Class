# Lab: Database Seeding with Tasks (Starter)

## 🎯 Objective
Implement **two Cypress tests** using task-based DB setup:
- seed records using `cy.task()` and assert they are returned,
- clear records using `cy.task()` and assert the list is empty.

## 🚀 Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env`:
   ```bash
   cp .env.example .env
   ```
3. Start MongoDB locally.
4. Start API server:
   ```bash
   npm run dev
   ```

## 📝 Your Task
Open `cypress/e2e/database-seeding-tasks.cy.ts` and complete both TODO tests.

### Test 1: Seed + Query
- Use the provided query and fixtures.
- Assert status is `200`.
- Assert no GraphQL errors.
- Assert two seeded titles are returned.

### Test 2: Clear + Query
- Clear records with the DB task inside the test.
- Query books again.
- Assert the array length is `0`.

## ▶️ Run Commands
- Open Cypress:
  ```bash
  npm run cypress:open
  ```
- Run this spec:
  ```bash
  npm run cypress:run -- --spec cypress/e2e/database-seeding-tasks.cy.ts
  ```

## ✅ Success Criteria
- [ ] Both TODO tests implemented.
- [ ] Both tests pass.
- [ ] Tests are deterministic across repeated runs.
