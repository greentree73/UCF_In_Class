import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set in .env');
}

// If your DATABASE_URL uses SSL (for hosted DBs), you may need to adjust options.
export const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  logging: false, // set to console.log to see SQL queries
  // dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
});

export default sequelize;
