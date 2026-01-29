# Lab: Create a Character Model - SOLUTION

## Goal

Complete the Character model by adding the missing member definitions.

## Solution

The completed Character model includes all four member definitions:

```typescript
export class Character extends Model<CharacterAttributes, CharacterCreationAttributes> implements CharacterAttributes {
  public id!: number
  public name!: string
  public class!: string
  public level!: number
}
```

## Key Points

1. Each member uses the `public` keyword to make it accessible
2. Each member uses the `!` operator (definite assignment assertion) to tell TypeScript that Sequelize will initialize these values
3. Each member has a type annotation (`: number`, `: string`)
4. The member names match the properties defined in the `CharacterAttributes` interface

## How to Run

1. Copy `.env.example` to `.env` and update with your database credentials
2. Create the database: `psql -U postgres -f db_setup/adventure.sql`
3. Install dependencies: `npm install`
4. Run the server: `npm run dev`
5. Test at http://localhost:4000/api

## What Changed

The only change from the starter is adding the four member definitions to the Character class. Everything else remains the same.
