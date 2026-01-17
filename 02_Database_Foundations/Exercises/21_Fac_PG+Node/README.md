# PostgreSQL with Node.js - Getting Started Guide

This guide will teach you how to connect a Node.js application to a PostgreSQL database using the `pg` package.

## Prerequisites

Before starting, make sure you have:
- Node.js installed (version 14 or higher)
- PostgreSQL installed and running on your machine
- Basic knowledge of JavaScript and Node.js

## Step 1: Initialize Your Node Project

Create a new directory for this exercise and initialize a Node.js project:

```bash
npm init -y
```

This creates a `package.json` file with default settings.

## Step 2: Install the pg Package

Install the `pg` package (node-postgres), which is the PostgreSQL client for Node.js:

```bash
npm install pg
```

The `pg` package allows your Node.js application to communicate with PostgreSQL databases.

## Step 3: Create a PostgreSQL Database

Open your PostgreSQL command line tool (psql) or use a GUI tool like pgAdmin:

```bash
psql -U postgres
```

Create a new database for this exercise:

```sql
CREATE DATABASE node_pg_demo;
```

Connect to the database:

```sql
\c node_pg_demo
```

Create a simple table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

Insert some sample data:

```sql
INSERT INTO users (name, email) VALUES 
  ('Alice Johnson', 'alice@example.com'),
  ('Bob Smith', 'bob@example.com'),
  ('Charlie Brown', 'charlie@example.com');
```

## Step 4: Create Your Node.js Connection File

Create a file called `db.js` to handle the database connection. This file will be used by other files in your application.

See the `db.js` file in this directory for the implementation.

## Step 5: Create Your Main Application File

Create a file called `index.js` to demonstrate basic database operations.

See the `index.js` file in this directory for the implementation.

## Step 6: Run Your Application

Execute your Node.js application:

```bash
node index.js
```

You should see output showing:
- A successful connection message
- All users from the database
- A new user being added
- The updated list of users
- The connection being closed

## Understanding the Code

### Key Concepts

1. **Client vs Pool**: 
   - `Client`: Single connection to the database
   - `Pool`: Manages multiple connections (better for production)

2. **Async/Await**: Database operations are asynchronous, so we use `async/await` to handle them.

3. **Parameterized Queries**: Using `$1, $2, etc.` prevents SQL injection attacks.

4. **Error Handling**: Always use try/catch blocks to handle database errors gracefully.

5. **Connection Management**: Always close your database connections when done.

## Common Connection Options

When creating a connection, you can specify:

```javascript
const config = {
  user: 'your_username',      // Database user
  host: 'localhost',          // Database host
  database: 'your_database',  // Database name
  password: 'your_password',  // Database password
  port: 5432,                 // PostgreSQL default port
};
```

## Best Practices

1. **Use Environment Variables**: Store sensitive information (passwords, host) in environment variables
2. **Use Connection Pools**: For production applications, use `Pool` instead of `Client`
3. **Close Connections**: Always close database connections when done
4. **Use Parameterized Queries**: Never concatenate user input into SQL queries
5. **Handle Errors**: Always implement proper error handling

## Next Steps

- Learn about connection pooling with `pg.Pool`
- Explore transactions for complex operations
- Implement proper environment variable management with `dotenv`
- Build a REST API that uses PostgreSQL

## Additional Resources

- [node-postgres Documentation](https://node-postgres.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
