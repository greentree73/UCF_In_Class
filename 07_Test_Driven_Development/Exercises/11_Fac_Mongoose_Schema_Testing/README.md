# Facilitator Demo: Mongoose Schema Testing with Cypress

## 🎯 Demo Goal
Introduce Cypress for backend API testing by demonstrating how to verify:
- Mongoose **schema validation** behavior
- Mongoose **middleware** behavior

This demo uses GraphQL mutations and checks the response body for success vs validation failure.

## 🧠 What Students Should Learn
- How Cypress can test APIs using `cy.request()`
- Why GraphQL responses should be checked for both `data` and `errors`
- How schema rules (`required`, `minlength`) affect mutation behavior
- How middleware can transform data (slug generation) before save

## 📦 Install and Setup
1. Install project dependencies:
	 ```bash
	 npm install
	 ```
2. Create `.env` file:
	 ```bash
	 cp .env.example .env
	 ```
3. Make sure MongoDB is running locally.
4. Start the API server:
	 ```bash
	 npm run dev
	 ```

## ▶️ Cypress Commands
- Open Cypress UI:
	```bash
	npm run cypress:open
	```
- Run all Cypress specs headless:
	```bash
	npm run cypress:run
	```
- Run this demo spec in headed mode:
	```bash
	npm run cypress:run:headed -- --spec cypress/e2e/mongoose-schema.cy.ts
	```

## 🧪 Introductory Demo Tests Included
File:
- `cypress/e2e/mongoose-schema.cy.ts`

### Test 1: Valid Mutation
- Sends a valid `createBook` mutation.
- Confirms mutation succeeds.
- Confirms middleware generated `slug` from title.

### Test 2: Validation Failure
- Sends invalid input (`title` too short).
- Confirms GraphQL returns an `errors` array.
- Demonstrates schema validation enforcement.

## 🔍 How This Maps to Mongoose Features
- `minlength: 3` on `title` drives validation error behavior.
- `pre("validate")` middleware generates a normalized `slug` field.

Both behaviors are visible in API responses, so students can test them without directly inspecting database internals.

## 💬 Suggested Facilitation Flow
1. Show the model in `src/models/book.ts`.
2. Point out schema validation rules and middleware.
3. Open `cypress/e2e/mongoose-schema.cy.ts` and review comments.
4. Run the spec and discuss why one test passes and one returns errors.
5. Emphasize that Cypress can verify API contracts, not just browser UI.

## 📚 References
- [Cypress Docs](https://docs.cypress.io/)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)
- [Mongoose Middleware](https://mongoosejs.com/docs/middleware.html)
- [Apollo Server Error Handling](https://www.apollographql.com/docs/apollo-server/data/errors)
