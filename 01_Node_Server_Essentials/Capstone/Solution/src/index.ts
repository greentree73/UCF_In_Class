import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import recipeRoutes from './routes/recipes';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'Recipe Finder API is running',
    timestamp: new Date().toISOString(),
    environment: nodeEnv,
  });
});

// API routes
app.use('/recipes', recipeRoutes);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Recipe Finder API',
    version: '1.0.0',
    description: 'A RESTful API for searching recipes using Spoonacular',
    endpoints: {
      health: 'GET /health',
      searchRecipes: 'GET /recipes/search?query=chicken&number=10',
      getRecipeDetails: 'GET /recipes/:id',
      getRandomRecipe: 'GET /recipes/random?tags=vegetarian',
      searchIngredients: 'GET /recipes/ingredients?query=apple&number=10',
    },
    documentation: 'See README.md for detailed documentation',
  });
});

// 404 Not Found handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `The requested endpoint ${req.method} ${req.path} does not exist`,
    statusCode: 404,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: nodeEnv === 'development' ? err.message : 'An unexpected error occurred',
    statusCode: 500,
  });
});

// Start server
app.listen(port, () => {
  console.log(`
╔════════════════════════════════════════╗
║   Recipe Finder API is running!        ║
║   Environment: ${nodeEnv.padEnd(27)} ║
║   Port: ${String(port).padEnd(31)} ║
║   URL: http://localhost:${String(port).padEnd(20)} ║
╚════════════════════════════════════════╝
  `);
  console.log('Endpoints available:');
  console.log(`  - GET http://localhost:${port}/`);
  console.log(`  - GET http://localhost:${port}/health`);
  console.log(`  - GET http://localhost:${port}/recipes/search?query=chicken`);
  console.log(`  - GET http://localhost:${port}/recipes/random`);
  console.log(`  - GET http://localhost:${port}/recipes/715538`);
  console.log(`  - GET http://localhost:${port}/recipes/ingredients?query=apple`);
});

export default app;
