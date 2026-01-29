import express from 'express';
import sequelize from '../config/database';

const app = express();

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Try to authenticate with the DB
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Optional: sync({ alter: true }) will create tables based on models (not needed for this exercise)
    // await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}

start();
