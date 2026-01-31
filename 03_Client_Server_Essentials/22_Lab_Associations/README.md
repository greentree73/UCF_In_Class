# Lab: Sequelize Associations - Superhero Edition

## Objective

Learn to implement Sequelize associations by building a superhero database with **One-to-Many** and **Many-to-Many** relationships.

## Instructions

You've been provided with a working Express API that has three models:
- **Superhero** - Heroes with names, aliases, and power levels
- **Power** - Special abilities that belong to superheroes
- **Team** - Groups that superheroes can join

### Your Task

Complete the associations in [src/models/index.ts](src/models/index.ts) to establish the following relationships:

#### 1. One-to-Many: Superhero → Powers

Each superhero can have **many powers**, but each power belongs to **one superhero**.

**What you need to do:**
- Use `Superhero.hasMany()` to establish the relationship
- Use `Power.belongsTo()` to complete the relationship
- Set the foreign key to `'superheroId'`
- Use alias `'powers'` for the hasMany side
- Use alias `'superhero'` for the belongsTo side
- Add `onDelete: 'CASCADE'` so deleting a superhero deletes their powers

#### 2. Many-to-Many: Superhero ↔ Team

Superheroes can belong to **many teams**, and teams can have **many members**.

**What you need to do:**
- Use `Superhero.belongsToMany()` with `Team`
- Use `Team.belongsToMany()` with `Superhero`
- Set the junction table name to `'SuperheroTeams'`
- Set appropriate foreign keys: `'superheroId'` and `'teamId'`
- Use alias `'teams'` for superheroes
- Use alias `'members'` for teams

### Setup

1. Create the database:
```bash
createdb superhero_db
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

### Testing Your Associations

Once you've completed the associations, test them:

```bash
# Get all superheroes with their powers and teams
curl http://localhost:3001/api/superheroes

# Get a single superhero with all relations
curl http://localhost:3001/api/superheroes/1

# Get all teams with their members
curl http://localhost:3001/api/teams
```

Visit http://localhost:3001 for full API documentation.

### Expected Output

When you fetch a superhero, you should see:

```json
{
  "id": 1,
  "name": "Peter Parker",
  "alias": "Spider-Man",
  "powerLevel": 85,
  "powers": [
    {
      "id": 1,
      "name": "Wall Crawling",
      "description": "Ability to stick to and climb walls",
      "damage": 20
    },
    {
      "id": 2,
      "name": "Spider Sense",
      "description": "Precognitive awareness of danger",
      "damage": 0
    }
  ],
  "teams": [
    {
      "id": 1,
      "name": "Avengers",
      "description": "Earth's Mightiest Heroes"
    }
  ]
}
```

### Success Criteria

✅ All routes return data without errors  
✅ Superheroes include their powers  
✅ Superheroes include their teams  
✅ Teams include their members  
✅ Deleting a superhero also deletes their powers (cascade)  
✅ Junction table `SuperheroTeams` is created automatically  

### Hints

- Both sides of a relationship need to be defined
- The `through` option specifies the junction table name
- The `foreignKey` specifies the column in the related table
- The `otherKey` is used in belongsToMany for the opposite foreign key
- Check the README.md in 19_Fac_Associations for syntax examples

Good luck! 🦸‍♂️🦸‍♀️
