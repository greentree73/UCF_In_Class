import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
let connected = false;
// Test database connection on startup
pool.on("connect", () => {
  if (!connected) {
    console.log("🔌 Connected to PostgreSQL database");
    connected = true;
  }
});

export default {
  query: (text, params) => pool.query(text, params),
  pool,
};
