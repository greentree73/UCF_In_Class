# Lab: Authentication & Authorization

## 🎯 Goal
Practice creating tests for protected GraphQL resolvers using token-based request headers.

## 🧪 What You Will Work With
- A working Express + Apollo GraphQL API with auth checks.
- A Cypress custom command for GraphQL requests.
- Cypress tests that verify authentication and authorization behavior.
- `TODO` discussion prompts embedded in command and test files.

## ⏱️ Estimated Time
20-30 minutes

## 🚀 Setup
1. Install dependencies:
	```bash
	npm install
	```
2. Start API server:
	```bash
	npm run dev
	```
3. In a second terminal, run the spec:
	```bash
	npm run cypress:run -- --spec cypress/e2e/authentication-authorization.cy.ts
	```

## 📝 Step-by-Step Discussion Instructions
### Step 1: Review the custom command
- Open `cypress/support/commands.ts`.
- Discuss how `cy.gql(query, variables, options)` wraps repeated GraphQL request setup.
- Use each `TODO` to explain request body structure and options.

### Step 2: Review auth and role checks
- Open `src/auth.ts` and `src/resolvers.ts`.
- Discuss where `UNAUTHENTICATED` and `FORBIDDEN` are produced.
- Trace how auth headers become `currentUser` in GraphQL context.

### Step 3: Review test assembly
- Open `cypress/e2e/authentication-authorization.cy.ts`.
- Discuss why `before(...)` captures both student and admin tokens.
- Use `TODO` prompts to explain each scenario and why it should pass or fail.

### Step 4: Compare scenarios
- Scenario A: No auth header → expect `UNAUTHENTICATED`.
- Scenario B: Student token on admin resolver → expect `FORBIDDEN`.
- Scenario C: Admin token on admin resolver → expect successful data.

### Step 5: Validate and reflect
- Run:
  ```bash
  npm run typecheck
  npm run cypress:run -- --spec cypress/e2e/authentication-authorization.cy.ts
  ```
- Discuss why this structure is easy to scale for additional protected resolvers.

## ✅ Checkpoints
- You can explain why a custom command improves readability.
- You can explain the difference between authentication and authorization.
- You can identify where header-based auth is injected into requests.

## 📚 References
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [GraphQL Response Format](https://graphql.org/learn/response/)
