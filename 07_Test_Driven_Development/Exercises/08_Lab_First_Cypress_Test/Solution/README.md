# Facilitator Demo: First Cypress Test (Simple Start)

## 🎯 Demo Goal
Introduction to Cypress test syntax for API testing.


## 🧠 What Students Learn
- Where Cypress tests are stored
- The basic structure of a Cypress test file
- How `describe` and `it` are used
- How to run tests in Cypress

## 📁 Where Tests Go
For this project, Cypress API tests go in:

- `cypress/e2e/`

The first demo test is in:

- `cypress/e2e/first-api.cy.ts`

## 🧱 Basic Cypress Test Structure
Every Cypress test file usually has:
- `describe("group name", () => { ... })`
- one or more `it("test case", () => { ... })`
- Cypress commands like `cy.request(...)`
- assertions like `expect(...).to.eq(...)`

## 🚀 Run the Demo

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the API server:
   ```bash
   npm run dev
   ```
3. In a second terminal, open Cypress UI:
   ```bash
   npm run cypress:open
   ```
4. Or run headless:
   ```bash
   npm run cypress:run
   ```

5. Run the single demo spec in headed Chrome mode (validated):
   ```bash
   npm run cypress:run:headed -- --spec cypress/e2e/first-api.cy.ts
   ```

## ✅ Verified Working Command Sequence
Use this exact sequence if students are setting up from scratch:

```bash
npm install
npx cypress verify
npm run dev
npm run cypress:run:headed -- --spec cypress/e2e/first-api.cy.ts
```

## 🛠️ Troubleshooting (macOS Electron crash)
If `npm run cypress:open` shows Electron IPC/GPU errors, use one of these:

```bash
# Preferred fallback
npm run cypress:open -- --browser chrome

# Electron fallback with GPU disabled
npm run cypress:open:electron:safe

# Reliable fallback that skips Cypress desktop UI
npm run cypress:run:headed
```

If Cypress appears corrupted or missing, repair with:

```bash
npx cypress cache clear
npx cypress install
npx cypress verify
```

If `npm run cypress:open -- --browser` fails, the command is incomplete.
Use a full browser value, for example:

```bash
npm run cypress:open -- --browser chrome
```

This project defaults to Chrome for `cypress:open` to avoid common Electron renderer crashes.

`Missing baseUrl in compilerOptions. tsconfig-paths will be skipped` is a warning, not the crash root cause.

## 🧪 How This First Test Works
The test sends a request to `/health` and checks that:
- the API responds,
- the status code is `200`.

That’s enough to demonstrate the starting syntax and Cypress flow before adding more complex tests.

## 💬 Facilitator Talking Points
- Keep the first test tiny and readable.
- Focus on syntax and execution flow, not complexity.
- Students should understand *where tests live* before writing many tests.
- After this step, they can expand into GraphQL and mutation/query test cases.

## 📚 References
- [Cypress Docs](https://docs.cypress.io/)
- [Cypress API Commands](https://docs.cypress.io/api/table-of-contents)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
