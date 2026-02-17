# Lab: Defining Queries with BOOKS Model

## 🎯 Goal
Practice writing GraphQL `Query` definitions that read from the HackHaven `BOOKS` model.

## 🔧 What You'll Build
A small Apollo GraphQL API where you define query fields to:
- fetch all books
- fetch a single book by ID
- fetch books filtered by `inStock`

## ⏱️ Estimated Time
7-10 minutes

## 🚀 Getting Started

1. Open a terminal in `Starter/query-books-lab`.
2. Install dependencies and start dev server:

```bash
npm install
npm run dev
```

3. Open GraphQL endpoint:
- `http://localhost:4007/graphql`

## 📝 Instructions

### Step 1: Review the BOOKS model
Open:
- `src/models/BOOKS.ts`

Identify fields available for query responses and filters.

### Step 2: Define Query fields in SDL
Open:
- `src/schema.ts`

Replace placeholder query definitions with:
- [ ] `books: [Book!]!`
- [ ] `book(id: ID!): Book`
- [ ] `booksByStock(inStock: Boolean!): [Book!]!`

### Step 3: Match schema to existing resolvers
Open:
- `src/resolvers.ts`

Confirm the query names and argument names match your SDL exactly.

### Step 4: Validate with operations
Run this query:

```graphql
query {
  books {
    id
    title
    author
    inStock
  }
}
```

Run this query:

```graphql
query {
  book(id: "book-001") {
    id
    title
    genre
  }
}
```

Run this query:

```graphql
query {
  booksByStock(inStock: true) {
    id
    title
    inStock
  }
}
```

## ✅ Quick Check

Before moving on, confirm:
- [ ] `type Query` includes all three query fields
- [ ] Query arguments use correct scalar types (`ID`, `Boolean`)
- [ ] Query names in SDL match resolver method names
- [ ] All three query operations run without schema errors

## 🏁 Results

After this Lab, you should be able to:
- Define multiple Query fields in SDL
- Use query arguments for targeted reads
- Connect query definitions to resolver logic using model data
