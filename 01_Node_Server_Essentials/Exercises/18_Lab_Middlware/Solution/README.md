# Middleware Lab - Solution Guide

Complete reference solution for the 8 middleware exercises.

---

## Overview

This solution implements **8 complete middleware exercises** demonstrating key concepts:

1. ✅ Request Counter Middleware
2. ✅ Timestamp Middleware  


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



