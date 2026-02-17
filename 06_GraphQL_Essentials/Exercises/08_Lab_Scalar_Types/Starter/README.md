# Lab: Scalar Types with BOOKS Model

## 🎯 Goal
Practice writing GraphQL scalar types that map directly to the HackHaven `BOOKS` model.

## 🔧 What You'll Build
A small Apollo GraphQL API where you define scalar fields using:
- `ID`
- `String`
- `Int`
- `Boolean`
- `Float`

## ⏱️ Estimated Time
7-10 minutes

## 🚀 Getting Started

1. Open a terminal in `Starter/scalar-books-lab`.
2. Install dependencies and start dev server:

```bash
npm install
npm run dev
```

3. Open GraphQL endpoint:
- `http://localhost:4005/graphql`

## 📝 Instructions

### Step 1: Review the BOOKS model
Open:
- `src/models/BOOKS.ts`

Find the model fields and decide which GraphQL scalar each one should use.

### Step 2: Define scalar fields in `type Book`
Open:
- `src/schema.ts`

Replace placeholder SDL with a `Book` type that maps model fields to these scalars:
- [ ] `id: ID!`
- [ ] `title: String!`
- [ ] `author: String!`
- [ ] `pageCount: Int!`
- [ ] `inStock: Boolean!`
- [ ] `price: Float!`

### Step 3: Add query and mutation signatures
In `src/schema.ts`, define:
- [ ] `type Query` with:
  - [ ] `books: [Book!]!`
  - [ ] `book(id: ID!): Book`
- [ ] `type Mutation` with:
  - [ ] `updateBookPrice(id: ID!, price: Float!): Book`

### Step 4: Validate with operations
Run this query:

```graphql
query {
  books {
    id
    title
    pageCount
    inStock
    price
  }
}
```

Run this mutation:

```graphql
mutation {
  updateBookPrice(id: "book-001", price: 31.75) {
    id
    title
    price
  }
}
```

## ✅ Quick Check

Before moving on, confirm:
- [ ] All five built-in scalar types are used in `Book` SDL
- [ ] Query signatures match resolver names and args
- [ ] Mutation signature uses `Float` for price
- [ ] Query and mutation execute without schema errors

## 🏁 Results

After this Lab, you should be able to:
- Map model fields to GraphQL scalar types
- Choose correct scalar types for IDs, text, integers, booleans, and decimals
- Write scalar-based `Query` and `Mutation` definitions in SDL
