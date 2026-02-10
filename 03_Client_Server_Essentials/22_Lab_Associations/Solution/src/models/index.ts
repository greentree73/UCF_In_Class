import Superhero from './Superhero';
import Power from './Power';
import Team from './Team';

// ============================================
// ONE-TO-MANY ASSOCIATION
// ============================================
// A Superhero can have many Powers
// A Power belongs to one Superhero

Superhero.hasMany(Power, {
  foreignKey: 'superheroId',
  as: 'powers',
  onDelete: 'CASCADE'
});

Power.belongsTo(Superhero, {
  foreignKey: 'superheroId',
  as: 'superhero'
});

// ============================================
// MANY-TO-MANY ASSOCIATION
// ============================================
// A Superhero can belong to many Teams
// A Team can have many Superheroes (members)
// Uses a junction table: SuperheroTeams

Superhero.belongsToMany(Team, {
  through: 'SuperheroTeams',
  foreignKey: 'superheroId',
  otherKey: 'teamId',
  as: 'teams'
});

Team.belongsToMany(Superhero, {
  through: 'SuperheroTeams',
  foreignKey: 'teamId',
  otherKey: 'superheroId',
  as: 'members'
});

// Export all models
export { Superhero, Power, Team };
