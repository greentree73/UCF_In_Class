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
// TODO: ADD YOUR ROUTES HERE
// ============================================
// Students need to add two GET routes:
// 1. GET / - Home route with welcome message
// 2. GET /api/status - Server status information
//
// Hint: Use app.get() to create routes
// Hint: Use res.json() to send JSON responses
// Hint: Include timestamp and dynamic data in responses

// TODO: Add GET route for home page (/)
// This route should return a welcome message with:
// - message: "Welcome to the Express Server Lab!"
// - description: "This server was completed as part of a 5-minute lab exercise"
// - timestamp: current ISO string
// - routes: array of available routes

// TODO: Add GET route for API status (/api/status)
// This route should return server status with:
// - status: "operational"
// - server: "Express Lab Server"
// - version: "1.0.0"
// - uptime: server uptime in seconds
// - environment: "development"
// - timestamp: current ISO string
// - health object with database, memory, and cpu status

// ============================================
// ERROR HANDLING (Already Configured)
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
// SERVER STARTUP (Already Configured)
// ============================================

app.listen(PORT, () => {
  console.log('🎯 Express Server Lab - Starter');
  console.log(`📍 Server running on http://localhost:${PORT}`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
  console.log('\n📋 Your Task: Add two GET routes');
  console.log('   1. GET / - Home route');
  console.log('   2. GET /api/status - Server status');
  console.log('\n💡 Check the TODO comments in this file');
  console.log('⏰ You have 5 minutes - Good luck!');
});

export default app;