# 🚀 GraphQL + Apollo Server Intro (HackHaven)

This folder contains a minimal GraphQL API built with **Express** and **Apollo Server**. It is designed for junior developers who are new to GraphQL.

## 🎯 Goal

Understand what GraphQL is, why teams use it, and how Apollo Server helps you build a GraphQL API quickly.

## 🤔 Why GraphQL?

In REST, the server decides response shape at each endpoint. That can cause:

- **Over-fetching**: getting more fields than your UI needs.
- **Under-fetching**: needing multiple requests to build one screen.

GraphQL lets the client request **exactly** the fields it needs in one request.

## 📦 Install and run

```bash
npm install
npm run dev
```

Server URL:

- `http://localhost:4001/graphql`

## 🧪 Test with curl

```bash
curl -X POST http://localhost:4001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { post { id title author } }"}'
```

## 📚 Documentation

- GraphQL Learn: https://graphql.org/learn/
- GraphQL Queries: https://graphql.org/learn/queries/
- GraphQL Schema Basics: https://graphql.org/learn/schema/
- Apollo Server Docs: https://www.apollographql.com/docs/apollo-server/
- Apollo Server + Express: https://www.apollographql.com/docs/apollo-server/integrations/middleware/
- GraphQL over HTTP: https://graphql.org/learn/serving-over-http/
