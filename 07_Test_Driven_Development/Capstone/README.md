# Week 07 Capstone: Recipe GraphQL API (TDD)

## Objective
Build a Recipe API using Express, Apollo Server, and Mongoose by following Test-Driven Development.

You are given:
- fully written Cypress API tests
- a running app scaffold
- Starter files with intentionally incomplete implementation

You will complete:
- `src/models/recipe.ts`
- `src/schema.ts`
- `src/resolvers.ts`

## Structure
- `Starter/` → student version (tests written, implementation incomplete)
- `Solution/` → completed reference version

## Capstone Focus
- GraphQL query testing (`recipes`, `recipe(id)`)
- GraphQL mutation testing (`createRecipe`, `updateRecipe`, `deleteRecipe`)
- Mongoose validation and unique constraints
- GraphQL error assertions (`errors` array, custom `NOT_FOUND` code)
