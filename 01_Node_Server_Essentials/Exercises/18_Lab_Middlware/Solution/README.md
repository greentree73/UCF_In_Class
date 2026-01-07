# Middleware Lab - Solution Guide

Complete reference solution for the 8 middleware exercises.

---

## Overview

This solution implements **8 complete middleware exercises** demonstrating key concepts:

1. ✅ Request Counter Middleware
2. ✅ Timestamp Middleware  
3. ✅ Rate Limiting Middleware
4. ✅ Conditional Auth Middleware
5. ✅ Request Body Validation Middleware
6. ✅ Custom Response Format Middleware
7. ✅ Security Headers Middleware
8. ✅ Comprehensive Logging Middleware

---

## Getting Started

### Installation
```bash
npm install
```

### Running the Server
```bash
npm run dev
```

The server will run on `http://localhost:3000`

---

## Exercise Explanations

### **Exercise 1: Request Counter Middleware** 🔢

**Goal**: Track total requests and individual request numbers

**Solution**:
```typescript
let requestCount = 0;

app.use((req: Request, res: Response, next: NextFunction) => {
  // Increment counter with each request
  requestCount++;
  
  // Attach current request number to request object
  (req as any).requestNumber = requestCount;
  
  console.log(`Request #${requestCount}: ${req.method} ${req.path}`);
  next();
});
```

**How It Works**:
- Uses a variable outside middleware scope to persist count
- Increments counter on each request
- Attaches current count to request object
- All routes can access via `(req as any).requestNumber`

**Testing**:
```bash
curl http://localhost:3000/count
# Output: { "requestNumber": 1, "totalRequests": 1 }

curl http://localhost:3000/count
# Output: { "requestNumber": 2, "totalRequests": 2 }
```

---

### **Exercise 2: Timestamp Middleware** ⏱️

**Goal**: Capture request/response times and calculate duration

**Solution**:
```typescript
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
    
    console.log(`Response completed in ${duration}ms`);
  });
  
  next();
});
```

**Key Concepts**:
- Captures start time at request arrival
- Uses `res.on('finish')` to know when response is sent
- Calculates duration in milliseconds
- Attaches both times and duration to request

**Testing**:
```bash
curl http://localhost:3000/timing
# Output:
# {
#   "startTime": "2024-01-15T10:30:45.123Z",
#   "endTime": "2024-01-15T10:30:45.234Z",
#   "duration": "45ms"
# }
```

---

### **Exercise 3: Rate Limiting Middleware** 🚦

**Goal**: Limit requests per IP address per time window

**Solution**:
```typescript
interface RequestLog {
  timestamps: number[];
}

const requestLogs: { [key: string]: RequestLog } = {};
const MAX_REQUESTS = 10;
const WINDOW_MS = 60000; // 1 minute

