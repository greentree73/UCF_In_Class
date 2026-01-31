import express from 'express';
import sequelize from './config/database';
import characterRoutes from './routes/characters';
import guildRoutes from './routes/guilds';
import './models'; // Import models to ensure associations are loaded

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/characters', characterRoutes);
app.use('/api/guilds', guildRoutes);

// Welcome route with API documentation
app.get('/', (req, res) => {
  res.json({
    message: '🎮 Fantasy Game API - Sequelize Associations Demo',
    endpoints: {
      characters: {
        'GET /api/characters': 'Get all characters with weapons and guilds',
        'GET /api/characters/:id': 'Get single character with all relations',
        'POST /api/characters': 'Create a new character',
        'POST /api/characters/:id/weapons': 'Add weapon to character',
        'POST /api/characters/:characterId/guilds/:guildId': 'Join character to guild',
        'GET /api/characters/:id/weapons': 'Get character weapons only',
        'DELETE /api/characters/:id': 'Delete character (cascades to weapons)'
      },
      guilds: {
        'GET /api/guilds': 'Get all guilds with members',
        'GET /api/guilds/:id': 'Get single guild with members',
        'POST /api/guilds': 'Create a new guild'
      }
    },
    examples: {
      createCharacter: {
        method: 'POST',
        url: '/api/characters',
        body: {
          name: 'Arya Stark',
          class: 'Rogue',
          level: 15,
          health: 120
        }
      },
      addWeapon: {
        method: 'POST',
        url: '/api/characters/1/weapons',
        body: {
          name: 'Needle',
          type: 'Sword',
          damage: 45
        }
      },
      createGuild: {
        method: 'POST',
        url: '/api/guilds',
        body: {
          name: 'Night\'s Watch',
          description: 'Defenders of the Wall'
        }
      },
      joinGuild: {
        method: 'POST',
        url: '/api/characters/1/guilds/1',
        body: {}
      }
    }
  });
});

// Start server
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('✅ Database connected');

    // Sync models (create tables)
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ Database synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 API Documentation: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Unable to start server:', error);
    process.exit(1);
  }
};

startServer();
