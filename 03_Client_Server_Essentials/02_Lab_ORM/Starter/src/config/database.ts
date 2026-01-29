// TODO: Implement Sequelize initialization here
// This file should export a Sequelize instance that other modules can import.
// Example steps students should complete:
// 1) Install runtime packages: `npm install sequelize pg pg-hstore`
// 2) Import Sequelize: `import { Sequelize } from 'sequelize';`
// 3) Read DATABASE_URL from process.env and construct a Sequelize instance
// 4) Export the instance as default

// Example (commented):

import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set in .env");
}

// If your DATABASE_URL uses SSL (for hosted DBs), you may need to adjust options.
export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false, // set to console.log to see SQL queries
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

export default sequelize;
