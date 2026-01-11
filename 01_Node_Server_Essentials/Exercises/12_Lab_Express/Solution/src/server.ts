import express, { Request, Response, NextFunction } from 'express';

// Create Express application instance
const app = express();

// Define the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE SETUP (Already Configured)
// ============================================

// Middleware to parse JSON bodies
app.use(express.json());

// Request logging middleware
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROUTES 
// ============================================

/**
 * ROUTE 1: Home Route - GET /
 * Returns a welcome message with basic information
 */
app.get('/user/1', (_req: Request, res: Response) => {
  const user = {"name":"Joe"}

  res.json(user);
});

app.get('/user/2', (_req: Request, res: Response) => {
  const user = {"name":"Caleb"}

  res.json(user);
});

/**
 * ROUTE 2: API Status Route - GET /api/status
 * Returns detailed server status and health information
 */
app.get('/api/status', (_req: Request, res: Response) => {
  const memoryUsage = process.memoryUsage();
  const uptimeSeconds = Math.floor(process.uptime());
  
  const statusInfo = {
    status: "operational",
    server: "Express Lab Server",
    version: "1.0.0",
    uptime: `${uptimeSeconds} seconds`,
    environment: "development",
    timestamp: new Date().toISOString(),
    health: {
      database: "not connected",
      memory: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
      cpu: "normal"
    }
  };

  res.json(statusInfo);
});

// ============================================
// ERROR HANDLING
// ============================================

// 404 handler for undefined routes
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: `The endpoint ${req.method} ${req.originalUrl} does not exist`,
    suggestion: 'Try visiting / or /api/status',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Server Error:', error.message);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
    timestamp: new Date().toISOString()
  });
});

// ============================================
// SERVER STARTUP 
// ============================================

app.listen(PORT, () => {
  console.log('� Express Server Lab - SOLUTION');
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
  console.log('\n✅ Completed routes:');
  console.log('   GET / - Home route with welcome message');
  console.log('   GET /api/status - Server status information');
  console.log('\n🌐 Test the routes in your browser!');
});

export default app;