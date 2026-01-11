import express, { Request, Response, NextFunction } from "express";

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
  requestCount++;
  (req as any).requestNumber = requestCount;
  console.log(`Request #${requestCount}: ${req.method} ${req.path}`);
  next();
});

app.get("/count", (req: Request, res: Response)=>{
 
  res.json({
    requestNumber: (req as any).requestNumber,
    totalRequests: requestCount
  });
});

// ============================================================================
// EXERCISE 2: TIMESTAMP MIDDLEWARE
// ============================================================================

app.use((req: Request, res: Response, next: NextFunction) => {
  // Capture start time
  const time = new Date();
  (req as any).time = time;

  // Listen for when response finishes
  res.on("finish", () => {
    console.log(`[${time.toISOString()}]`);
  });

  next();
});

// ============================================================================
// ROUTES
// ============================================================================

/**
 * Home route
 */
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "🎉 Middleware Lab - Solution Complete!",
    version: "1.0.0",
    availableRoutes: ["GET / - This message"],
  });
});

/**
 * 404 Not Found handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} does not exist`,
    availableRoutes: ["GET /"],
  });
});

/**
 * Global error handler
 */
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("[ERROR]", err);

  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
    requestNumber: (req as any).requestNumber,
  });
});

// ============================================================================
// SERVER STARTUP
// ============================================================================

app.listen(PORT, () => {
  console.log("\n" + "=".repeat(70));
  console.log(`✅ Middleware Lab Solution running on http://localhost:${PORT}`);
});