app.use((req: Request, res: Response, next: NextFunction) => {
  const ip = req.ip;
  const now = Date.now();
  
  // Initialize IP log if needed
  if (!requestLogs[ip]) {
    requestLogs[ip] = { timestamps: [] };
  }
  
  const log = requestLogs[ip];
  
  // Remove timestamps older than the window
  log.timestamps = log.timestamps.filter(timestamp => now - timestamp < WINDOW_MS);
  
  // Check if limit exceeded
  if (log.timestamps.length >= MAX_REQUESTS) {
    const oldestRequest = log.timestamps[0];
    const retryAfterMs = WINDOW_MS - (now - oldestRequest);
    const retryAfterSeconds = Math.ceil(retryAfterMs / 1000);
    
    return res.status(429).json({
      error: 'Too many requests',
      message: `Max ${MAX_REQUESTS} requests per minute`,
      retryAfter: retryAfterSeconds
    });
  }
  
  // Add current request timestamp
  log.timestamps.push(now);
  next();
});
```

**Key Concepts**:
- Track requests by IP address
- Use time window to clean old requests
- Block with 429 status when limit exceeded
- Provide `retryAfter` hint to client

**Testing**:
```bash
# Run this multiple times (should work for first 10)
for i in {1..15}; do curl http://localhost:3000/public; done
# After 10 requests: { "error": "Too many requests", "retryAfter": 45 }
```

---

### **Exercise 4: Conditional Auth Middleware** 🔐

**Goal**: Protect routes by checking for valid API key

**Solution**:
```typescript
const validateApiKey = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.get('X-API-Key');
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  const validKeys = ['secret-key-123', 'another-valid-key', 'admin-key-456'];
  
  if (!validKeys.includes(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  (req as any).authenticated = true;
  next();
};

// Use it on specific routes
app.get('/secure', validateApiKey, (req: Request, res: Response) => {
  res.json({ message: 'Secure content' });
});
```

**Key Concepts**:
- Route-specific middleware (not global)
- Checks Authorization header
- Returns 401 if missing/invalid
- Can attach auth data to request

**Testing**:
```bash
# Without key - should fail
curl http://localhost:3000/secure
# { "error": "API key required" }

# With invalid key - should fail
curl http://localhost:3000/secure -H "X-API-Key: invalid"
# { "error": "Invalid API key" }

# With valid key - should work
curl http://localhost:3000/secure -H "X-API-Key: secret-key-123"
# { "message": "This is secure content" }
```

---

### **Exercise 5: Request Body Validation Middleware** ✅

**Goal**: Validate POST request body before route handler

**Solution**:
```typescript
const validateUserBody = (req: Request, res: Response, next: NextFunction) => {
  const { name, email, age } = req.body;
  const errors: string[] = [];
  
  // Validate name
  if (!name) {
    errors.push('name is required');
  } else if (typeof name !== 'string') {
    errors.push('name must be a string');
  }
  
  // Validate email
  if (!email) {
    errors.push('email is required');
  } else if (!email.includes('@')) {
    errors.push('email must be valid');
  }
  
  // Validate age (optional but if provided, validate)
  if (age !== undefined && (typeof age !== 'number' || age < 0 || age > 150)) {
    errors.push('age must be a number between 0-150');
  }
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }
  
  next();
};

// Use it
app.post('/users', validateUserBody, (req: Request, res: Response) => {
  // Body is guaranteed valid here
  res.status(201).json({ success: true, user: req.body });
});
```

**Key Concepts**:
- Validates before route handler executes
- Checks required vs optional fields
- Validates data types
- Returns 400 with error details if invalid
- Prevents route handler from processing bad data

**Testing**:
```bash
# Invalid - missing email
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
# { "error": "Validation failed", "details": ["email is required"] }

# Valid
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":30}'
# { "message": "User created successfully", "user": {...} }
```

---

### **Exercise 6: Custom Response Format Middleware** 🎁

**Goal**: Wrap all responses in standardized format

**Solution**:
```typescript
app.use((req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res);
  
  // Override the json method
  res.json = function(data: any) {
    const response = {
      success: res.statusCode >= 200 && res.statusCode < 300,
      status: res.statusCode,
      timestamp: new Date().toISOString(),
      data: data
    };
    
    return originalJson(response);
  };
  
  next();
});
```

**Key Concepts**:
- Override `res.json()` method
- Wraps all JSON responses with metadata
- Automatically determines success based on status code
- Adds timestamp to every response
- Transparent to route handlers

**Result**:
```json
{
  "success": true,
  "status": 200,
  "timestamp": "2024-01-15T10:30:45.123Z",
  "data": { "message": "User created" }
}
```

---

### **Exercise 7: Security Headers Middleware** 🛡️

**Goal**: Add security headers to all responses

**Solution**:
```typescript
app.use((req: Request, res: Response, next: NextFunction) => {
  // Add security headers
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  
  console.log('[SECURITY] Security headers added');
  next();
});
```

**Headers Explained**:
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Enable XSS protection in browsers
- **Strict-Transport-Security**: Force HTTPS

**Testing**:
```bash
curl -i http://localhost:3000/
# See these headers in response:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# X-XSS-Protection: 1; mode=block
# Strict-Transport-Security: max-age=31536000; includeSubDomains
```

---

### **Exercise 8: Comprehensive Logging Middleware** 📋

**Goal**: Log complete request/response cycle

**Solution**:
```typescript
app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toLocaleString();
  const startTime = Date.now();
  
  console.log(`\n${'='.repeat(70)}`);
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  console.log(`Headers: ${JSON.stringify(req.headers)}`);
  
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    console.log(`Body: ${JSON.stringify(req.body)}`);
  }
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`Status: ${res.statusCode}`);
    console.log(`Duration: ${duration}ms`);
    console.log(`${'='.repeat(70)}`);
  });
  
  next();
});
```

**Logs**:
- Request timestamp
- HTTP method and path
- Request headers
- Request body (for POST/PUT)
- Response status code
- Response duration

**Output Example**:
```
======================================================================
[Jan 15, 2024 10:30:45] POST /users
Headers: {"content-type":"application/json"}
Body: {"name":"John","email":"john@example.com"}
Status: 201
Duration: 12ms
======================================================================
```

---

## All Routes

### Public Routes
```bash
GET /              # Home - lists all routes
GET /count         # Show request counter
GET /timing        # Show timing info
GET /public        # Test rate limiting
GET /users         # Get user list
```

### Protected Routes
```bash
GET /secure        # Requires X-API-Key header
POST /users        # Create user - requires valid body
```

---

## Complete Testing Script

```bash
#!/bin/bash

