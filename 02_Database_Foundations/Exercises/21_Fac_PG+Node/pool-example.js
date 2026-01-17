// BONUS: Connection Pooling Example
// This is a more advanced and production-ready way to connect to PostgreSQL
// Use this approach when building real applications!

// Import the Pool class instead of Client
// Pool manages multiple database connections for better performance
const { Pool } = require('pg');

// Create a connection pool instead of a single client
// A pool maintains multiple connections and reuses them efficiently
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node_pg_demo',
  password: 'root',  // CHANGE THIS!
  port: 5432,
  max: 20,                    // Maximum number of connections in the pool
  idleTimeoutMillis: 30000,   // How long a connection can be idle before being closed
  connectionTimeoutMillis: 2000, // How long to wait when connecting
});

// Example function using the pool
async function getAllUsers() {
  // When you query with a pool, it automatically:
  // 1. Gets an available connection from the pool
  // 2. Runs your query
  // 3. Returns the connection to the pool for reuse
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Example function to add a user
async function addUser(name, email) {
  const query = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
  const values = [name, email];
  
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
}

// Main function to demonstrate pool usage
async function main() {
  try {
    console.log('🏊 Using Connection Pool');
    console.log('---');

    // Fetch all users
    const users = await getAllUsers();
    console.log('All users:');
    console.table(users);
    console.log('=========================');

    // Add a new user
    const newUser = await addUser('Eve Martinez', 'eve@example.com');
    console.log('New user added:', newUser);
    console.log('---');

    // Fetch users again to see the new one
    const updatedUsers = await getAllUsers();
    console.log('Updated user list:', updatedUsers);
    console.log(`Total: ${updatedUsers.length} users`);
    
  } catch (error) {
    console.error('Application error:', error);
  } finally {
    // Close all connections in the pool when your app shuts down
    // In a real app, you'd typically do this on process exit
    await pool.end();
    console.log('🔌 Pool closed');
  }
}

// Run the example
main();

// BENEFITS OF USING POOL:
// ✅ Better performance - connections are reused
// ✅ Handles multiple simultaneous queries efficiently
// ✅ Automatically manages connection lifecycle
// ✅ Prevents running out of connections
// ✅ Industry standard for production apps
