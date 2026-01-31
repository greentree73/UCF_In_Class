# Sequelize Associations

## Introduction

**Associations** in Sequelize define relationships between models, just like foreign keys define relationships between tables in a database. They allow you to easily query related data and maintain referential integrity.

## Why Use Associations?

Instead of manually joining tables with raw SQL, Sequelize associations let you:
- Automatically fetch related data with `include`
- Enforce referential integrity with foreign keys
- Use convenient methods like `character.getWeapons()` or `weapon.getCharacter()`
- Let Sequelize handle complex JOIN queries for you

## Types of Associations

### 1. One-to-One (hasOne / belongsTo)

**Example:** Each character has one profile, each profile belongs to one character.

```typescript
Character.hasOne(Profile, { foreignKey: 'characterId' });
Profile.belongsTo(Character, { foreignKey: 'characterId' });
```

**Database Structure:**
```
characters          profiles
+----+-------+      +----+-------------+-------+
| id | name  |      | id | characterId | bio   |
+----+-------+      +----+-------------+-------+
| 1  | Arya  |      | 1  | 1           | Brave |
+----+-------+      +----+-------------+-------+
```

**Usage:**
```typescript
// Get character with profile
const character = await Character.findOne({
  include: Profile
});
console.log(character.profile.bio);

// Or use methods
const profile = await character.getProfile();
await character.setProfile(newProfile);
```

### 2. One-to-Many (hasMany / belongsTo)

**Example:** Each character has many weapons, each weapon belongs to one character.

```typescript
Character.hasMany(Weapon, { foreignKey: 'characterId' });
Weapon.belongsTo(Character, { foreignKey: 'characterId' });
```

**Database Structure:**
```
characters          weapons
+----+-------+      +----+-------------+-------+
| id | name  |      | id | characterId | name  |
+----+-------+      +----+-------------+-------+
| 1  | Arya  |      | 1  | 1           | Sword |
+----+-------+      | 2  | 1           | Bow   |
                    +----+-------------+-------+
```

**Usage:**
```typescript
// Get character with all weapons
const character = await Character.findOne({
  include: Weapon
});
console.log(character.weapons); // Array of weapons

// Or use methods
const weapons = await character.getWeapons();
await character.addWeapon(sword);
await character.removeWeapon(bow);
```

### 3. Many-to-Many (belongsToMany)

**Example:** Characters can belong to many guilds, guilds can have many characters.

```typescript
Character.belongsToMany(Guild, { 
  through: 'CharacterGuilds',
  foreignKey: 'characterId'
});
Guild.belongsToMany(Character, { 
  through: 'CharacterGuilds',
  foreignKey: 'guildId'
});
```

**Database Structure:**
```
characters          CharacterGuilds          guilds
+----+-------+      +-------------+---------+ +----+-----------+
| id | name  |      | characterId | guildId | | id | name      |
+----+-------+      +-------------+---------+ +----+-----------+
| 1  | Arya  |      | 1           | 1       | | 1  | Warriors  |
| 2  | Jon   |      | 1           | 2       | | 2  | Mages     |
+----+-------+      | 2           | 1       | +----+-----------+
                    +-------------+---------+
```

**Usage:**
```typescript
// Get character with all guilds
const character = await Character.findOne({
  include: Guild
});
console.log(character.guilds); // Array of guilds

// Or use methods
const guilds = await character.getGuilds();
await character.addGuild(warriors);
await character.removeGuild(mages);
```

## Key Concepts

### Foreign Keys

The `foreignKey` option specifies which column stores the relationship:

```typescript
// Weapon table will have a 'characterId' column
Character.hasMany(Weapon, { foreignKey: 'characterId' });
```

### Aliases (as)

Use `as` to give associations custom names:

```typescript
Character.hasMany(Weapon, { 
  as: 'inventory',
  foreignKey: 'characterId' 
});

// Now use 'inventory' instead of 'weapons'
const character = await Character.findOne({
  include: { model: Weapon, as: 'inventory' }
});
console.log(character.inventory);
```

### onDelete Cascade

Automatically delete related records when parent is deleted:

```typescript
Character.hasMany(Weapon, { 
  foreignKey: 'characterId',
  onDelete: 'CASCADE'
});

// Deleting a character will also delete all their weapons
await character.destroy();
```

## Common Patterns

### Including Nested Associations

```typescript
const character = await Character.findOne({
  include: [
    { model: Weapon },
    { model: Profile },
    { 
      model: Guild,
      include: [{ model: GuildHall }]
    }
  ]
});
```

### Filtering Included Data

```typescript
const character = await Character.findOne({
  include: {
    model: Weapon,
    where: { type: 'sword' }
  }
});
```

### Counting Related Records

```typescript
const characters = await Character.findAll({
  include: {
    model: Weapon,
    attributes: []
  },
  attributes: {
    include: [
      [sequelize.fn('COUNT', sequelize.col('weapons.id')), 'weaponCount']
    ]
  },
  group: ['Character.id']
});
```

## Best Practices

1. **Define associations in a central location** (usually in `models/index.ts`)
2. **Always define both sides** of the relationship (e.g., both `hasMany` and `belongsTo`)
3. **Use meaningful foreign key names** (e.g., `characterId` instead of just `id`)
4. **Consider cascade deletes** for dependent data
5. **Use aliases** when you have multiple associations to the same model

## This Demo Project

In this project, we'll build a fantasy game database with:

- **Character** (warriors, mages, rogues)
- **Weapon** (swords, bows, staffs)
- **Guild** (factions characters can join)

We'll demonstrate:
- ✅ One-to-Many: Character has many Weapons
- ✅ Many-to-Many: Character belongs to many Guilds
- ✅ Including related data in queries
- ✅ Using association methods
- ✅ Cascade deletes

Let's get started! 🗡️✨
