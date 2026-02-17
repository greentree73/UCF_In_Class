# 🔢 Scalar Types Basics (HackHaven)

This facilitator Exercise introduces GraphQL built-in scalar types using the HackHaven `POST` model.

**Estimated time:** 7-10 minutes

## 🎯 Targets

By the end of this Exercise, learners can:
- Identify built-in GraphQL scalar types: `ID`, `String`, `Int`, `Boolean`, `Float`.
- Map model fields to scalar types in SDL.
- Explain why scalar types help API consistency and validation.
- Read scalar-based queries and mutations using HackHaven `POST` data.

## 💡 What are scalar types?

Scalar types are the most basic GraphQL data values.

- `ID` → unique identifier for records
- `String` → text values
- `Int` → whole numbers
- `Boolean` → `true` / `false`
- `Float` → decimal numbers

## 🧠 Why we use scalar types

- **Clear data contract:** Clients know what type each field should be.
- **Safer requests:** Invalid types fail early.
- **Better tooling:** Editors and clients can auto-validate inputs.
- **Easier collaboration:** Front-End and Back-End agree on field expectations.

---

## 🖥️ Project in this folder

Use `scalar-types-basics/` for the live facilitator demo.

### Run the demo

```bash
cd scalar-types-basics
npm install
npm run dev
```

Open:
- `http://localhost:4004/graphql`

---

## 🧪 Scalar Example 1: Query scalar fields

This query demonstrates scalar mapping from the HackHaven `POST` model.

```graphql
query {
  postScalars(id: "post-001") {
    id
    title
    views
    published
    rating
  }
}
```

### Scalar mapping in `Post`

- `id: ID!`
- `title: String!`
- `views: Int!`
- `published: Boolean!`
- `rating: Float!`

## 🧪 Scalar Example 2: Mutation with scalar inputs

This mutation updates `Float` and `Boolean` fields on a post.

```graphql
mutation {
  updatePostState(id: "post-001", rating: 4.9, published: true) {
    id
    title
    published
    rating
  }
}
```

---

## 📚 Documentation Links

- GraphQL Learn: https://graphql.org/learn/
- GraphQL Built-in Scalars: https://graphql.org/learn/schema/#scalar-types
- GraphQL Queries and Mutations: https://graphql.org/learn/queries/
- Apollo Server Docs: https://www.apollographql.com/docs/apollo-server/
- Apollo Server + Express: https://www.apollographql.com/docs/apollo-server/api/express-middleware/

## 🏁 Results

After this facilitator Exercise, learners should understand:
- What each built-in scalar type represents.
- How to map `POST` model fields to scalars in GraphQL SDL.
- How scalar types improve API clarity and request validation.
- How scalar inputs and outputs appear in real GraphQL operations.
