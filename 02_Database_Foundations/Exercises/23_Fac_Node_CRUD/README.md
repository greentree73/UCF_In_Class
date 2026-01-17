# CRUD Operations with PostgreSQL and Node.js

## What is CRUD?

**CRUD** stands for the four basic operations you can perform on data in a database:

- **C**reate - Add new data (INSERT)
- **R**ead - Retrieve existing data (SELECT)
- **U**pdate - Modify existing data (UPDATE)
- **D**elete - Remove data (DELETE)

These operations form the foundation of nearly every application that interacts with a database.

## Prerequisites

- PostgreSQL installed and running
- Node.js installed
- The `node_pg_demo` database created (from previous exercises)
- The `users` table created with sample data

## Setup

Install the required packages:

```bash
npm install pg dotenv
```

Create a `.env` file with your database credentials:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=node_pg_demo
DB_PASSWORD=your_password
DB_PORT=5432
```

## Running the Example

Execute the CRUD operations:

```bash
node index.js
```

The script will demonstrate each CRUD operation in sequence:
1. **CREATE** - Insert a new user
2. **READ** - Retrieve all users
3. **UPDATE** - Modify a user's information
4. **DELETE** - Remove a user

## Key Concepts

### Parameterized Queries
Always use parameterized queries (`$1`, `$2`, etc.) instead of string concatenation to prevent SQL injection attacks.

```javascript
// ✅ GOOD - Parameterized
pool.query('SELECT * FROM users WHERE email = $1', [email]);

// ❌ BAD - Vulnerable to SQL injection
pool.query(`SELECT * FROM users WHERE email = '${email}'`);
```

### RETURNING Clause
PostgreSQL's `RETURNING *` clause returns the affected rows after INSERT, UPDATE, or DELETE operations, which is useful for getting the final state of the data.

## Additional Resources

- [node-postgres Documentation](https://node-postgres.com/)
- [PostgreSQL CRUD Operations](https://www.postgresql.org/docs/current/dml.html)
- [SQL Injection Prevention](https://node-postgres.com/features/queries#parameterized-query)
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
