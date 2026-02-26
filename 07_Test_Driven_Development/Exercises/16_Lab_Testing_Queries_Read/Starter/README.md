# Lab: Testing Queries (Read) (Starter)

## 🎯 Objective
Write **two Cypress tests** for GraphQL reads:
- Find All (`books`)
- Find by ID (`book(id: ID!)`)

## 🚀 Setup
1. `npm install`
2. `cp .env.example .env`
3. Start MongoDB
4. `npm run dev`

## 📝 Your Task
Open `cypress/e2e/testing-queries-read.cy.ts` and complete both TODO tests.

### Test 1: Find All
- Query `books`.
- Assert status `200`.
- Assert no GraphQL errors.
- Assert all seeded titles are returned.

### Test 2: Find by ID
- Query `books` to obtain a target id.
- Query `book(id)` with that id.
- Assert the returned record matches expected title/author.

## ▶️ Run
```bash
npm run cypress:run -- --spec cypress/e2e/testing-queries-read.cy.ts
```

## ✅ Success Criteria
- [ ] Both TODO tests implemented.
- [ ] Both tests pass.
- [ ] Tests are deterministic with seeded DB data.
