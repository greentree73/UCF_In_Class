# Modern API Testing: A Practical Introduction

## 🎯 Learning Objectives
By the end of this introduction, you should be able to:
- Explain what modern API testing is and why it is critical for backend quality.
- Differentiate unit, integration, contract, and end-to-end API tests.
- Apply the TDD cycle (Red → Green → Refactor) to API-focused development.
- Use Cypress to run API tests in local development and CI.
- Design tests that are reliable, maintainable, and useful for regression prevention.

## 🌐 What Is Modern API Testing?
Modern API testing is the practice of validating backend behavior through automated tests that run consistently across local development, staging, and CI environments.

A modern strategy does not rely on one test type. Instead, it combines multiple layers:
- **Unit tests** for small, isolated logic.
- **Integration tests** for database + service + transport behavior.
- **Contract tests** for request/response schema guarantees.
- **End-to-end tests** for complete user/system flows.

The goal is confidence: if tests pass, you can ship changes with much lower risk.

## 🧠 Why API Testing Matters
APIs are often the core contract between frontend, backend, mobile, and third-party systems. A small backend change can break many clients.

Good API tests help teams:
- detect regressions before deployment,
- verify error handling and edge cases,
- confirm authentication/authorization behavior,
- and protect performance and reliability over time.

## 🔁 TDD for API Development
Test-Driven Development (TDD) works especially well for APIs because contracts are explicit.

### Red → Green → Refactor
1. **Red**: Write a failing test for expected API behavior.
2. **Green**: Implement the minimum change to pass.
3. **Refactor**: Improve clarity/structure while preserving behavior.

### API Example Targets for TDD
- Status codes (`200`, `201`, `400`, `401`, `404`, `500`)
- Response payload shapes
- Validation errors
- Access control behavior
- Database state changes after mutations

## 🧱 The API Testing Pyramid
Use a pyramid approach to balance speed and coverage:

- **Many fast tests at the bottom**: unit + focused integration.
- **Fewer expensive tests at the top**: full end-to-end flows.

This avoids slow, flaky pipelines while preserving strong confidence.

## 🔍 REST and GraphQL Testing Focus

### REST
For REST endpoints, verify:
- method + path correctness,
- status code and headers,
- response shape and types,
- invalid input handling,
- idempotency where required.

### GraphQL
For GraphQL operations, verify:
- operation success and data shape,
- error array behavior for invalid requests,
- resolver authorization rules,
- nested and relational query behavior,
- mutation side effects in persistent storage.

## 🧪 Why Cypress for API Testing?
Cypress is commonly known for browser E2E testing, but it is also effective for API-focused workflows.

With Cypress, you can:
- send direct API calls using `cy.request()`,
- seed/reset state using tasks and scripts,
- assert responses and data contracts,
- and run deterministic tests in CI.

## ⚙️ Installing Cypress

### 1) Initialize your Node project (if needed)
```bash
npm init -y
```

### 2) Add Cypress
```bash
npm install -D cypress
```

### 3) Launch Cypress once
```bash
npx cypress open
```

This scaffolds Cypress folders and config files.

## ▶️ Running Tests with Cypress

### Interactive mode (great for learning and debugging)
```bash
npx cypress open
```

### Headless mode (great for CI)
```bash
npx cypress run
```

### Run a specific spec
```bash
npx cypress run --spec cypress/e2e/api.cy.ts
```

## ✅ What High-Quality API Tests Look Like
Strong tests are:
- **Deterministic**: same result every run.
- **Focused**: one behavior per test.
- **Readable**: test names describe expected outcomes.
- **Isolated**: each test controls its own data/setup.
- **Actionable**: failures tell you exactly what broke.

## ⚠️ Common API Testing Mistakes
- Testing internals instead of observable behavior.
- Sharing mutable state between tests.
- Asserting too little (false positives) or too much (brittle tests).
- Skipping negative-path tests (validation/auth/errors).
- Running only local happy-path tests and ignoring CI parity.

## 🧭 Suggested Workflow for Students
1. Start from a failing test.
2. Make one small implementation change.
3. Re-run tests immediately.
4. Refactor only when tests are green.
5. Add edge-case and error-path coverage.

## 🧰 Tooling and Practices That Help
- TypeScript for safer contracts and better editor feedback.
- Seed/reset scripts for deterministic test state.
- Environment-specific config (`.env`, CI secrets, base URLs).
- Test naming conventions and folder structure consistency.
- Pull-request gates that require test pass status.

## 📚 Recommended Resources

### Core Testing
- [Martin Fowler: Test-Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Node.js Test Runner](https://nodejs.org/api/test.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Cypress
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress API Reference](https://docs.cypress.io/api/table-of-contents)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Configuration](https://docs.cypress.io/app/references/configuration)
- [Cypress CLI](https://docs.cypress.io/guides/guides/command-line)

### API/GraphQL Context
- [GraphQL Learn](https://graphql.org/learn/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server)
- [Mongoose Documentation](https://mongoosejs.com/docs/)

## 🔍 Next Step in This Module
Move into the paired lab and complete a test suite that verifies Cypress setup helpers and API-testing workflow behavior using TDD.
