import express from 'express';
import sequelize from "./config/database";
import dotenv from 'dotenv';

// ...existing code...
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// TODO: Import the Sequelize instance here once implemented
// Example (after creating src/config/database.ts):
//import sequelize from './config/database';

async function start() {
  try {
    // Try to authenticate with the DB
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Optional: sync({ alter: true }) will create tables based on models (not needed for this exercise)
    // await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    process.exit(1);
  }
}

start();
