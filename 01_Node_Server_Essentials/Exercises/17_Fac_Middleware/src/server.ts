import express, { Request, Response, NextFunction } from 'express';

// Create Express application instance
const app = express();

// Define the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 3000;

// ============================================================================
// SECTION 1: BUILT-IN MIDDLEWARE
// ============================================================================

/**
 * express.json() - Built-in middleware that parses incoming request bodies
 * with JSON payloads. It reads the request stream and deserializes JSON.
 */
app.use(express.json());

/**
 * express.text() - Built-in middleware that parses text content
 */
app.use(express.text());

/**
 * express.urlencoded() - Built-in middleware that parses URL-encoded
 * form data (e.g., from HTML forms)
 */
app.use(express.urlencoded({ extended: true }));

// ============================================================================
// SECTION 2: CUSTOM GLOBAL MIDDLEWARE
// ============================================================================

/**
 * CUSTOM MIDDLEWARE 1: Request Logger
 * 
 * This middleware executes for EVERY request to log:
 * - Request method (GET, POST, etc.)
 * - Request path/URL
 * - Timestamp of the request
 * 
 * Key Concepts:
 * - Runs for every request in order
 * - Must call next() to pass control to next middleware
 * - Perfect for logging, monitoring, authentication checks
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] ${req.method} ${req.path}`);
  
  // Move to next middleware/route handler
  next();
});

/**
 * CUSTOM MIDDLEWARE 2: Request ID Generator
 * 
 * This middleware adds a unique ID to each request for tracking purposes.
 * We're adding a custom property to the request object.
 * 
 * Key Concepts:
 * - Attach data to req object that other middlewares/routes can access
 * - Useful for correlation IDs, tracking requests through logs
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  // Generate a unique request ID (in production, use uuid library)
  const requestId = `req-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Attach to request object (TypeScript might complain - that's OK for learning)
  (req as any).requestId = requestId;
  
  console.log(`Request ID: ${requestId}`);
  next();
});

/**
 * CUSTOM MIDDLEWARE 3: Authentication Check
 * 
 * This middleware checks if a request has proper authorization.
 * It can either:
 * - Allow the request to continue (call next())
 * - Block the request and send a response (don't call next())
 * 
 * Key Concepts:
 * - Middleware can validate and reject requests
 * - Not all middleware needs to call next() 
 * - Perfect for auth, validation, security checks
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  // Check for authorization header (simplified example)
  const authHeader = req.get('Authorization');
  
  if (authHeader) {
    console.log(`Authorization header present: ${authHeader}`);
  } else {
    console.log('No Authorization header provided');
  }
  
  // In real apps, you might block here:
  // if (!authHeader) {
  //   return res.status(401).json({ error: 'Unauthorized' });
  // }
  
  next();
});

/**
 * CUSTOM MIDDLEWARE 4: Performance Monitor
 * 
 * This middleware tracks how long each request takes to complete.
 * It uses res.on('finish') to know when the response is sent.
 * 
 * Key Concepts:
 * - Middleware can attach listeners to response events
 * - Useful for performance monitoring, metrics collection
 * - The 'finish' event fires after response is sent
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Attach listener for when response is finished
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`Response time: ${duration}ms`);
  });
  
  next();
});

// ============================================================================
// SECTION 3: ROUTE-SPECIFIC MIDDLEWARE
// ============================================================================

/**
 * Route-specific middleware can be applied to individual routes
 * or groups of routes. This middleware only runs for requests to /admin
 */
const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log('[ADMIN MIDDLEWARE] Checking admin access...');
  
  // Simple admin check (in real apps, check JWT token, session, etc.)
  const adminKey = req.get('X-Admin-Key');
  
  if (adminKey === 'secret-admin-key-123') {
    console.log('[ADMIN MIDDLEWARE] Admin access granted');
    next();
  } else {
    res.status(403).json({ error: 'Admin access denied' });
  }
};

// ============================================================================
// SECTION 4: ROUTES
// ============================================================================

/**
 * ROUTE 1: Home
 * GET /
 * 
 * This route demonstrates:
 * - Basic route handler
 * - Accessing custom properties attached by middleware
 * - Returning JSON response
 */
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: '🚀 Welcome to Express Middleware Demo!',
    requestId: (req as any).requestId,
    timestamp: new Date().toISOString(),
    description: 'This server demonstrates various middleware concepts',
    availableRoutes: [
      'GET / - This message',
      'GET /about - Server information',
      'POST /echo - Echo back request body',
      'GET /data - Get sample data',
      'GET /admin - Protected admin route (requires X-Admin-Key header)',
      'GET /profile/:username - Dynamic route parameter example'
    ]
  });
});

