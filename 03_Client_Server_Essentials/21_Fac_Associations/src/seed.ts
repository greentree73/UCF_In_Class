import sequelize from './config/database';
import { Character, Weapon, Guild } from './models';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');

    // Sync database (drop and recreate tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database synced');

    // ============================================
    // CREATE GUILDS
    // ============================================
    const guilds = await Guild.bulkCreate([
      {
        name: 'Warriors of the Dawn',
        description: 'Elite fighters who defend the realm with strength and honor'
      },
      {
        name: 'Arcane Circle',
        description: 'Masters of magic and ancient knowledge'
      },
      {
        name: 'Shadow Syndicate',
        description: 'Stealthy rogues and assassins who operate in the darkness'
      },
      {
        name: 'Merchants Guild',
        description: 'Traders and craftsmen who fuel the economy'
      }
    ]);
    console.log(`✅ Created ${guilds.length} guilds`);

    // ============================================
    // CREATE CHARACTERS
    // ============================================
    const characters = await Character.bulkCreate([
      {
        name: 'Thorin Ironshield',
        class: 'Warrior',
        level: 25,
        health: 250
      },
      {
        name: 'Gandalf the Grey',
        class: 'Mage',
        level: 50,
        health: 180
      },
      {
        name: 'Arya Nightblade',
        class: 'Rogue',
        level: 20,
        health: 140
      },
      {
        name: 'Legolas Swiftarrow',
        class: 'Ranger',
        level: 22,
        health: 160
      },
      {
        name: 'Gimli Stonefist',
        class: 'Warrior',
        level: 23,
        health: 220
      },
      {
        name: 'Merlin the Wise',
        class: 'Mage',
        level: 45,
        health: 170
      }
    ]);
    console.log(`✅ Created ${characters.length} characters`);

    // ============================================
    // CREATE WEAPONS (One-to-Many)
    // ============================================
    const weapons = await Weapon.bulkCreate([
      // Thorin's weapons
      {
        name: 'Orcrist',
        type: 'Sword',
        damage: 85,
        characterId: characters[0].id
      },
      {
        name: 'Oakenshield',
        type: 'Shield',
        damage: 30,
        characterId: characters[0].id
      },
      // Gandalf's weapons
      {
        name: 'Glamdring',
        type: 'Sword',
        damage: 90,
        characterId: characters[1].id
      },
      {
        name: 'Staff of Power',
        type: 'Staff',
        damage: 120,
        characterId: characters[1].id
      },
      // Arya's weapons
      {
        name: 'Needle',
        type: 'Rapier',
        damage: 65,
        characterId: characters[2].id
      },
      {
        name: 'Shadow Dagger',
        type: 'Dagger',
        damage: 55,
        characterId: characters[2].id
      },
      // Legolas's weapons
      {
        name: 'Elven Longbow',
        type: 'Bow',
        damage: 95,
        characterId: characters[3].id
      },
      {
        name: 'White Knife',
        type: 'Knife',
        damage: 40,
        characterId: characters[3].id
      },
      // Gimli's weapons
      {
        name: 'Bearded Axe',
        type: 'Axe',
        damage: 100,
        characterId: characters[4].id
      },
      {
        name: 'Walking Axe',
        type: 'Axe',
        damage: 80,
        characterId: characters[4].id
      },
      // Merlin's weapons
      {
        name: 'Crystal Staff',
        type: 'Staff',
        damage: 110,
        characterId: characters[5].id
      },
      {
        name: 'Arcane Wand',
        type: 'Wand',
        damage: 75,
        characterId: characters[5].id
      }
    ]);
    console.log(`✅ Created ${weapons.length} weapons`);

    // ============================================
    // CREATE CHARACTER-GUILD ASSOCIATIONS (Many-to-Many)
    // ============================================
    // Thorin - Warriors of the Dawn
    await (characters[0] as any).addGuild(guilds[0]);
    
    // Gandalf - Arcane Circle, Merchants Guild
    await (characters[1] as any).addGuilds([guilds[1], guilds[3]]);
    
    // Arya - Shadow Syndicate
    await (characters[2] as any).addGuild(guilds[2]);
    
    // Legolas - Warriors of the Dawn, Merchants Guild
    await (characters[3] as any).addGuilds([guilds[0], guilds[3]]);
    
    // Gimli - Warriors of the Dawn
    await (characters[4] as any).addGuild(guilds[0]);
    
    // Merlin - Arcane Circle
    await (characters[5] as any).addGuild(guilds[1]);
    
    console.log('✅ Created character-guild associations');

    // ============================================
    // DISPLAY SUMMARY
    // ============================================
    console.log('\n📊 Seed Summary:');
    console.log('================');
    console.log(`Guilds: ${guilds.length}`);
    console.log(`Characters: ${characters.length}`);
    console.log(`Weapons: ${weapons.length}`);
    console.log('\n✨ Database seeded successfully!');
    console.log('\n💡 Try these endpoints:');
    console.log('  GET http://localhost:3001/api/characters');
    console.log('  GET http://localhost:3001/api/guilds');
    console.log('  GET http://localhost:3001/api/characters/1');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
