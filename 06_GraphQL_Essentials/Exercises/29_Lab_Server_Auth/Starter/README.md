# 🧪 Starter: Server Auth Context Bug Fix

**Estimated time:** 7-10 minutes

## 🎯 Goal

Debug and fix an Apollo Server resolver bug so authenticated user information appears in the UI after login.

## 📋 User Story

**AS A** student developer  
**I WANT** to register/login and fetch the current user with Apollo Client  
**SO THAT** I can understand how JWT + Apollo context works in a real auth flow

## 🏗️ Goal Criteria

**GIVEN** this starter app  
**WHEN** I fix the resolver context parameter bug  
**THEN** the logged in user should display correctly on the page

## ✅ Your Tasks

1. Run the app and register/login in the UI.
2. Notice the token is created, but `me` does not show user info.
3. Find the bug in `backend/src/schema/resolvers.ts`:
   - `me` resolver currently has misplaced params like:
     - `me: async (_parent: any, context: any)`
4. Fix resolver args so context is read correctly from the 3rd resolver parameter.
5. Verify logged in user now appears in the frontend component.

## 🚀 Run the Exercise

```bash
npm run install:all
npm run dev
```

- Frontend: `http://localhost:5173` (or next available Vite port)
- Backend GraphQL: `http://localhost:4000/graphql`
