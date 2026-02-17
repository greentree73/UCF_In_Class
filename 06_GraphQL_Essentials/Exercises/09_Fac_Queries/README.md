# 🔎 Query Basics (HackHaven)

This facilitator Exercise introduces **defining Queries** in GraphQL using the HackHaven `POST` model.

**Estimated time:** 7-10 minutes

## 🎯 Targets

By the end of this Exercise, learners can:
- Explain what a GraphQL `Query` is.
- Define basic query fields in SDL.
- Connect query fields to resolver logic.
- Use arguments to fetch targeted data from the HackHaven `POST` model.

## 💡 What is a Query?

A Query is a read operation in GraphQL. It lets clients request data without changing server state.

In SDL, queries are defined inside:

```graphql
type Query {
  ...
}
```

## 🧠 Why we use Queries

- **Flexible reads:** clients choose exactly the fields they need.
- **Single endpoint:** all reads go through `/graphql`.
- **Clear contracts:** query names and arguments are explicit in schema.
- **Reusable patterns:** same query can support many UI views by selecting different fields.

---

## 🖥️ Project in this folder

Use this project for a live intro to query definitions.

### Run the demo

```bash
npm install
npm run dev
```

Open:
- `http://localhost:4006/graphql`

---

## 🧪 Query Example 1: Fetch one post by ID

```graphql
query {
  post(id: "post-001") {
    id
    title
    author
    views
    published
  }
}
```

## 🧪 Query Example 2: Fetch posts by published state

```graphql
query {
  postsByPublished(published: true) {
    id
    title
    author
    published
  }
}
```

Both examples use the HackHaven in-memory database and the `POST` model in this project.

---

## 📚 Documentation Links

- GraphQL Learn: https://graphql.org/learn/
- GraphQL Queries: https://graphql.org/learn/queries/
- GraphQL Schema Basics: https://graphql.org/learn/schema/
- Apollo Server Docs: https://www.apollographql.com/docs/apollo-server/
- Apollo Server + Express: https://www.apollographql.com/docs/apollo-server/api/express-middleware/

## 🏁 Results

After this facilitator Exercise, learners should understand:
- How to define `Query` fields in SDL.
- How query arguments (`id`, `published`) shape results.
- How resolvers map query definitions to real data.
- Why GraphQL Queries improve API flexibility for front-end teams.