/**
 * ROUTE 2: About
 * GET /about
 * 
 * Simple route that returns server information
 */
app.get('/about', (req: Request, res: Response) => {
  res.status(200).json({
    serverName: 'Express Middleware Example',
    version: '1.0.0',
    description: 'A learning application demonstrating Express middleware concepts',
    requestId: (req as any).requestId,
    environment: {
      nodeVersion: process.version,
      platform: process.platform
    }
  });
});

/**
 * ROUTE 3: Echo POST Data
 * POST /echo
 * 
 * This route demonstrates:
 * - Accepting POST requests with request body
 * - Accessing parsed JSON body (via express.json() middleware)
 * - Echoing data back to client
 */
app.post('/echo', (req: Request, res: Response) => {
  console.log('Received POST request with body:', req.body);
  
  res.status(200).json({
    message: 'Echo response',
    requestId: (req as any).requestId,
    receivedData: req.body,
    echo: 'You sent this data above ☝️'
  });
});

/**
 * ROUTE 4: Get Sample Data
 * GET /data
 * 
 * Returns sample data (simulating a database query)
 */
app.get('/data', (req: Request, res: Response) => {
  const sampleData = [
    { id: 1, name: 'Alice', role: 'Developer' },
    { id: 2, name: 'Bob', role: 'Designer' },
    { id: 3, name: 'Charlie', role: 'Manager' }
  ];
  
  res.status(200).json({
    requestId: (req as any).requestId,
    count: sampleData.length,
    data: sampleData
  });
});

/**
 * ROUTE 5: Protected Admin Route
 * GET /admin
 * 
 * This route uses route-specific middleware (adminMiddleware)
 * The middleware must pass before this route handler executes
 * 
 * To test: Add header X-Admin-Key: secret-admin-key-123
 */
app.get('/admin', adminMiddleware, (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Welcome to Admin Panel',
    requestId: (req as any).requestId,
    adminData: {
      totalRequests: 'N/A',
      systemStatus: 'Running',
      lastUpdated: new Date().toISOString()
    }
  });
});

/**
 * ROUTE 6: Dynamic Route Parameter
 * GET /profile/:username
 * 
 * This route demonstrates:
 * - Path parameters (captured from URL)
 * - Query parameters (passed as ?key=value)
 * - Accessing both req.params and req.query
 */
app.get('/profile/:username', (req: Request, res: Response) => {
  const { username } = req.params;
  const { includeEmail } = req.query;
  
  res.status(200).json({
    requestId: (req as any).requestId,
    profile: {
      username,
      email: includeEmail === 'true' ? `${username}@example.com` : 'Not included',
      joinDate: '2024-01-01',
      lastActive: new Date().toISOString()
    }
  });
});

// ============================================================================
// SECTION 5: ERROR HANDLING MIDDLEWARE
// ============================================================================

/**
 * 404 Not Found Handler
 * 
 * This middleware catches all requests that don't match any route above.
 * Must be defined AFTER all other routes.
 * 
 * Key Concepts:
 * - Middleware order matters - this must be last
 * - Catches unmatched routes
 * - Useful for 404 responses
 */
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested endpoint does not exist',
    suggestion: 'Try GET / for available routes'
  });
});

/**
 * Global Error Handler
 * 
 * This middleware handles errors that occur in route handlers.
 * Express recognizes this as an error handler due to 4 parameters.
 * 
 * Key Concepts:
 * - 4 parameters: (err, req, res, next) - Express recognizes this pattern
 * - Catches errors passed via next(error) in route handlers
 * - Must be defined AFTER all other middleware/routes
 * - In a route: if (error) { next(error); }
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error occurred:', err);
  
  res.status(500).json({
    error: 'Internal Server Error',
    requestId: (req as any).requestId,
    message: err.message || 'Something went wrong',
    // In production, don't expose stack traces!
    // stack: err.stack
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(70));
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('='.repeat(70));
  console.log('\n📝 TIP: Try these requests with Postman or curl:');
  console.log(`   1. GET http://localhost:${PORT}/`);
  console.log(`   2. POST http://localhost:${PORT}/echo`);
  console.log(`   3. GET http://localhost:${PORT}/admin -H "X-Admin-Key: secret-admin-key-123"`);
  console.log(`   4. GET http://localhost:${PORT}/profile/john?includeEmail=true`);
  console.log('='.repeat(70) + '\n');
});
