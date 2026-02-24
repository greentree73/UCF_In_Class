import dotenv from "dotenv";

// Load environment variables from .env at application startup.
dotenv.config();

// Centralized config object keeps environment access in one place.
export const config = {
  port: Number(process.env.PORT ?? 4000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/fac_project_initialization"
};
