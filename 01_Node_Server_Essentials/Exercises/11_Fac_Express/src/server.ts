import express, { Request, Response, NextFunction } from 'express';

// Create Express application instance
const app = express();

// Define the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to log requests (custom middleware example)
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next(); // Pass control to the next middleware
});

/**
 * ROUTE 1: Home Route
 * GET /
 * Returns a welcome message with basic server information
 */
app.get('/', (_req: Request, res: Response) => {
  const welcomeMessage = {
    message: '🚀 Welcome to Express.js with TypeScript!',
    description: 'This is your first Express server running with TypeScript',
    timestamp: new Date().toISOString(),
    routes: [
      'GET / - This welcome message',
      'GET /about - Server information'
    ]
  };

  res.status(200).json(welcomeMessage);
});

/**
 * ROUTE 2: About Route
 * GET /about
 * Returns detailed information about the server and environment
 */
app.get('/about', (_req: Request, res: Response) => {
  const serverInfo = {
    serverName: 'Express TypeScript Server',
    version: '1.0.0',
    description: 'A basic Express.js server built with TypeScript for learning purposes',
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: `${Math.floor(process.uptime())} seconds`,
      memory: {
        used: `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)} MB`,
        total: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`
      }
    },
    features: [
      'TypeScript support',
      'JSON middleware',
      'Request logging',
      'RESTful routing'
    ],
    timestamp: new Date().toISOString(),
    port: PORT
  };

  res.status(200).json(serverInfo);
});

/**
 * Catch-all route for undefined endpoints
 * This should be placed after all other routes
 */
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    availableRoutes: [
      'GET /',
      'GET /about'
    ],
    timestamp: new Date().toISOString()
  });
});

/**
 * Global error handling middleware
 * This catches any errors that occur in the application
 */
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error occurred:', error.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
    timestamp: new Date().toISOString()
  });
});

/**
 * Start the server
 * The server will listen on the specified port
 */
app.listen(PORT, () => {
  console.log('🎉 Express server started successfully!');
  console.log(`📍 Server is running on http://localhost:${PORT}`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
  console.log('📋 Available routes:');
  console.log('   GET / - Welcome message');
  console.log('   GET /about - Server information');
  console.log('\n💡 Press Ctrl+C to stop the server');
});

// Export the app for testing purposes (optional)
export default app;