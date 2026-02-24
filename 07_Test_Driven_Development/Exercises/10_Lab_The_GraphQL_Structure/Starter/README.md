# Lab Review: The GraphQL Structure (Apollo Sandbox Practice)

## 🎯 Objective
Review and practice how GraphQL **queries** and **mutations** are formatted and executed using this project in Apollo Sandbox.

## ⏱️ Estimated Time
15-20 minutes

## 🧠 Review Focus
By the end of this activity, you should be able to:
- run a simple GraphQL query,
- run a mutation with variables,
- explain the difference between query and mutation,
- and describe how GraphQL operations are sent in a `POST` body.

## 🚀 Setup
1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Start the API server:
	 ```bash
	 npm run dev
	 ```
3. Open Apollo Sandbox at:
	 - `http://localhost:4000/graphql`

## 📝 Apollo Sandbox Practice Tasks

### Task 1: Run a simple query
Paste and run:

```graphql
query {
	health
}
```

✅ Check: You should see a string response like `API is healthy`.

### Task 2: Query a list of books
Paste and run:

```graphql
query {
	books {
		id
		title
		author
	}
}
```

✅ Check: You should receive an array (possibly empty at first).

### Task 3: Create a book using a mutation
Paste and run:

```graphql
mutation CreateBook($input: CreateBookInput!) {
	createBook(input: $input) {
		id
		title
		author
	}
}
```

Use variables:

```json
{
	"input": {
		"title": "GraphQL Review",
		"author": "Student"
	}
}
```

✅ Check: Mutation returns a created book object.

### Task 4: Re-run the books query
Run Task 2 again.

✅ Check: The new book appears in results.

## 📦 What This Means in HTTP POST Body Format
Apollo Sandbox hides HTTP details, but under the hood it sends JSON like:

```json
{
	"query": "query { books { id title author } }"
}
```

and for mutation with variables:

```json
{
	"query": "mutation CreateBook($input: CreateBookInput!) { createBook(input: $input) { id title author } }",
	"variables": {
		"input": {
			"title": "GraphQL Review",
			"author": "Student"
		}
	}
}
```

## ❓ Reflection Questions
- What is the key difference between a query and a mutation?
- Why are variables useful in GraphQL mutations?
- How does Apollo Sandbox help you test your API quickly?

## ✅ Success Criteria
- [ ] You ran at least 2 queries successfully.
- [ ] You ran 1 mutation using variables.
- [ ] You confirmed data changed by re-running a query.
- [ ] You can explain the `query` + `variables` POST body structure.

## 📚 Resources
- [GraphQL Learn](https://graphql.org/learn/)
- [Apollo Sandbox Overview](https://www.apollographql.com/docs/graphos/platform/explorer/sandbox)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server)
