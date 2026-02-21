# 🧪 Starter: Query Variables + `useQuery`

**Estimated time:** 7-10 minutes

## 🎯 Goal

Complete a variable-driven Apollo query flow by sending a name value to GraphQL and rendering a personalized greeting.

## 📋 User Story

**AS A** student developer  
**I WANT** to use GraphQL variables from a React component  
**SO THAT** I can fetch dynamic data with Apollo `useQuery()`

## 🏗️ Goal Criteria

**GIVEN** this starter full-stack app  
**WHEN** I complete the missing variable query and hook usage  
**THEN** the page should display a greeting based on the name input

## ✅ Your Tasks

1. Complete the query in `frontend/src/graphql/queries.ts`
   - It should declare a variable and request `greeting(name: $name)`
2. In `frontend/src/components/HelloGreeting.tsx`, add code to:
   - import `useQuery()`
   - import the query
   - pass variables in `useQuery(..., { variables: { name } })`
3. Render loading, error, and greeting states

## 🚀 Run the Exercise

```bash
npm run install:all
npm run dev
```

- Frontend: `http://localhost:5173` (or next available Vite port)
- Backend GraphQL: `http://localhost:4000/graphql`
