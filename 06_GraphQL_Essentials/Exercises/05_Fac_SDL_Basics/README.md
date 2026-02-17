# 🧩 SDL Basics (HackHaven)

This facilitator Exercise introduces **Schema Definition Language (SDL)** in GraphQL using the HackHaven `POST` model.

**Estimated time:** 7-10 minutes

## 🎯 Targets

By the end of this Exercise, learners can:
- Explain what SDL is in GraphQL.
- Define a basic `type`, `Query`, and `Mutation` in SDL.
- Connect SDL fields to resolver logic that uses a HackHaven `POST` model.
- Explain why SDL is useful for team communication and API consistency.

## 💡 What is SDL?

SDL (Schema Definition Language) is the way we describe a GraphQL API contract.

With SDL, we define:
- What data types exist (`type Post`, `type User`)
- What clients can request (`type Query`)
- What clients can change (`type Mutation`)
- What shape input should have (`input CreatePostInput`)

## 🧠 Why we use SDL

SDL helps teams by making API behavior explicit before implementation.

- **Clear contract:** Front-End and Back-End developers can agree on fields early.
- **Strong structure:** Clients know exactly what fields are available.
- **Easy onboarding:** New Jr developers can read schema first, then resolvers.
- **Safer growth:** Adding new fields is predictable and version-friendly.

---

## 🖥️ Project in this folder

Use `sdl-basics/` for the live facilitator demo.

### Run the demo

```bash
cd sdl-basics
npm install
npm run dev
```

Open:
- `http://localhost:4002/graphql`

---

## 🧪 SDL Example 1: Query with a lightweight object

This pattern avoids over-fetching by returning only card-level fields.

```graphql
type PostCard {
  id: ID!
  title: String!
  author: String!
}

type Query {
  postCard(id: ID!): PostCard
}
```

In this project, `postCard` maps to the HackHaven `POST` model in resolvers.

## 🧪 SDL Example 2: Mutation with input type

This pattern defines exactly what clients are allowed to send.

```graphql
input CreatePostInput {
  title: String!
  content: String!
  author: String!
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}
```

In this project, `createPost` writes through the same `POST` model.

---

## 🔍 Quick test operations

### Query example

```graphql
query {
  postCard(id: "seed-post-1") {
    id
    title
    author
  }
}
```

### Mutation example

```graphql
mutation {
  createPost(input: {
    title: "SDL in HackHaven"
    content: "SDL defines the contract before resolver logic."
    author: "Knightro"
  }) {
    id
    title
    author
    createdAt
  }
}
```

---

## 📚 Documentation Links

- GraphQL Learn: https://graphql.org/learn/
- GraphQL Schema / SDL: https://graphql.org/learn/schema/
- GraphQL Mutations: https://graphql.org/learn/queries/#mutations
- Apollo Server Docs: https://www.apollographql.com/docs/apollo-server/
- Apollo Server + Express: https://www.apollographql.com/docs/apollo-server/integrations/middleware/
- Mongoose Models: https://mongoosejs.com/docs/models.html

## 🏁 Results

After this facilitator Exercise, learners should understand:
- SDL is the contract for GraphQL APIs.
- `type`, `Query`, `Mutation`, and `input` are core SDL building blocks.
- Resolvers implement SDL behavior using data sources like HackHaven `POST` models.
- Writing SDL first improves API clarity and team alignment.
