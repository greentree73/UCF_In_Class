// Load environment variables from .env file
// Learn more: https://www.npmjs.com/package/dotenv
require('dotenv').config();

// Import the Pool class from the pg package
// Pool manages multiple database connections efficiently
// Learn more: https://node-postgres.com/features/pooling
const { Pool } = require('pg');

// Create a connection pool using environment variables
// This allows multiple simultaneous database operations
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ============================================
// CREATE - Insert new data into the database
// ============================================
// SQL: INSERT INTO table_name (columns) VALUES (values) RETURNING *
// The RETURNING * clause returns the newly created row
// Learn more: https://www.postgresql.org/docs/current/dml-insert.html
async function createUser(name, email) {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const values = [name, email];
  
  try {
    const result = await pool.query(query, values);
    console.log('✅ CREATE - New user created:');
    console.log(result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('❌ CREATE Error:', error.message);
    throw error;
  }
}

// ============================================
// READ - Retrieve data from the database
// ============================================
// SQL: SELECT columns FROM table_name WHERE conditions
// Use * to select all columns, or specify individual columns
// Learn more: https://www.postgresql.org/docs/current/queries-select-lists.html
async function getAllUsers() {
  const query = 'SELECT * FROM users ORDER BY id';
  
  try {
    const result = await pool.query(query);
    console.log('\n📖 READ - All users in database:');
    console.table(result.rows);
    console.log(`Total users: ${result.rows.length}`);
    return result.rows;
  } catch (error) {
    console.error('❌ READ Error:', error.message);
    throw error;
  }
}

// READ with filtering - Find a specific user by email
// The WHERE clause filters results based on a condition
// Using $1 is a parameterized query that prevents SQL injection
// Learn more: https://node-postgres.com/features/queries#parameterized-query
async function getUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];
  
  try {
    const result = await pool.query(query, values);
    console.log(`\n🔍 READ - User with email '${email}':`);
    console.log(result.rows[0] || 'No user found');
    return result.rows[0];
  } catch (error) {
    console.error('❌ READ Error:', error.message);
    throw error;
  }
}

// ============================================
// UPDATE - Modify existing data in the database
// ============================================
// SQL: UPDATE table_name SET column = value WHERE condition RETURNING *
// Always use WHERE clause to avoid updating all rows!
// RETURNING * gives us back the updated row
// Learn more: https://www.postgresql.org/docs/current/dml-update.html
async function updateUser(email, newName) {
  const query = 'UPDATE users SET name = $1 WHERE email = $2 RETURNING *';
  const values = [newName, email];
  
  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      console.log('\n✏️ UPDATE - User updated:');
      console.log(result.rows[0]);
      return result.rows[0];
    } else {
      console.log('\n⚠️ UPDATE - No user found with that email');
      return null;
    }
  } catch (error) {
    console.error('❌ UPDATE Error:', error.message);
    throw error;
  }
}

// ============================================
// DELETE - Remove data from the database
// ============================================
// SQL: DELETE FROM table_name WHERE condition RETURNING *
// ⚠️ WARNING: Without WHERE clause, DELETE removes ALL rows!
// RETURNING * shows what was deleted
// Learn more: https://www.postgresql.org/docs/current/dml-delete.html
async function deleteUser(email) {
  const query = 'DELETE FROM users WHERE email = $1 RETURNING *';
  const values = [email];
  
  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      console.log('\n🗑️ DELETE - User deleted:');
      console.log(result.rows[0]);
      return result.rows[0];
    } else {
      console.log('\n⚠️ DELETE - No user found with that email');
      return null;
    }
  } catch (error) {
    console.error('❌ DELETE Error:', error.message);
    throw error;
  }
}

// ============================================
// Main function to demonstrate CRUD operations
// ============================================
async function demonstrateCRUD() {
  try {
    console.log('🚀 Starting CRUD Operations Demo\n');
    console.log('='.repeat(50));
    
    // CREATE - Add a new user
    await createUser('Frank Ocean', 'frank@example.com');
    
    // READ - Get all users
    await getAllUsers();
    
    // READ - Find a specific user
    await getUserByEmail('frank@example.com');
    
    // UPDATE - Change the user's name
    await updateUser('frank@example.com', 'Franklin Ocean');
    
    // READ - Verify the update
    await getUserByEmail('frank@example.com');
    
    // DELETE - Remove the user
    await deleteUser('frank@example.com');
    
    // READ - Verify deletion
    await getAllUsers();
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ CRUD Operations Demo Complete!');
    
  } catch (error) {
    console.error('\n❌ Demo failed:', error.message);
  } finally {
    // Always close the pool when your app is done
    // This releases all database connections
    await pool.end();
    console.log('🔌 Database connection pool closed');
  }
}

// Execute the demonstration
// Learn more about async/await: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
demonstrateCRUD();

// ============================================
// Additional Resources
// ============================================
// - PostgreSQL Data Manipulation: https://www.postgresql.org/docs/current/dml.html
// - node-postgres Guide: https://node-postgres.com/guides/project-structure
// - SQL Best Practices: https://www.sqlstyle.guide/
// - Preventing SQL Injection: https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html
