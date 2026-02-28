# Week 07 Capstone Solution: Recipe API (TDD)

## Overview
This is the completed reference implementation for the Week 07 capstone.

It includes:
- complete Mongoose `Recipe` model validation
- complete GraphQL schema
- complete resolver logic for query/mutation behavior
- passing Cypress API tests

## Setup
```bash
npm install
cp .env.example .env
npm run dev
```

## Run Tests
```bash
npm run cypress:run -- --spec cypress/e2e/recipes-capstone.cy.ts
```

## Highlights
- Required and constrained fields (`title`, `cuisine`, `prepTimeMinutes`, `difficulty`, `slug`, `ingredients`)
- Unique slug enforcement
- `NOT_FOUND` GraphQL errors for missing update/delete targets
- Full CRUD behavior validated against persisted MongoDB state
