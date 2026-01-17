# Lab Activity: SQL Joins with Node.js and PostgreSQL

## Objective
Practice writing SQL JOIN queries in Node.js to combine data from multiple related tables. You'll retrieve users and their orders using an INNER JOIN.

## What You'll Learn
- How to create related database tables with foreign keys
- Writing JOIN queries to combine data from multiple tables
- Executing complex queries with the pg package
- Understanding relationships between database tables

## Database Setup

### Step 1: Create the Database Schema

Run the SQL commands in `schema.sql` to create your database tables:

```bash
psql -U postgres -d node_pg_demo -f schema.sql
```

This creates two tables:
- **users** - Stores user information
- **orders** - Stores orders with a foreign key reference to users

### Step 2: Seed the Database

Run the SQL commands in `seeds.sql` to populate the tables with sample data:

```bash
psql -U postgres -d node_pg_demo -f seeds.sql
```

This will add sample users and their orders to the database.

## Your Task

Complete the `getUsersWithOrders()` function in `index.js`:

1. Write a SQL JOIN query that combines the `users` and `orders` tables
2. The query should retrieve:
   - User name and email
   - Order product name, amount, and order date
3. Use an INNER JOIN to match users with their orders
4. Order the results by user name and order date

### Expected Output Format

Your query should return rows that look like this:

```javascript
{
  user_name: 'Alice Johnson',
  user_email: 'alice@example.com',
  product_name: 'Laptop',
  amount: 999.99,
  order_date: '2025-01-15T00:00:00.000Z'
}
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Create your `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your PostgreSQL password

4. Run the application:
```bash
npm start
```

## Success Criteria

✅ Database schema created successfully  
✅ Sample data inserted into both tables  
✅ JOIN query retrieves data from both users and orders tables  
✅ Results are properly formatted and logged to console  

## SQL JOIN Refresher

An INNER JOIN returns rows when there is a match in both tables:

```sql
SELECT columns
FROM table1
INNER JOIN table2 ON table1.id = table2.foreign_key;
```

## Additional Resources

- [PostgreSQL Joins Tutorial](https://www.postgresql.org/docs/current/tutorial-join.html)
- [SQL Joins Explained](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/)
- [node-postgres Query Guide](https://node-postgres.com/features/queries)
