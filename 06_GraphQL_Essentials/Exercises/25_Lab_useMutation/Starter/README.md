# 🧪 Starter: `useMutation` Form Submission

**Estimated time:** 7-10 minutes

## 🎯 Goal

Complete a form-driven Apollo mutation that sends a variable (`name`) to the backend and renders the saved greeting response.

## 📋 User Story

**AS A** student developer  
**I WANT** to run a GraphQL mutation from a form submit event  
**SO THAT** I can save and display server data using Apollo `useMutation()`

## 🏗️ Goal Criteria

**GIVEN** this starter app  
**WHEN** I complete the mutation and component hook wiring  
**THEN** submitting the form should create and display a greeting record from the backend

## ✅ Your Tasks

1. Complete the mutation in `frontend/src/graphql/queries.ts`
   - Declare a `$name` variable
   - Call `createGreeting(name: $name)`
2. In `frontend/src/components/GreetingForm.tsx`, add code to:
   - import `useMutation()`
   - import the mutation
   - execute mutation in `handleSubmit`
   - pass `variables: { name }`
3. Render loading, error, and successful mutation result states

## 🚀 Run the Exercise

```bash
npm run install:all
npm run dev
```

- Frontend: `http://localhost:5173` (or next available Vite port)
- Backend GraphQL: `http://localhost:4000/graphql`
