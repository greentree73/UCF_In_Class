import express from 'express';
import sequelize from './config/database';
import superheroRoutes from './routes/superheroes';
import teamRoutes from './routes/teams';
import './models';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/api/superheroes', superheroRoutes);
app.use('/api/teams', teamRoutes);

app.get('/', (req, res) => {
  res.json({
    message: '🦸 Superhero API - Sequelize Associations Lab (SOLUTION)',
    endpoints: {
      superheroes: {
        'GET /api/superheroes': 'Get all superheroes with powers and teams',
        'GET /api/superheroes/:id': 'Get single superhero with all relations',
        'POST /api/superheroes': 'Create a new superhero',
        'POST /api/superheroes/:id/powers': 'Add power to superhero',
        'POST /api/superheroes/:superheroId/teams/:teamId': 'Join superhero to team',
        'GET /api/superheroes/:id/powers': 'Get superhero powers only',
        'DELETE /api/superheroes/:id': 'Delete superhero (cascades to powers)'
      },
      teams: {
        'GET /api/teams': 'Get all teams with members',
        'GET /api/teams/:id': 'Get single team with members',
        'POST /api/teams': 'Create a new team'
      }
    },
    examples: {
      createSuperhero: {
        method: 'POST',
        url: '/api/superheroes',
        body: { name: 'Peter Parker', alias: 'Spider-Man', powerLevel: 85 }
      },
      addPower: {
        method: 'POST',
        url: '/api/superheroes/1/powers',
        body: { name: 'Web Slinging', description: 'Shoot webs', damage: 40 }
      },
      createTeam: {
        method: 'POST',
        url: '/api/teams',
        body: { name: 'Avengers', description: 'Earths Mightiest Heroes' }
      },
      joinTeam: {
        method: 'POST',
        url: '/api/superheroes/1/teams/1',
        body: {}
      }
    }
  });
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected');

    await sequelize.sync({ force: false});
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
