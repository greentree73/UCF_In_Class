# Lab: SDL Basics with BOOKS Model

## 🎯 Goal
Practice writing GraphQL Schema Definition Language (SDL) that maps directly to the HackHaven `BOOKS` model.

## 🔧 What You'll Build
A small Apollo GraphQL API where you define SDL for:
- A `Book` object type
- Query operations (`books`, `book`)
- A mutation operation (`createBook`) using an input type

## ⏱️ Estimated Time
7-10 minutes

## 🚀 Getting Started

1. Open a terminal in `Starter/sdl-books-lab`.
2. Install dependencies and start dev server:

```bash
npm install
npm run dev
```

3. Open GraphQL endpoint:
- `http://localhost:4003/graphql`

## 📝 Instructions

### Step 1: Review the BOOKS model
Open:
- `src/models/BOOKS.ts`

Identify the fields you need to expose in SDL.

### Step 2: Write SDL for Book and Queries
Open:
- `src/schema.ts`

Replace the placeholder SDL with:
- [ ] `type Book` mapped to BOOKS model fields
- [ ] `type Query` with:
  - [ ] `books: [Book!]!`
  - [ ] `book(id: ID!): Book`

### Step 3: Write SDL for Mutation
In the same `src/schema.ts` file, add:
- [ ] `input CreateBookInput`
- [ ] `type Mutation` with:
  - [ ] `createBook(input: CreateBookInput!): Book!`

### Step 4: Validate with operations
Run this query:

```graphql
query {
  books {
    id
    title
    author
    genre
    publishedYear
  }
}
```

Run this mutation:

```graphql
mutation {
  createBook(input: {
    title: "GraphQL for Knights"
    author: "Knightro"
    genre: "Tech"
    publishedYear: 2026
    inStock: true
  }) {
    id
    title
    author
    inStock
  }
}
```

## ✅ Quick Check

Before moving on, confirm:
- [ ] `Book`, `Query`, `Mutation`, and `CreateBookInput` are defined in SDL
- [ ] `books` query runs successfully
- [ ] `createBook` mutation returns a created book
- [ ] SDL fields align with `BOOKS` model field names/types

## 🏁 Results

After this Lab, you should be able to:
- Write SDL from an existing model
- Define `type`, `input`, `Query`, and `Mutation`
- Explain how SDL acts as the contract between client requests and resolver logic
