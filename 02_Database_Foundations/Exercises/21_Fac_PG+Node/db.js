// Import the pg (node-postgres) package
// This is the PostgreSQL client for Node.js
const { Client } = require('pg');

// Create a new Client instance with connection details
// This object will manage the connection to your PostgreSQL database
const client = new Client({
  user: 'postgres',           // Your PostgreSQL username (default is 'postgres')
  host: 'localhost',          // Where your database is hosted (localhost = your computer)
  database: 'node_pg_demo',   // The name of the database you want to connect to
  password: 'root',  // Your PostgreSQL password (CHANGE THIS!)
  port: 5432,                 // The port PostgreSQL runs on (5432 is the default)
});

// Export the client so other files can use it
// This allows you to import this connection in other files
module.exports = client;
