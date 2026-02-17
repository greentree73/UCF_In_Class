# 🌐 REST vs GraphQL (HackHaven Intro)

This facilitator Exercise introduces **what GraphQL is**, **why teams use it**, and how it compares to REST using the HackHaven database and the `POST` model.

**Estimated time:** 7-10 minutes

## 🎯 Targets

By the end of this Exercise, learners can:
- Explain the over-fetching problem in REST.
- Explain the under-fetching problem in REST.
- Describe how GraphQL lets clients request exactly the fields they need.
- Read a basic GraphQL schema, query, and resolver.

## 💡 What is GraphQL?

GraphQL is a query language and runtime for APIs. Instead of multiple fixed REST endpoints, GraphQL usually exposes a single endpoint where the client asks for the exact shape of data it needs.

- REST: server decides response shape per endpoint.
- GraphQL: client declares response shape per query.

## 🧠 The “Why” Discussion

### REST pain point 1: Over-fetching
A REST endpoint often returns more data than the UI needs.

- Example: `GET /api/posts/:id` returns the full HackHaven `POST` document.
- UI only needs `title` and `author` for a card component.
- Result: extra data over the network and more parsing on the client.

### REST pain point 2: Under-fetching
A REST endpoint may not return related data needed for one UI view.

- Example: `GET /api/posts/:id` gives `post`, but not the full `author` profile.
- Client then makes `GET /api/users/:id`.
- Result: multiple round trips for one screen.

### GraphQL benefit: Precise retrieval
GraphQL solves both pain points by allowing one query with only needed fields, including nested related data.

## 🖥️ Live Demo Folders in This Exercise

Use these two folders for the in-session demonstration:

- `REST/` → Express REST API with one route: `GET /api/post`
- `GraphQL/` → Express + Apollo GraphQL API with one query: `post`

Both servers return the same in-memory HackHaven post object defined directly in each `app.ts` file.

### Run REST demo

```bash
cd REST
npm install
npm run dev
```

Then test:

```bash
curl http://localhost:3001/api/post
```

### Run GraphQL demo

```bash
cd GraphQL
npm install
npm run dev
```

Then test:

```bash
curl -X POST http://localhost:4001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { post { id title author } }"}'
```

## 📚 Documentation Links

- GraphQL Learn: https://graphql.org/learn/
- GraphQL Schema Basics: https://graphql.org/learn/schema/
- GraphQL Queries: https://graphql.org/learn/queries/
- Apollo Server (Node): https://www.apollographql.com/docs/apollo-server/
- Apollo Server + Express: https://www.apollographql.com/docs/apollo-server/integrations/middleware/
- Mongoose: https://mongoosejs.com/docs/

## 🏁 Results

After this facilitator Exercise, learners should understand:
- Why GraphQL is often adopted after REST APIs grow in complexity.
- How GraphQL prevents over-fetching and under-fetching.
- How GraphQL uses `typeDefs` + resolvers to read from HackHaven models like `Post`.
- Why this pattern improves front-end flexibility for future Sessions.
