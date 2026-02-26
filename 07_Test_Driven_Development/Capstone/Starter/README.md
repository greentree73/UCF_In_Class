# Week 07 Capstone Starter: Recipe API (TDD)

## What You Are Building
A GraphQL Recipe API with:
- Express + Apollo Server
- Mongoose + MongoDB
- Cypress API tests

All tests are already written.
Your job is to complete the implementation so tests pass.

## Files You Must Complete
1. `src/models/recipe.ts`
2. `src/schema.ts`
3. `src/resolvers.ts`

## Step-by-Step Instructions

### Step 1: Install and configure
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env`:
   ```bash
   cp .env.example .env
   ```
3. Ensure MongoDB is running.

### Step 2: Run the API server
```bash
npm run dev
```

### Step 3: Run tests (expect failures initially)
```bash
npm run cypress:run -- --spec cypress/e2e/recipes-capstone.cy.ts
```

### Step 4: Make tests pass with TDD
Work only in:
- `src/models/recipe.ts`
- `src/schema.ts`
- `src/resolvers.ts`

Suggested order:
1. Implement model validation + unique rules.
2. Implement GraphQL schema fields and operations.
3. Implement resolver behavior and error handling.

### Step 5: Validate final result
- Re-run Cypress spec until all tests pass.
- Run type check:
  ```bash
  npm run typecheck
  ```

## Passing Criteria
- `recipes` and `recipe(id)` queries return expected data.
- `createRecipe`, `updateRecipe`, and `deleteRecipe` mutations behave correctly.
- Validation failures appear in GraphQL `errors`.
- Not-found mutation cases return GraphQL error code `NOT_FOUND`.
