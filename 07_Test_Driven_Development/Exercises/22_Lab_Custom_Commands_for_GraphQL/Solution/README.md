# Lab Solution: Custom Commands for GraphQL

## 🎯 Solution Overview
This solution includes a completed Express + Apollo GraphQL API and Cypress tests that use both low-level and domain-level custom commands.

## ✅ What Is Completed
- `cy.gql(...)` wraps GraphQL HTTP request boilerplate in `cypress/support/commands.ts`.
- `cy.createBook(...)` composes on top of `cy.gql(...)` for intent-driven test setup.
- Cypress spec verifies query and mutation flows using custom commands.
- API uses deterministic in-memory state so tests remain fast and repeatable.

## 🔍 Code Walkthrough
### Custom commands
- `cypress/support/commands.ts` defines command typing and registration.
- `gql` centralizes request transport details.
- `createBook` centralizes mutation details.

### Tests
- `cypress/e2e/custom-commands-graphql.cy.ts` shows where each command is most useful.
- Tests assert response status, error shape, and payload behavior.

### API
- `src/server.ts`, `src/schema.ts`, `src/resolvers.ts`, and `src/store.ts` provide a simple GraphQL backend for lab testing.

## ▶️ Validation Commands
```bash
npm run typecheck
npm run cypress:run -- --spec cypress/e2e/custom-commands-graphql.cy.ts
```

## 📚 References
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [GraphQL Response Format](https://graphql.org/learn/response/)
