import express from 'express';
import dotenv from 'dotenv';

// ...existing code...
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// TODO: Students should import the Sequelize instance here once implemented
// Example (after creating src/config/database.ts):
// import sequelize from './config/database';

async function start() {
  try {
    // TODO: Students should attempt to authenticate with the database here
    // Example:
    // await sequelize.authenticate();
    // console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
