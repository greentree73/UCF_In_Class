import sequelize from './config/database';
import { Superhero, Power, Team } from './models';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // ============================================
    // CREATE TEAMS
    // ============================================
    const teams = await Team.bulkCreate([
      {
        name: 'Avengers',
        description: 'Earth\'s Mightiest Heroes, assembled to face threats too great for any one hero'
      },
      {
        name: 'Justice League',
        description: 'DC\'s premier superhero team dedicated to protecting Earth from all threats'
      },
      {
        name: 'X-Men',
        description: 'Mutant superheroes fighting for peace and equality between humans and mutants'
      },
      {
        name: 'Guardians of the Galaxy',
        description: 'Cosmic heroes protecting the galaxy from interstellar threats'
      }
    ]);
    console.log(`✅ Created ${teams.length} teams`);

    // ============================================
    // CREATE SUPERHEROES
    // ============================================
    const superheroes = await Superhero.bulkCreate([
      { name: 'Peter Parker', alias: 'Spider-Man', powerLevel: 85 },
      { name: 'Tony Stark', alias: 'Iron Man', powerLevel: 90 },
      { name: 'Thor Odinson', alias: 'Thor', powerLevel: 95 },
      { name: 'Bruce Wayne', alias: 'Batman', powerLevel: 80 },
      { name: 'Clark Kent', alias: 'Superman', powerLevel: 100 },
      { name: 'Diana Prince', alias: 'Wonder Woman', powerLevel: 95 },
      { name: 'Logan', alias: 'Wolverine', powerLevel: 88 },
      { name: 'Jean Grey', alias: 'Phoenix', powerLevel: 98 },
      { name: 'Peter Quill', alias: 'Star-Lord', powerLevel: 75 },
      { name: 'Natasha Romanoff', alias: 'Black Widow', powerLevel: 78 }
    ]);
    console.log(`✅ Created ${superheroes.length} superheroes`);

    // ============================================
    // CREATE POWERS (One-to-Many)
    // ============================================
    const powers = await Power.bulkCreate([
      // Spider-Man
      { name: 'Wall Crawling', description: 'Ability to stick to and climb walls', damage: 20, superheroId: superheroes[0].id },
      { name: 'Spider Sense', description: 'Precognitive awareness of danger', damage: 0, superheroId: superheroes[0].id },
      { name: 'Web Slinging', description: 'Shoot strong webs from wrists', damage: 40, superheroId: superheroes[0].id },
      
      // Iron Man
      { name: 'Repulsor Rays', description: 'Powered particle beam weapons', damage: 85, superheroId: superheroes[1].id },
      { name: 'Flight', description: 'Jet-powered flight capability', damage: 0, superheroId: superheroes[1].id },
      { name: 'Arc Reactor', description: 'Unlimited clean energy source', damage: 0, superheroId: superheroes[1].id },
      
      // Thor
      { name: 'Mjolnir', description: 'Enchanted hammer control', damage: 120, superheroId: superheroes[2].id },
      { name: 'Lightning Control', description: 'Command thunder and lightning', damage: 100, superheroId: superheroes[2].id },
      { name: 'Super Strength', description: 'Godly physical strength', damage: 90, superheroId: superheroes[2].id },
      
      // Batman
      { name: 'Genius Intellect', description: 'World\'s greatest detective', damage: 0, superheroId: superheroes[3].id },
      { name: 'Martial Arts', description: 'Master of 127 fighting styles', damage: 60, superheroId: superheroes[3].id },
      { name: 'Gadgets', description: 'Advanced technology and weapons', damage: 70, superheroId: superheroes[3].id },
      
      // Superman
      { name: 'Super Strength', description: 'Nearly unlimited physical power', damage: 150, superheroId: superheroes[4].id },
      { name: 'Heat Vision', description: 'Emit powerful heat beams from eyes', damage: 110, superheroId: superheroes[4].id },
      { name: 'Flight', description: 'Defy gravity and fly at supersonic speeds', damage: 0, superheroId: superheroes[4].id },
      { name: 'Invulnerability', description: 'Nearly indestructible', damage: 0, superheroId: superheroes[4].id },
      
      // Wonder Woman
      { name: 'Lasso of Truth', description: 'Magical lasso that compels honesty', damage: 50, superheroId: superheroes[5].id },
      { name: 'Super Strength', description: 'Amazonian strength', damage: 95, superheroId: superheroes[5].id },
      { name: 'Flight', description: 'Ability to fly', damage: 0, superheroId: superheroes[5].id },
      
      // Wolverine
      { name: 'Adamantium Claws', description: 'Indestructible retractable claws', damage: 105, superheroId: superheroes[6].id },
      { name: 'Healing Factor', description: 'Rapid healing and regeneration', damage: 0, superheroId: superheroes[6].id },
      { name: 'Enhanced Senses', description: 'Animal-like sensory abilities', damage: 0, superheroId: superheroes[6].id },
      
      // Phoenix
      { name: 'Telekinesis', description: 'Move objects with mind', damage: 130, superheroId: superheroes[7].id },
      { name: 'Telepathy', description: 'Read and control minds', damage: 80, superheroId: superheroes[7].id },
      { name: 'Phoenix Force', description: 'Cosmic power manifestation', damage: 200, superheroId: superheroes[7].id },
      
      // Star-Lord
      { name: 'Element Guns', description: 'Dual element-based weapons', damage: 65, superheroId: superheroes[8].id },
      { name: 'Master Strategist', description: 'Tactical planning and leadership', damage: 0, superheroId: superheroes[8].id },
      
      // Black Widow
      { name: 'Martial Arts', description: 'Expert hand-to-hand combatant', damage: 55, superheroId: superheroes[9].id },
      { name: 'Widow\'s Bite', description: 'Electric shock bracelets', damage: 45, superheroId: superheroes[9].id },
      { name: 'Espionage', description: 'Master spy and infiltrator', damage: 0, superheroId: superheroes[9].id }
    ]);
    console.log(`✅ Created ${powers.length} powers`);

    // ============================================
    // CREATE TEAM MEMBERSHIPS (Many-to-Many)
    // ============================================
    // Avengers: Spider-Man, Iron Man, Thor, Black Widow
    await (superheroes[0] as any).addTeam(teams[0]); // Spider-Man
    await (superheroes[1] as any).addTeam(teams[0]); // Iron Man
    await (superheroes[2] as any).addTeam(teams[0]); // Thor
    await (superheroes[9] as any).addTeam(teams[0]); // Black Widow
    
    // Justice League: Batman, Superman, Wonder Woman
    await (superheroes[3] as any).addTeam(teams[1]); // Batman
    await (superheroes[4] as any).addTeam(teams[1]); // Superman
    await (superheroes[5] as any).addTeam(teams[1]); // Wonder Woman
    
    // X-Men: Wolverine, Phoenix
    await (superheroes[6] as any).addTeam(teams[2]); // Wolverine
    await (superheroes[7] as any).addTeam(teams[2]); // Phoenix
    
    // Guardians: Star-Lord
    await (superheroes[8] as any).addTeam(teams[3]); // Star-Lord
    
    // Some heroes are on multiple teams
    await (superheroes[0] as any).addTeam(teams[3]); // Spider-Man also in Guardians
    await (superheroes[2] as any).addTeam(teams[3]); // Thor also in Guardians
    
    console.log('✅ Created superhero-team associations');

    console.log('\n📊 Seed Summary:');
    console.log('================');
    console.log(`Teams: ${teams.length}`);
    console.log(`Superheroes: ${superheroes.length}`);
    console.log(`Powers: ${powers.length}`);
    console.log('\n✨ Database seeded successfully!');
    console.log('\n💡 Try these endpoints:');
    console.log('  GET http://localhost:3001/api/superheroes');
    console.log('  GET http://localhost:3001/api/teams');
    console.log('  GET http://localhost:3001/api/superheroes/1');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
