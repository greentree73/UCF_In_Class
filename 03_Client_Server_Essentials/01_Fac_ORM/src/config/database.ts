// Import Sequelize - the ORM tool that lets us work with databases using JavaScript
import { Sequelize } from 'sequelize'
// Import dotenv - loads environment variables from a .env file
import dotenv from 'dotenv'

// Load environment variables from .env file into process.env
// This lets us store sensitive info like database passwords outside our code
dotenv.config()

// Get the database connection string from environment variables
// If DATABASE_URL doesn't exist, use the default connection string as a fallback
// Connection string format: postgres://username:password@host:port/database_name
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:root@localhost:5432/adventure'

// Create a new Sequelize instance - this is our connection to the database
export const sequelize = new Sequelize(databaseUrl, {
  logging: true,              // Don't print SQL queries to the console (set to true to see them)
  host: 'localhost',           // The server where our database is running
  dialect: 'postgres',         // The type of database we're using (PostgreSQL)
  dialectOptions: {            // Database-specific options
    decibimalNumbers: true,    // Handle decimal numbers properly in PostgreSQL
  },  
})

// Export as default so it can be imported either way:
// import sequelize from './database' OR import { sequelize } from './database'
export default sequelize
