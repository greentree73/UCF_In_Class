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
// Function to retrieve users with their orders
// ============================================
// This function demonstrates an INNER JOIN query
// An INNER JOIN returns only rows where there's a match in both tables
// 
// Query Breakdown:
// 1. SELECT - Choose specific columns from both tables
// 2. AS - Create aliases for clearer column names in results
// 3. FROM users - Start with the users table
// 4. INNER JOIN orders - Join with orders table
// 5. ON - Specify the relationship (users.id = orders.user_id)
// 6. ORDER BY - Sort results by user name and order date
//
// Learn more: https://www.postgresql.org/docs/current/tutorial-join.html
async function getUsersWithOrders() {
  // SQL INNER JOIN Query
  // This joins users with their orders based on the user_id foreign key
  const query = `
    SELECT 
      users.name AS user_name,
      users.email AS user_email,
      orders.product_name,
      orders.amount,
      orders.order_date
    FROM users
    INNER JOIN orders ON users.id = orders.user_id
    ORDER BY users.name, orders.order_date;
  `;
  
  try {
    console.log('🔍 Fetching users with their orders...\n');
    
    // Execute the query using the connection pool
    const result = await pool.query(query);
    
    console.log('✅ Results:');
    // console.table displays data in a nicely formatted table
    console.table(result.rows);
    console.log(`\n📊 Total orders found: ${result.rows.length}`);
    
    // Return the results for potential further processing
    return result.rows;
  } catch (error) {
    console.error('❌ Error executing query:', error.message);
    throw error;
  }
}

// ============================================
// BONUS: Function using LEFT JOIN
// ============================================
// Uncomment this function to see the difference between INNER JOIN and LEFT JOIN
// LEFT JOIN returns ALL users, even if they have no orders
// For users without orders, the order columns will be NULL
//
// async function getAllUsersWithOrders() {
//   const query = `
//     SELECT 
//       users.name AS user_name,
//       users.email AS user_email,
//       orders.product_name,
//       orders.amount,
//       orders.order_date
//     FROM users
//     LEFT JOIN orders ON users.id = orders.user_id
//     ORDER BY users.name, orders.order_date;
//   `;
//   
//   try {
//     console.log('\n🔍 Fetching ALL users (including those without orders)...\n');
//     const result = await pool.query(query);
//     console.log('✅ Results:');
//     console.table(result.rows);
//     return result.rows;
//   } catch (error) {
//     console.error('❌ Error:', error.message);
//     throw error;
//   }
// }

// Main function to run the query
async function main() {
  try {
    // Execute the INNER JOIN query
    await getUsersWithOrders();
    
    // Uncomment to see LEFT JOIN results
    // await getAllUsersWithOrders();
    
  } catch (error) {
    console.error('Application error:', error);
  } finally {
    // Always close the database connection pool when done
    // This releases all connections and prevents memory leaks
    await pool.end();
    console.log('\n🔌 Database connection closed');
  }
}

// Execute the main function
main();

// ============================================
// Additional Resources
// ============================================
// PostgreSQL JOIN Types: https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN
// Visual JOIN Guide: https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/
// Foreign Keys: https://www.postgresql.org/docs/current/tutorial-fk.html
