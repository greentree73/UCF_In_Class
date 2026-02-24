# Facilitator Demo: Cypress Installation & Setup for API Testing

## 🎯 Demo Goal
Show students how to install and configure Cypress in an API project, where Cypress tests should live, and how Cypress works for API testing workflows.

This demo is setup-only: **do not write tests yet**.

## 🧠 Why Cypress for API Testing?
Cypress is useful for API testing because it can:
- send HTTP requests directly to endpoints (`cy.request()`),
- validate status codes and response bodies,
- run tests locally and in CI with the same commands,
- and provide clear output when failures happen.

Even though Cypress is often used for browser testing, it is also strong for backend/API verification.

## 📦 Packages to Install

### Required package
- `cypress` (dev dependency)

### Install command
```bash
npm install -D cypress
```

## 🚀 Setup Steps

### 1) Install project dependencies
```bash
npm install
```

### 2) Add Cypress
```bash
npm install -D cypress
```

### 3) Initialize Cypress
```bash
npx cypress open
```

When Cypress opens the first time, it scaffolds project files such as:
- `cypress/`
- `cypress/e2e/`
- support files
- Cypress config file (`cypress.config.ts` or `.js` depending on setup)

## 📁 Where Tests Go
For this course, place API-focused Cypress specs in:

- `cypress/e2e/api/`

Recommended naming:
- `*.cy.ts` (TypeScript)
- Example pattern: `cypress/e2e/api/health.cy.ts`

Keep specs organized by feature area:
- `cypress/e2e/api/health/`
- `cypress/e2e/api/books/`
- `cypress/e2e/api/auth/`

## ⚙️ Basic Cypress Config for APIs
In `cypress.config.ts`, you typically define:
- `baseUrl` (API host)
- environment values (like `apiPath`)
- spec patterns for test discovery

Example:
```ts
import { defineConfig } from "cypress";

export default defineConfig({
   e2e: {
      baseUrl: "http://localhost:4000",
      specPattern: "cypress/e2e/**/*.cy.ts"
   },
   env: {
      apiPath: "/graphql"
   }
});
```

## ▶️ Commands Students Should Know
- Open Cypress UI: `npx cypress open`
- Run all tests headless: `npx cypress run`
- Run one spec file: `npx cypress run --spec cypress/e2e/api/health.cy.ts`
- Run one spec in headed Chrome mode: `npx cypress run --browser chrome --headed --spec cypress/e2e/api/health.cy.ts`

## ✅ Verified Working Command Sequence
Use this exact order for setup + first stable execution:

```bash
npm install
npx cypress verify
npm run dev
npx cypress run --browser chrome --headed --spec cypress/e2e/api/health.cy.ts
```

## 🛠️ Troubleshooting (macOS IPC/GPU crash)
If Cypress crashes with Electron/renderer IPC errors:

```bash
# Use Chrome directly
npx cypress open --browser chrome

# Skip desktop app and run headed mode
npx cypress run --browser chrome --headed --spec cypress/e2e/api/health.cy.ts
```

If Cypress appears corrupted or missing:

```bash
npx cypress cache clear
npx cypress install
npx cypress verify
```

If `--browser` fails, the command is incomplete. Provide a browser value:

```bash
npx cypress open --browser chrome
```

`Missing baseUrl in compilerOptions. tsconfig-paths will be skipped` is a warning and not the crash root cause.

## 🧪 How Cypress Fits API Workflow
1. Start API server (`npm run dev` in app project)
2. Run Cypress (`open` or `run`)
3. Cypress sends requests to API endpoints
4. Assertions verify response behavior
5. Failures are reported with actionable output

## 💬 Facilitator Talking Points
- Setup must be reproducible across local and CI environments.
- Test folder structure matters as suites grow.
- We separate setup from writing tests so students understand infrastructure first.
- Cypress complements (not replaces) unit tests.

## 📚 References
- [Cypress Docs](https://docs.cypress.io/)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [Cypress Configuration](https://docs.cypress.io/app/references/configuration)
- [Cypress CLI](https://docs.cypress.io/guides/guides/command-line)
