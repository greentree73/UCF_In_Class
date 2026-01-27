# Lab: Refactor Routes to Use Express Router

## Goal

Separate user-related routes from the main router into their own module for better organization.

## Setup

Before you begin, install all the necessary packages:

```bash
# Install Sequelize
npm install sequelize sqlite3 pg pg-hstore mysql2

```

This will install all dependencies including Express, Sequelize, and TypeScript.

## Current Problem

Right now, all our routes are in one file (`src/routes/index.ts`). As our application grows, this file will become messy and hard to manage. We need to organize routes by feature.

## Your Task

Create a separate router module for user routes.

## Instructions

### Step 1: Create the User Router File

1. Create a new file: `src/routes/userRoutes.ts`

2. Import what you need at the top:
   ```typescript
   import { Router } from 'express'
   import { User } from '../models'
   ```

3. Create a new router:
   ```typescript
   const router = Router()
   ```

### Step 2: Move the User Routes

1. Find the three user routes in `src/routes/index.ts` (they're marked with a TODO comment)

2. Copy them to your new `userRoutes.ts` file

3. **Important**: Remove the `/users` prefix from the routes in the new file
   - Change `router.get('/users', ...)` to `router.get('/', ...)`
   - Change `router.post('/users', ...)` to `router.post('/', ...)`
   - Change `router.get('/users/:id', ...)` to `router.get('/:id', ...)`

4. Export the router at the bottom:
   ```typescript
   export default router
   ```

### Step 3: Import and Use the User Router

1. In `src/routes/index.ts`, import your new user router at the top:
   ```typescript
   import userRoutes from './userRoutes'
   ```

2. Delete the three user route handlers (the ones you moved)

3. Replace them with a single line that uses your user router:
   ```typescript
   router.use('/users', userRoutes)
   ```

### Step 4: Test Your Work

1. Start the server: `npm run dev`

2. Test these endpoints:
   - `GET http://localhost:4000/api/` - Should return `{ status: 'ok' }`
   - `GET http://localhost:4000/api/users` - Should return an array of users
   - `POST http://localhost:4000/api/users` - Should create a new user

## Understanding What You Did

When you write `router.use('/users', userRoutes)`, you're telling Express:
- "For any request that starts with `/users`..."
- "...use the userRoutes router to handle it"

This is why we removed `/users` from the route paths in `userRoutes.ts` - Express already knows these routes are under `/users`!

## Why This Matters

Now when you need to add more user routes, you know exactly where to put them. And when your app grows to have products, orders, etc., you can create separate router files for each feature.

## Success Checklist

- [ ] Created `src/routes/userRoutes.ts`
- [ ] Moved all user routes to the new file
- [ ] Removed `/users` prefix from route paths in `userRoutes.ts`
- [ ] Imported and used `userRoutes` in `index.ts`
- [ ] Deleted the old user routes from `index.ts`
- [ ] Server runs without errors
- [ ] All endpoints still work correctly
