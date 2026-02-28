# Lab Solution: Authentication & Authorization

## 🎯 Solution Overview
This solution includes a complete GraphQL API and Cypress test suite for protected resolver testing using auth headers.

## ✅ What Is Completed
- `cy.gql(...)` custom command centralizes GraphQL request setup.
- `login` mutation issues role-based tokens (`student`, `admin`).
- Protected resolvers enforce auth and role checks.
- Cypress tests validate unauthenticated, forbidden, and authorized scenarios.

## 🔍 Code Walkthrough
### Custom command
- `cypress/support/commands.ts` defines a reusable `cy.gql(...)` command.

### Auth checks
- `src/auth.ts` handles token parsing and guard functions.
- `src/resolvers.ts` applies authentication and authorization to protected queries.

### Tests
- `cypress/e2e/authentication-authorization.cy.ts` verifies:
	- `UNAUTHENTICATED` when no token is present
	- `FORBIDDEN` when role is insufficient
	- successful data when admin token is used

## ▶️ Validation Commands
```bash
npm run typecheck
npm run cypress:run -- --spec cypress/e2e/authentication-authorization.cy.ts
```

## 📚 References
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [GraphQL Response Format](https://graphql.org/learn/response/)
