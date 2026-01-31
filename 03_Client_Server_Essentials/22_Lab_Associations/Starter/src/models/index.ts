import Superhero from './Superhero';
import Power from './Power';
import Team from './Team';

// ============================================
// TODO: DEFINE ASSOCIATIONS
// ============================================

// ============================================
// TODO #1: ONE-TO-MANY ASSOCIATION
// ============================================
// A Superhero can have many Powers
// A Power belongs to one Superhero
//
// Instructions:
// 1. Use Superhero.hasMany() to create the relationship with Power
//    - Set foreignKey: 'superheroId'
//    - Set as: 'powers' (this is the alias you'll use in queries)
//    - Set onDelete: 'CASCADE' (deleting a superhero deletes their powers)
//
// 2. Use Power.belongsTo() to complete the relationship with Superhero
//    - Set foreignKey: 'superheroId'
//    - Set as: 'superhero'
//
// Example syntax from 19_Fac_Associations:
// Character.hasMany(Weapon, {
//   foreignKey: 'characterId',
//   as: 'weapons',
//   onDelete: 'CASCADE'
// });
//
// Weapon.belongsTo(Character, {
//   foreignKey: 'characterId',
//   as: 'character'
// });

// TODO: Write your hasMany association here


// TODO: Write your belongsTo association here


// ============================================
// TODO #2: MANY-TO-MANY ASSOCIATION
// ============================================
// A Superhero can belong to many Teams
// A Team can have many Superheroes (members)
//
// Instructions:
// 1. Use Superhero.belongsToMany() with Team
//    - Set through: 'SuperheroTeams' (junction table name)
//    - Set foreignKey: 'superheroId'
//    - Set otherKey: 'teamId'
//    - Set as: 'teams'
//
// 2. Use Team.belongsToMany() with Superhero
//    - Set through: 'SuperheroTeams' (same junction table)
//    - Set foreignKey: 'teamId'
//    - Set otherKey: 'superheroId'
//    - Set as: 'members'
//
// Example syntax from 19_Fac_Associations:
// Character.belongsToMany(Guild, {
//   through: 'CharacterGuilds',
//   foreignKey: 'characterId',
//   otherKey: 'guildId',
//   as: 'guilds'
// });
//
// Guild.belongsToMany(Character, {
//   through: 'CharacterGuilds',
//   foreignKey: 'guildId',
//   otherKey: 'characterId',
//   as: 'members'
// });

// TODO: Write your Superhero.belongsToMany(Team) association here


// TODO: Write your Team.belongsToMany(Superhero) association here


// Export all models
export { Superhero, Power, Team };
