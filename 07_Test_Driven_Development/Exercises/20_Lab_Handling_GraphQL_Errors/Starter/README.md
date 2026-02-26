# Lab: Handling GraphQL Errors

## 🎯 Objective
Implement `buildActivitySummary` in TypeScript so all tests pass.

## 🔧 What You'll Build
A strongly-typed summary builder for this lesson objective:

> Asserting on the errors array for validation failures or Not Found scenarios.

## ⏱️ Estimated Time
20-30 minutes

## 🚀 Getting Started
1. Open this `Starter` folder.
2. Run `npm install`.
3. Run `npm test` to view failing tests.
4. Edit `src/activity.ts` and implement the function.
5. Run `npm run typecheck` to verify types.

## 📝 Instructions
### Step 1: Read the contract

### Step 2: Implement the function

### Step 3: Validate

## ✅ Testing Your Work

## 🚀 Extension Challenges (Optional)

## 📚 Intro & Activity Resources
# Lab: Handling GraphQL Errors (Starter)

## 🎯 Objective
Implement **two Cypress tests** that validate GraphQL `errors` handling:
- validation failure for `createBook`
- not-found failure for `updateBook`

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
Open `cypress/e2e/handling-graphql-errors.cy.ts` and complete both TODO tests.

### Test 1: Validation Error
- Call `createBook` with invalid values (short title / empty author).
- Assert HTTP status is `200`.
- Assert `errors` exists and message includes `validation failed`.

### Test 2: Not Found Error
- Call `updateBook` with a valid but missing Mongo ObjectId.
- Assert `data` is `null`.
- Assert first error message includes `Book not found`.
- Assert `extensions.code` equals `NOT_FOUND`.

## ▶️ Run
```bash
npm run cypress:run -- --spec cypress/e2e/handling-graphql-errors.cy.ts
```

## ✅ Success Criteria
- [ ] Both TODO tests implemented.
- [ ] Both tests pass.
- [ ] Assertions verify `errors` content, not only status code.
