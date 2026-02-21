# 🧪 Lab: Apollo `useQuery` Hello App

Build a minimal full-stack Apollo app where a React Hello component queries a GraphQL greeting and renders it on the page.

**Estimated time:** 7-10 minutes

## 🎯 Goal

Practice wiring the Apollo `useQuery` hook from query definition to UI rendering.

## 📁 Folders

- **Starter/**: Student version with TODOs
- **Solution/**: Completed version for reference

## 🧭 Choose Your Path

### Starter Path

1. Open `Starter/README.md`
2. Run `npm run install:all`
3. Run `npm run dev`

### Solution Path

1. Open `Solution/README.md`
2. Run `npm run install:all`
3. Run `npm run dev`

## ✅ Results

By the end of this Lab, students can:

- Define a GraphQL query in `queries.ts`
- Use Apollo `useQuery()` in a component
- Render loading, error, and data states

## 🎬 Facilitator Demo Flow

1. Start in `Starter/README.md` and review the three student tasks.
2. Open `Starter/frontend/src/graphql/queries.ts` and point out the incomplete query.
3. Open `Starter/frontend/src/components/HelloGreeting.tsx` and review the TODOs for importing `useQuery`, importing the query, and reading query state.
4. Run Starter (`npm run install:all`, then `npm run dev`) and show the incomplete UI.
5. Switch to `Solution/frontend/src/graphql/queries.ts` and show the completed `greeting` query.
6. Open `Solution/frontend/src/components/HelloGreeting.tsx` and explain `loading`, `error`, and `data` handling.
7. Run Solution and confirm the greeting is rendered from GraphQL.
