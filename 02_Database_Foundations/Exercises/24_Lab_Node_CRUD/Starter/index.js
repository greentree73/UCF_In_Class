// Load environment variables from .env file
require('dotenv').config();

// Import the Pool class from pg package
const { Pool } = require('pg');

// Create a connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ============================================
// TODO: Complete this function
// ============================================
// This function should retrieve users and their orders using a JOIN query
// 
// Instructions:
// 1. Write a SQL query that joins the users and orders tables
// 2. Use INNER JOIN to match users with their orders
// 3. Select these columns:
//    - users.name AS user_name
//    - users.email AS user_email
//    - orders.product_name
//    - orders.amount
//    - orders.order_date
// 4. Order the results by user_name and order_date
//
// SQL JOIN Syntax:
// SELECT columns FROM table1
// INNER JOIN table2 ON table1.id = table2.foreign_key
// ORDER BY column;
//
// Learn more about JOINs:
// https://www.postgresql.org/docs/current/tutorial-join.html
async function getUsersWithOrders() {
  // TODO: Write your JOIN query here
  const query = `
    -- Your SQL JOIN query goes here
  `;
  
  try {
    console.log('🔍 Fetching users with their orders...\n');
    
    const result = await pool.query(query);
    
    console.log('✅ Results:');
    console.table(result.rows);
    console.log(`\n📊 Total orders found: ${result.rows.length}`);
    
    return result.rows;
  } catch (error) {
    console.error('❌ Error executing query:', error.message);
    throw error;
  }
}

// Main function to run the query
async function main() {
  try {
    await getUsersWithOrders();
  } catch (error) {
    console.error('Application error:', error);
  } finally {
    // Close the database connection pool
    await pool.end();
    console.log('\n🔌 Database connection closed');
  }
}

// Execute the main function
main();
