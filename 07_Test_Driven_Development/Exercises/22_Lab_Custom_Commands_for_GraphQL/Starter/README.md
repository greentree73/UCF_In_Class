# Lab: Custom Commands for GraphQL

## 🎯 Goal
Discuss and practice how Cypress custom commands reduce repeated GraphQL request setup.

## 🧪 What You Will Work With
- A working Express + Apollo GraphQL API.
- A Cypress support file with custom commands.
- A Cypress spec that uses both low-level and domain-level commands.
- `TODO` discussion prompts already embedded in code.

## ⏱️ Estimated Time
20-30 minutes

## 🚀 Setup
1. Install dependencies:
	```bash
	npm install
	```
2. Start the API server:
	```bash
	npm run dev
	```
3. In a second terminal, run Cypress spec:
	```bash
	npm run cypress:run -- --spec cypress/e2e/custom-commands-graphql.cy.ts
	```

## 📝 Discussion Steps (Follow in order)
### Step 1: Review the custom command signatures
- Open `cypress/support/commands.ts`.
- Discuss why `Chainable` type augmentation is needed.
- Find `TODO` prompts and explain what IntelliSense/type safety they provide.

### Step 2: Review the low-level GraphQL command
- In `commands.ts`, inspect `cy.gql(...)`.
- Discuss why wrapping `cy.request(...)` removes duplicated setup in tests.
- Use the `TODO` comments to explain method, endpoint, body shape, and options.

### Step 3: Review the higher-level domain command
- In `commands.ts`, inspect `cy.createBook(...)`.
- Discuss command composition (`createBook` calling `gql`).
- Use `TODO` prompts to identify where business intent replaces request boilerplate.

### Step 4: Trace custom commands in the spec
- Open `cypress/e2e/custom-commands-graphql.cy.ts`.
- For each test, discuss which command is used and why.
- Use `TODO` prompts to explain command queue behavior and assertion focus.

### Step 5: Validate understanding
- Run type check:
  ```bash
  npm run typecheck
  ```
- Re-run the spec and confirm all tests pass.

## ✅ Checkpoints
- You can explain the difference between low-level and domain-level commands.
- You can identify where command composition improves readability.
- You can point to the exact lines where request boilerplate is centralized.

## 📚 References
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [GraphQL Response Format](https://graphql.org/learn/response/)
