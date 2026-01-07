import express, { Request, Response, NextFunction } from 'express';

// Create Express application instance
const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// ============================================================================
// EXERCISE 1: REQUEST COUNTER MIDDLEWARE
// ============================================================================

let requestCount = 0;

app.use((req: Request, res: Response, next: NextFunction) => {
  // Increment counter with each request
  requestCount++;
  
  // Attach current request number to request object
  (req as any).requestNumber = requestCount;
  
  console.log(`Request #${requestCount}: ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// EXERCISE 2: TIMESTAMP MIDDLEWARE
// ============================================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  // Capture start time
  const startTime = new Date();
  (req as any).startTime = startTime;
  
  // Listen for when response finishes
  res.on('finish', () => {
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();
    (req as any).endTime = endTime;
    (req as any).duration = duration;
    
    console.log(`[${startTime.toISOString()}] Response completed in ${duration}ms`);
  });
  
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

/**
 * EXERCISE 1: Get request count
 */
app.get('/count', (req: Request, res: Response) => {
  res.json({
    requestNumber: (req as any).requestNumber,
    totalRequests: requestCount
  });
});

/**
 * EXERCISE 2: Get timing information
 */
app.get('/timing', (req: Request, res: Response) => {
  res.json({
    startTime: (req as any).startTime?.toISOString(),
    endTime: (req as any).endTime?.toISOString(),
    duration: `${(req as any).duration}ms`
  });
});


/**
 * Home route
 */
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🎉 Middleware Lab - Solution Complete!',
    version: '1.0.0',
    availableRoutes: [
      'GET / - This message',
      'GET /count - Request counter (Exercise 1)',
      'GET /timing - Timing information (Exercise 2)',
    ],
  });
});

/**
 * 404 Not Found handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.path} does not exist`,
    availableRoutes: [
      'GET /',
      'GET /count',
      'GET /timing',
      'GET /public',
      'GET /secure',
      'GET /users',
      'POST /users'
    ]
  });
});

/**
 * Global error handler
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[ERROR]', err);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'Something went wrong',
    requestNumber: (req as any).requestNumber
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log(`✅ Middleware Lab Solution running on http://localhost:${PORT}`);
});
