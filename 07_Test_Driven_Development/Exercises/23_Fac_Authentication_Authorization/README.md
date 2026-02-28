# Facilitator Demo: Authentication & Authorization

## 🎯 Demo Goal
Teach students how to test GraphQL authentication and authorization flows in Cypress:
- unauthenticated requests
- authenticated non-admin requests
- authenticated admin requests

## 🧠 What Students Should Learn
- How authentication answers “Who are you?” using an auth token.
- How authorization answers “What can you do?” using role checks.
- Why GraphQL auth failures still often return HTTP `200` with `errors` payloads.
- How to assert both error messages and error codes for protected resolvers.

## 🧱 Project Stack
- Express + Apollo Server
- GraphQL (context-based auth checks)
- In-memory token/user map for deterministic demo behavior
- Cypress API tests with custom GraphQL command

## 🔄 Auth Testing Workflow
1. Send a GraphQL request with no auth header (expect `UNAUTHENTICATED`).
2. Send the same request with a non-admin token (expect `FORBIDDEN`).
3. Send request with an admin token (expect success and no `errors`).
4. Assert `errors[0].extensions.code` for stable machine-readable checks.

## 🧩 How Auth Testing Is Set Up in Cypress
### File structure and responsibility
- `cypress/support/commands.ts` defines reusable Cypress commands.
- `cypress/support/e2e.ts` loads those commands once for every spec.
- `cypress/e2e/authentication-authorization.cy.ts` contains the auth scenarios.

### Why we start with a custom command
- GraphQL API tests repeat the same transport details (`POST`, `/graphql`, request body).
- `cy.gql(query, variables, options)` centralizes that setup so tests focus on auth behavior.
- This keeps specs readable and makes refactors safer when request details change.

### How auth headers are introduced
- The same `cy.gql(...)` command is used for both public and protected requests.
- Unauthenticated scenario: call `cy.gql(...)` without `Authorization` header.
- Authenticated scenario: pass `options.headers.Authorization = 'Bearer <token>'`.
- This makes token/no-token differences explicit and easy to teach.

### How the spec is assembled
- `before(...)` logs in as `student` and `admin` to capture role-based tokens once.
- Each `it(...)` block tests a single responsibility:
	- unauthenticated access
	- authenticated but unauthorized access
	- authenticated and authorized access
- Assertions verify both human-readable messages and machine-readable `extensions.code`.

## 🧪 How We Test Auth in Cypress
### 1) Authenticate and capture tokens
- Use a `login` mutation to get a token for a specific role.
- Store tokens in test-local variables to simulate different users.

### 2) Send GraphQL requests with optional auth headers
- Use `cy.gql(query, variables, options)`.
- Pass `headers: { Authorization: 'Bearer <token>' }` when authenticated.

### 3) Assert auth failure behavior
- Unauthenticated request should return GraphQL error code `UNAUTHENTICATED`.
- Authenticated but unauthorized request should return `FORBIDDEN`.

### 4) Assert authorized behavior
- Authorized admin request should return expected data.
- `response.body.errors` should be `undefined` for success path.

## 📦 Setup
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Create env file:
	 ```bash
	 cp .env.example .env
	 ```
3. Start API server:
	 ```bash
	 npm run dev
	 ```

## ▶️ Run Cypress
- Open Cypress UI:
	```bash
	npm run cypress:open
	```
- Run all specs headless:
	```bash
	npm run cypress:run
	```
- Run auth spec only:
	```bash
	npm run cypress:run -- --spec cypress/e2e/authentication-authorization.cy.ts
	```

## 📚 References
- [GraphQL Response Format](https://graphql.org/learn/response/)
- [Apollo Server Context](https://www.apollographql.com/docs/apollo-server/data/context)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
