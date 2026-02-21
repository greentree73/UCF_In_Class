# 🧪 Starter: `useQuery` Hello Component

**Estimated time:** 7-10 minutes

## 🎯 Goal

Complete a simple Apollo Client read flow by querying a greeting from GraphQL and rendering it in a React component.

## 📋 User Story

**AS A** student developer  
**I WANT** to wire a query with Apollo `useQuery()`  
**SO THAT** I can fetch backend data and render it in React

## 🏗️ Goal Criteria

**GIVEN** this starter full-stack app  
**WHEN** I complete the missing query and hook setup  
**THEN** I can see the greeting text from GraphQL on the page

## ✅ Your Tasks

1. Complete the query in `frontend/src/graphql/queries.ts`
2. In `frontend/src/components/HelloGreeting.tsx`, add code to:
   - import the `useQuery()` hook
   - import the greeting query
   - execute the query to request greeting data
3. Render loading, error, and greeting states in the component

## 🚀 Run the Exercise

```bash
npm run install:all
npm run dev
```

- Frontend: `http://localhost:5173` (or next available Vite port)
- Backend GraphQL: `http://localhost:4000/graphql`
