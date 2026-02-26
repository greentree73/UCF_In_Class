# Lab: Testing Mutations (Write) (Starter)

## 🎯 Objective
Implement **two Cypress tests** for GraphQL write operations:
- `createBook` mutation
- `updateBook` mutation

Each test must assert both:
1. GraphQL response payload
2. persisted MongoDB record state

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
Open `cypress/e2e/testing-mutations-write.cy.ts` and complete both TODO tests.

### Test 1: Create Mutation
- Execute `createBook` with test input.
- Assert GraphQL response fields.
- Use `cy.task("db:getBookById", id)` and assert DB values match.

### Test 2: Update Mutation
- Seed a record with `cy.task("db:seedBooks", ...)`.
- Execute `updateBook` for that record id.
- Assert GraphQL response fields changed.
- Assert DB record reflects updated title/author/slug.

## ▶️ Run
```bash
npm run cypress:run -- --spec cypress/e2e/testing-mutations-write.cy.ts
```

## ✅ Success Criteria
- [ ] Both TODO tests implemented.
- [ ] Both tests pass.
- [ ] API response assertions and DB state assertions both exist in each test.
