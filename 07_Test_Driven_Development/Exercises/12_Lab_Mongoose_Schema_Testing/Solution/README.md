# Lab Solution: Mongoose Schema Testing

## 🎯 Solution Overview
This solution contains a completed Cypress exercise with **three tests** that validate:
- successful create mutation + middleware slug behavior,
- schema failure for short title,
- schema failure for missing author.

## ✅ Included Completed Tests
File:
- `cypress/e2e/mongoose-schema.cy.ts`

### Completed Test 1
Valid `createBook` mutation:
- asserts success,
- asserts no GraphQL errors,
- asserts middleware-generated slug.

### Completed Test 2
Invalid short title:
- asserts GraphQL errors exist,
- confirms validation failure appears in message.

### Completed Test 3
Missing author:
- asserts GraphQL errors exist,
- confirms required field validation is enforced.

## ▶️ Run Steps
1. Install dependencies:
	```bash
	npm install
	```
2. Create `.env` file:
	```bash
	cp .env.example .env
	```
3. Start MongoDB and server:
	```bash
	npm run dev
	```
4. Run the completed spec:
	```bash
	npm run cypress:run:headed -- --spec cypress/e2e/mongoose-schema.cy.ts
	```

## 📚 Resources
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [Mongoose Validation](https://mongoosejs.com/docs/validation.html)
- [Mongoose Middleware](https://mongoosejs.com/docs/middleware.html)
