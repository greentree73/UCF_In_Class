// TODO: Step 3 - Import and configure dotenv here
// Add: require('dotenv').config();

const { Pool } = require('pg');

// TODO: Step 4 - Update this configuration to use environment variables
// Replace the hardcoded values with process.env.VARIABLE_NAME
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'node_pg_demo',
  password: 'your_password',  // ⚠️ HARDCODED - Not secure!
  port: 5432,
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
