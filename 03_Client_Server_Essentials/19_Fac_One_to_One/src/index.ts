import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/api/index.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'Server is running!' });
});

// Sync database and start server
const startServer = async () => {
  try {
    // Sync database (creates tables if they don't exist)
    // Set force: true to drop and recreate tables (use with caution!)
    await sequelize.sync({ force: false });
    console.log('✅ Database synced successfully');
    console.log('📚 Tables created: authors, books');
    console.log('🔗 Association established: Author hasOne Book');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📊 API endpoints:`);
      console.log(`   - GET    http://localhost:${PORT}/api/authors`);
      console.log(`   - GET    http://localhost:${PORT}/api/authors/:id`);
      console.log(`   - POST   http://localhost:${PORT}/api/authors`);
      console.log(`   - DELETE http://localhost:${PORT}/api/authors/:id`);
      console.log(`   - GET    http://localhost:${PORT}/api/books`);
      console.log(`   - GET    http://localhost:${PORT}/api/books/:id`);
      console.log(`   - POST   http://localhost:${PORT}/api/books`);
      console.log(`   - DELETE http://localhost:${PORT}/api/books/:id`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
