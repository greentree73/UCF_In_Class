# Express Server Setup Lab

## Learning Objectives
- Add routes to an existing Express server
- Understand Express routing syntax
- Practice creating GET endpoints
- Learn to return JSON responses

## Scenario
You've been given a partially completed Express server that's missing some important routes. The basic server structure is in place, but you need to add two GET routes to make it functional. Your task is to complete the server by adding the missing routes.

## Setup Instructions
1. Navigate to the `Starter` directory
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:3000`

## Current Situation
The server has:
- ✅ Basic Express setup
- ✅ JSON middleware configured
- ✅ Port configuration
- ❌ **Missing:** Home route (`GET /`)
- ❌ **Missing:** API status route (`GET /api/status`)

## Your Task
Add two GET routes to the existing Express server in `src/server.ts`:

### 1. **Home Route** - `GET /`
Create a route that returns:
```json
{
  "message": "Welcome to the Express Server Lab!",
  "description": "This server was completed as part of a 5-minute lab exercise",
  "timestamp": "2025-11-09T10:30:00.000Z",
  "routes": [
    "GET / - This welcome message",
    "GET /api/status - Server status information"
  ]
}
```

### 2. **API Status Route** - `GET /api/status`
Create a route that returns server status information:
```json
{
  "status": "operational",
  "server": "Express Lab Server",
  "version": "1.0.0",
  "uptime": "45 seconds",
  "environment": "development",
  "timestamp": "2025-11-09T10:30:00.000Z",
  "health": {
    "database": "not connected",
    "memory": "12 MB",
    "cpu": "normal"
  }
}
```

## Implementation Hints

### Route Structure
```typescript
app.get('/path', (req: Request, res: Response) => {
  // Your code here
  res.json({ /* your response object */ });
});
```

### Getting Current Timestamp
```typescript
new Date().toISOString()
```

### Server Uptime
```typescript
`${Math.floor(process.uptime())} seconds`
```

## Testing Your Solution
1. Visit `http://localhost:3000` - Should show the welcome message
2. Visit `http://localhost:3000/api/status` - Should show server status
3. Both routes should return properly formatted JSON
4. Server should not crash on invalid routes (404 handling is already implemented)

## Acceptance Criteria
- ✅ `GET /` returns welcome message with correct structure
- ✅ `GET /api/status` returns server status with uptime and health info
- ✅ Both routes return JSON responses
- ✅ Routes include dynamic data (timestamp, uptime)
- ✅ Server starts without errors
- ✅ All existing functionality still works



## Success 
When complete, you should see:
- Welcome message when visiting the root URL
- Server status information at `/api/status`
- No console errors
- Proper JSON formatting in responses

Good luck! 🚀