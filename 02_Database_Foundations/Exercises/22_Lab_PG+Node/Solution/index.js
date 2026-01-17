// Import and configure dotenv to load environment variables
require('dotenv').config();

const { Pool } = require('pg');

// Create a connection pool using environment variables
// This keeps sensitive credentials out of your code!
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Function to get all users from the database
async function getAllUsers() {
  try {
    console.log('🔍 Fetching all users from the database...\n');
    
    const result = await pool.query('SELECT * FROM users ORDER BY id');
    
    console.log('✅ Users found:');
    console.table(result.rows);
    console.log(`\n📊 Total users: ${result.rows.length}`);
    
  } catch (error) {
    console.error('❌ Error fetching users:', error.message);
  } finally {
    await pool.end();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the function
getAllUsers();
