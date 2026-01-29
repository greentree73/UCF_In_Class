import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

// Load environment variables from .env file
dotenv.config()

/**
 * Database Configuration
 * 
 * Sets up the Sequelize instance that will manage our database connection.
 * Uses PostgreSQL with the adventure database.
 */
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/adventure'

export const sequelize = new Sequelize(databaseUrl, {
  logging: false, // Set to console.log to see SQL queries
  host: 'localhost',
  dialect: 'postgres',
  dialectOptions: {
    decibimalNumbers: true,
  },
})

export default sequelize
