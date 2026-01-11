# Express Server Setup Lab - SOLUTION

## What Was Implemented

This solution demonstrates how to add GET routes to an existing Express server. Here are the key implementations:

### 1. **Home Route** - `GET /`
**Implementation:**
```typescript
app.get('/', (_req: Request, res: Response) => {
  const welcomeMessage = {
    message: "Welcome to the Express Server Lab!",
    description: "This server was completed as part of a 5-minute lab exercise",
    timestamp: new Date().toISOString(),
    routes: [
      "GET / - This welcome message",
      "GET /api/status - Server status information"
    ]
  };

  res.json(welcomeMessage);
});
```

**Key Points:**
- Uses `app.get()` to define a GET route for the root path `/`
- Returns a JSON object with welcome information
- Includes dynamic timestamp using `new Date().toISOString()`
- Lists available routes for user reference
- Uses `res.json()` to send JSON response with proper headers

### 2. **API Status Route** - `GET /api/status`
**Implementation:**
```typescript
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
```

**Key Points:**
- Uses `process.memoryUsage()` to get real memory usage
- Uses `process.uptime()` to get actual server uptime
- Calculates memory in MB for human-readable format
- Returns comprehensive server health information
- Includes dynamic data that changes with server state

## Technical Concepts Demonstrated

### 1. **Express Route Definition**
- **Syntax**: `app.get(path, handler)`
- **Handler**: Function that receives `req` and `res` parameters
- **Response**: Using `res.json()` to send JSON data

### 2. **Dynamic Data Integration**
- **Timestamps**: Using `new Date().toISOString()` for consistent formatting
- **Server Metrics**: Accessing Node.js process information
- **Memory Calculation**: Converting bytes to megabytes for readability

### 3. **Response Structure**
- **Consistent Format**: Both routes return JSON objects
- **Meaningful Data**: Each response contains relevant information
- **Status Codes**: Implicit 200 OK for successful responses

### 4. **Route Organization**
- **Logical Grouping**: API routes under `/api/` prefix
- **Clear Purpose**: Each route has a distinct, well-defined purpose
- **RESTful Design**: Following REST conventions for endpoint naming

## Testing the Solution

### Route Testing Results:
1. **`GET /`** ✅
   - Returns welcome message
   - Includes current timestamp
   - Lists available routes

2. **`GET /api/status`** ✅
   - Shows server operational status
   - Displays real uptime and memory usage
   - Provides health check information

3. **Error Handling** ✅
   - 404 responses for undefined routes
   - Global error handler for server errors

## Learning Outcomes

Students who complete this lab will understand:
- How to add GET routes to Express applications
- The structure of Express route handlers
- How to return JSON responses from routes
- How to include dynamic data in API responses
- Basic server status and health check implementations
- The importance of meaningful API endpoint design

## Next Steps

After mastering these basics, students can explore:
- POST, PUT, DELETE routes
- Route parameters (`:id`)
- Query string handling
- Middleware creation
- Request body parsing
- Database integration
- Authentication and authorization