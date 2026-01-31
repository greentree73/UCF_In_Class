import Character from './Character';
import Weapon from './Weapon';
import Guild from './Guild';

// ============================================
// ONE-TO-MANY ASSOCIATION
// ============================================
// A Character can have many Weapons
// A Weapon belongs to one Character

Character.hasMany(Weapon, {
  foreignKey: 'characterId',
  as: 'weapons',
  onDelete: 'CASCADE'
});

Weapon.belongsTo(Character, {
  foreignKey: 'characterId',
  as: 'character'
});

// ============================================
// MANY-TO-MANY ASSOCIATION
// ============================================
// A Character can belong to many Guilds
// A Guild can have many Characters
// Uses a junction table: CharacterGuilds

Character.belongsToMany(Guild, {
  through: 'CharacterGuilds',
  foreignKey: 'characterId',
  otherKey: 'guildId',
  as: 'guilds'
});

Guild.belongsToMany(Character, {
  through: 'CharacterGuilds',
  foreignKey: 'guildId',
  otherKey: 'characterId',
  as: 'members'
});

// Export all models
export { Character, Weapon, Guild };
