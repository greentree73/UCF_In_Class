# Facilitator Demo: Custom Commands for GraphQL

## 🎯 Demo Goal
Teach students how to create Cypress custom commands that reduce repetitive GraphQL request setup while keeping tests readable and reusable.

## 🧠 What Students Should Learn
- Why GraphQL API tests often repeat the same `cy.request()` boilerplate.
- How to centralize GraphQL transport logic in `cypress/support/commands.ts`.
- How to use custom commands (`cy.gql`, `cy.createBook`) to make tests cleaner.
- How command composition supports maintainable test suites as APIs grow.

## 🧱 Project Stack
- Express + Apollo Server
- GraphQL (schema-first)
- In-memory data store for deterministic demo behavior
- Cypress API tests with custom commands

## 🔄 Custom Command Workflow
1. Implement GraphQL schema and resolvers.
2. Write a low-level Cypress custom command for GraphQL POST requests.
3. Build higher-level domain commands on top of the low-level command.
4. Use composed commands inside specs to improve test readability.
5. Keep assertions focused on behavior instead of request plumbing.

## 🛠️ How to Create a Custom Command
### Step 1) Open Cypress support commands file
- Create or edit `cypress/support/commands.ts`.
- This is where reusable Cypress commands are registered for all specs.

### Step 2) Add TypeScript command signatures
- Extend Cypress `Chainable` so `cy.gql(...)` and `cy.createBook(...)` are typed.
- This gives IntelliSense and compile-time feedback in tests.

### Step 3) Register a low-level command
- Use `Cypress.Commands.add('gql', ...)` to wrap a GraphQL `POST` request.
- Keep method, endpoint, and body shape centralized.

```ts
Cypress.Commands.add('gql', (query, variables = {}, options = {}) => {
	return cy.request({
		method: 'POST',
		url: '/graphql',
		body: { query, variables },
		failOnStatusCode: false,
		...options,
	});
});
```

### Step 4) Register a higher-level command
- Build domain helpers (like `createBook`) on top of `cy.gql(...)`.
- This keeps test specs focused on behavior instead of request plumbing.

```ts
Cypress.Commands.add('createBook', (input, options = {}) => {
	const mutation = `
		mutation CreateBook($input: CreateBookInput!) {
			createBook(input: $input) {
				id
				title
			}
		}
	`;

	return cy.gql(mutation, { input }, options);
});
```

### Step 5) Use commands in specs
- Import `./commands.js` in `cypress/support/e2e.ts`.
- Call commands in tests just like built-ins: `cy.gql(...)`, `cy.createBook(...)`.

## 🧪 How We Use Custom Commands in Cypress
### 1) Add a transport-level GraphQL command
- `cy.gql(query, variables, options)` wraps `cy.request()` for `/graphql`.
- It standardizes method, URL, and request body shape.
- It keeps tests from repeating the same request setup.

### 2) Add a domain-level command
- `cy.createBook(input)` is built on top of `cy.gql(...)`.
- It represents business intent instead of low-level transport details.
- This pattern improves readability and supports reuse.

### 3) Compose commands in specs
- Use `cy.gql(...)` for ad-hoc queries/mutations.
- Use `cy.createBook(...)` when a test needs seeded behavior.
- Keep assertions concise and focused on expected GraphQL response shape.

### 4) Keep command syntax explicit for learners
- This demo includes inline test comments that explain each Cypress chain step.
- Comments call out where command subject flow and callbacks are used.

## 📦 Setup
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Start API server:
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
- Run this spec only:
	```bash
	npm run cypress:run -- --spec cypress/e2e/custom-commands-graphql.cy.ts
	```

## 📚 References
- [Cypress Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
- [GraphQL Response Format](https://graphql.org/learn/response/)
- [Apollo Server with Express](https://www.apollographql.com/docs/apollo-server/api/express-middleware)
