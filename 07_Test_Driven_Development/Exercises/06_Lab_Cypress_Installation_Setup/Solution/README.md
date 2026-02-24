# Lab Solution: Cypress Installation & Setup (Completed)

## 🎯 Solution Overview
This folder contains the completed setup for Cypress in the API project.

The goal here is infrastructure only: Cypress is installed, configured, and organized so tests can be added in later labs.

## ✅ Completed Setup
- `cypress` added to `devDependencies`
- Cypress scripts added:
  - `npm run cypress:open`
  - `npm run cypress:run`
- `cypress.config.ts` configured for API testing
- Cypress folder structure created:
  - `cypress/e2e/api/`
  - `cypress/fixtures/`
  - `cypress/support/`

## ⚙️ Config Values Used
- `baseUrl`: `http://localhost:4000`
- `specPattern`: `cypress/e2e/**/*.cy.ts`
- `env.apiPath`: `/graphql`

## ▶️ Verification Commands
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start API server:
   ```bash
   npm run dev
   ```
3. In another terminal, open Cypress:
   ```bash
   npm run cypress:open
   ```
4. Or run headless:
   ```bash
   npm run cypress:run
   ```

## 📁 Where Tests Go Next
Add upcoming API specs to:
- `cypress/e2e/api/`

Suggested naming:
- `health.cy.ts`
- `books.cy.ts`
- `graphql.cy.ts`

## 📚 Resources
- [Cypress Docs](https://docs.cypress.io/)
- [Cypress Configuration](https://docs.cypress.io/app/references/configuration)
- [Cypress CLI](https://docs.cypress.io/guides/guides/command-line)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
