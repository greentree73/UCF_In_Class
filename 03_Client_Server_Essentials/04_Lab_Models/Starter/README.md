# Lab: Create a Character Model

## Goal

Complete the Character model by adding the missing member definitions.

## Instructions

1. Open the file `src/models/character.ts`

2. Find the `TODO` comment inside the `Character` class

3. Add four member definitions:
   - `id` (type: number)
   - `name` (type: string)
   - `class` (type: string)
   - `level` (type: number)

4. Each member should follow this pattern:
   ```typescript
   public propertyName!: type
   ```

## Example

Look at the `User` model in `src/models/user.ts` to see how it's done!

## Hint

The `!` operator tells TypeScript that Sequelize will set these values for us.

## Check Your Work

When you're done, your Character class should have four member definitions, just like the User model has three.
