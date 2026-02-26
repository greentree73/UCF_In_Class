# Facilitator Demo: Handling GraphQL Errors

## 🎯 Demo Goal
Teach students how to assert on GraphQL `errors` responses for two common failure paths:
- schema/model validation failure
- not-found mutation target

## 🧠 What Students Should Learn
- Why GraphQL requests can return HTTP `200` even when resolver execution fails.
- How to inspect `response.body.errors` instead of relying only on status code.
- How to assert error messages for validation and business-rule failures.

## 🧱 Project Stack
- Express + Apollo Server
- Mongoose + MongoDB
- Cypress API tests
- Cypress tasks for deterministic DB setup

## 🔄 Error Testing Workflow
1. Reset DB state before each test.
2. Execute GraphQL operation with intentionally invalid inputs.
3. Assert HTTP status remains `200`.
4. Assert `response.body.errors` exists.
5. Assert error message contains expected failure reason.

## 🧪 How We Test Errors in Cypress
### 1) Arrange failure conditions
- Use `cy.task("db:clearBooks")` so each test starts clean.
- Create inputs that intentionally fail validation (short title, missing author).
- Use a valid-format but missing id to trigger not-found resolver behavior.

### 2) Act by sending GraphQL requests
- Use `cy.gql(queryOrMutation, variables)` to call `/graphql`.
- We still expect HTTP transport success (`200`) because GraphQL errors are returned in payload, not as HTTP failure by default.

### 3) Assert GraphQL error payload
- Assert `response.body.data` shape for error paths (`undefined` or `null`, depending on operation).
- Assert `response.body.errors` exists and includes at least one error item.
- Assert `errors[0].message` contains the expected failure description.

### 4) Assert machine-readable error codes
- For business-rule failures (like missing update target), assert `errors[0].extensions.code`.
- Example in this demo: `NOT_FOUND`.
- This is more stable than relying on message text alone and maps cleanly to client-side handling.

### 5) Compare with happy-path behavior
- In successful requests, assert `response.body.errors` is `undefined` and `data` contains expected fields.
- This contrast helps students clearly separate success and failure response patterns.

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
- Run error-handling spec only:
	```bash
	npm run cypress:run -- --spec cypress/e2e/handling-graphql-errors.cy.ts
	```

## 📚 References
- [GraphQL Response Format](https://graphql.org/learn/response/)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)
