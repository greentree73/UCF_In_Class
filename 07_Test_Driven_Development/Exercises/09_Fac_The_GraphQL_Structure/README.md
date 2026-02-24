# Facilitator Demo: The GraphQL Structure (Simple Guide)

## 🎯 Demo Goal
Help students understand, in a simple way, how to format GraphQL **queries** and **mutations** inside an HTTP `POST` request body.

## 🧠 Big Idea
With GraphQL, most requests go to **one endpoint**:

- `POST /graphql`

The operation (query or mutation) is sent in the JSON request body.

## 📦 What a GraphQL POST Body Looks Like
At minimum, the body usually contains:

```json
{
	"query": "...GraphQL operation string..."
}
```

If you use variables, include:

```json
{
	"query": "...",
	"variables": {
		"key": "value"
	}
}
```

## 🔎 Query Example (Read Data)
This project supports a `books` query.

### GraphQL operation
```graphql
query {
	books {
		id
		title
		author
	}
}
```

### JSON POST body
```json
{
	"query": "query { books { id title author } }"
}
```

## ✍️ Mutation Example (Write Data)
This project supports `createBook` mutation.

### GraphQL operation
```graphql
mutation CreateBook($input: CreateBookInput!) {
	createBook(input: $input) {
		id
		title
		author
	}
}
```

### JSON POST body with variables
```json
{
	"query": "mutation CreateBook($input: CreateBookInput!) { createBook(input: $input) { id title author } }",
	"variables": {
		"input": {
			"title": "GraphQL Basics",
			"author": "Student"
		}
	}
}
```

## 🧪 Cypress Example (Same POST Body Concept)
In Cypress, you still send the same body structure:

```ts
cy.request({
	method: "POST",
	url: "/graphql",
	body: {
		query: "query { health }"
	}
});
```

## ✅ Quick Rules Students Should Remember
- Use `POST` for GraphQL operations in this project.
- Send JSON with a `query` field.
- Use `variables` for dynamic input values.
- Query = read data, Mutation = change data.

## 🚀 Suggested Demo Flow
1. Start the server: `npm run dev`
2. Open GraphQL endpoint at `http://localhost:4000/graphql`
3. Run one simple query (`health` or `books`)
4. Run one simple mutation (`createBook`)
5. Show students the matching JSON body shape for each.

## 📚 Resources
- [GraphQL Learn](https://graphql.org/learn/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server)
- [Cypress `cy.request()`](https://docs.cypress.io/api/commands/request)
