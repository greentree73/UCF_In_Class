# Middleware Practice Exercises

Complete these exercises to deepen your understanding of Express middleware.

## Exercise 1: Request Counter Middleware

**Objective**: Create middleware that counts the total number of requests to the server.

**Instructions**:
1. Create a global middleware that increments a counter on each request
2. Display the request count in responses
3. Hint: Use a variable outside middleware scope

**Expected Output**:
```json
{
  "requestNumber": 1,
  "totalRequests": 1
}
```

**Starting Code**:
```typescript
let requestCount = 0;

app.use((req, res, next) => {
  // TODO: Increment counter
  // TODO: Attach to request object
  next();
});

app.get('/count', (req, res) => {
  res.json({
    requestNumber: (req as any).requestNumber,
    totalRequests: requestCount
  });
});
```

---

## Exercise 2: Timestamp Middleware

**Objective**: Create middleware that adds precise timestamps to all requests.

**Instructions**:
1. Add middleware that captures request start time
2. Calculate response duration
3. Attach start and end time to the response JSON

**Expected Output**:
```json
{
  "startTime": "2024-01-15T10:30:45.123Z",
  "endTime": "2024-01-15T10:30:45.234Z",
  "duration": "111ms"
}
```

**Starting Code**:
```typescript
app.use((req, res, next) => {
  const startTime = new Date();
  (req as any).startTime = startTime;
  
  res.on('finish', () => {
    // TODO: Calculate duration
    // TODO: Log timing info
  });
  
  next();
});
```


To check your work, compare with the provided solutions or ask an instructor for help.

**Happy Learning!** 🚀

These exercises will help you master Express middleware concepts. Work through them in order and feel free to experiment!
