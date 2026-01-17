// Import the database client from our db.js file
const client = require('./db');

// This is an async function that will handle all our database operations
// We use async/await because database operations take time to complete
async function main() {
  try {
    // Step 1: Connect to the database
    // This establishes a connection to PostgreSQL
    await client.connect();
    console.log('✅ Successfully connected to PostgreSQL database!');
    console.log('---');

    // Step 2: Query all users from the database
    // SELECT * means "get all columns"
    // FROM users means "from the users table"
    const getAllUsersQuery = 'SELECT * FROM users';
    const result = await client.query(getAllUsersQuery);
    
    // result.rows contains an array of all the rows returned by the query
    console.log('📋 Current users in database:');
    console.table(result.rows);
    console.log(`Total users: ${result.rows.length}`);
    console.log('---');

    // Step 3: Insert a new user into the database
    // Using $1 and $2 are placeholders for values (prevents SQL injection!)
    // The second parameter is an array of values to insert
    // const insertUserQuery = 'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *';
    // const newUserValues = ['Diana Prince', 'diana@example.com'];
    
    // const insertResult = await client.query(insertUserQuery, newUserValues);
    
    // RETURNING * gives us back the row that was just inserted
    // console.log('➕ New user added:');
    // console.log(insertResult.rows[0]);
    // console.log('---');

    // Step 4: Query a specific user by email
    // This demonstrates how to filter results with a WHERE clause
    const getUserByEmailQuery = 'SELECT * FROM users WHERE email = $1';
    const emailToFind = 'alice@example.com';
    
    const userResult = await client.query(getUserByEmailQuery, [emailToFind]);
    
    console.log(`🔍 User with email '${emailToFind}':'`);
    console.table(userResult.rows[0]);
    console.log('====================================================');

    // Step 5: Update a user's information
    // UPDATE changes existing data in the database
    const updateUserQuery = 'UPDATE users SET name = $1 WHERE email = $2 RETURNING *';
    const updateValues = ['Alice Williams', 'alice@example.com'];
    
    const updateResult = await client.query(updateUserQuery, updateValues);
    
    console.log('✏️ Updated user:');
    console.table(updateResult.rows[0]);
    console.log('====================================================');

    // Step 6: Count the total number of users
    // COUNT(*) is an aggregate function that counts all rows
    const countQuery = 'SELECT COUNT(*) FROM users';
    const countResult = await client.query(countQuery);
    
    console.log('Count Result:');
    console.table(countResult.rows[0]);
    console.log('====================================================');

    // Step 7: Delete a user (OPTIONAL - commented out by default)
    // Be careful with DELETE - it permanently removes data!
    // Uncomment the lines below if you want to test deletion
    
    // const deleteUserQuery = 'DELETE FROM users WHERE email = $1 RETURNING *';
    // const deleteResult = await client.query(deleteUserQuery, ['diana@example.com']);
    // console.log('🗑️ Deleted user:');
    // console.log(deleteResult.rows[0]);
    // console.log('---');

  } catch (error) {
    // If anything goes wrong, this catch block will handle the error
    console.error('❌ Database error:', error.message);
    console.error('Full error:', error);
  } finally {
    // The finally block always runs, whether there was an error or not
    // This ensures we always close the database connection
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

// Call the main function to start the program
// This kicks off everything!
main();