echo "=== Exercise 1: Request Counter ==="
curl http://localhost:3000/count
echo -e "\n"

echo "=== Exercise 2: Timing ==="
curl http://localhost:3000/timing
echo -e "\n"

echo "=== Exercise 3: Rate Limiting (first request) ==="
curl http://localhost:3000/public
echo -e "\n"

echo "=== Exercise 4: Auth (without key) ==="
curl http://localhost:3000/secure
echo -e "\n"

echo "=== Exercise 4: Auth (with key) ==="
curl http://localhost:3000/secure -H "X-API-Key: secret-key-123"
echo -e "\n"

echo "=== Exercise 5: Validation (invalid) ==="
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John"}'
echo -e "\n"

echo "=== Exercise 5: Validation (valid) ==="
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","age":30}'
echo -e "\n"

echo "=== Exercise 6-8: Response format, Security headers, Logging ==="
curl http://localhost:3000/users
echo -e "\n"
```

---

## Key Learning Points

### Exercise 1
- Variables outside middleware persist across requests
- Attach data to request object with `(req as any).propertyName`
- Counter increments for each request

### Exercise 2
- Use `res.on('finish')` to detect response completion
- Calculate durations in milliseconds
- Attach multiple pieces of data to request

### Exercise 3
- Track state per IP address
- Implement sliding window algorithm
- Return 429 status for rate limit
- Clean up old data to prevent memory leaks

### Exercise 4
- Route-specific middleware runs before handler
- Extract values from request headers
- Return 401 for auth failures
- Don't call `next()` if rejecting

### Exercise 5
- Validation middleware prevents bad data reaching handler
- Collect all errors, don't fail on first
- Type checking is essential
- Optional fields need special handling

### Exercise 6
- Override response methods with `.bind()`
- Preserve original functionality
- Metadata added transparently
- All routes benefit without modification

### Exercise 7
- Set headers with `res.set()`
- Security headers are crucial
- These run globally for every response
- Research what each header does

### Exercise 8
- Log full request/response cycle
- Use `res.on('finish')` for post-response logging
- Timestamp everything
- Track request duration

---

## Running and Debugging

### View Logs
The server logs middleware execution to console:
```
=======================================================
[Jan 15, 2024] POST /users
Request ID: req-1234567890-abc123
Authorization header present: false
Response time: 12ms
=======================================================
```

### Debug a Specific Route
```bash
npm run dev
# Server prints every middleware execution
# Watch console as you make requests
```

### Check Request Count
```bash
curl http://localhost:3000/count
# Shows both requestNumber and totalRequests
```

---

## Next Steps

After understanding these exercises:
1. Combine multiple middleware on one route
2. Create custom middleware for your app needs
3. Implement more sophisticated validation
4. Add database calls with error handling
5. Create middleware composition utilities

---

## Resources

- [Express Middleware Guide](https://expressjs.com/en/guide/using-middleware.html)
- [HTTP Status Codes](https://httpwg.org/specs/rfc7231.html#status.codes)
- [Security Headers](https://securityheaders.com/)

---

**Solution Status**: ✅ Complete  
**All Exercises**: ✅ Implemented  
**Ready to Run**: ✅ Yes  
**Created**: January 2026
