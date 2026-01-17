# Solution: SQL Joins with Node.js and PostgreSQL

This is the completed solution for the SQL joins lab exercise.

## Files Included

- **schema.sql** - Database schema with users and orders tables
- **seeds.sql** - Sample data (10 users, 15 orders)
- **index.js** - Complete Node.js application with INNER JOIN query
- **package.json** - Project dependencies
- **.env.example** - Environment variables template

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Database Schema
```bash
psql -U postgres -d node_pg_demo -f schema.sql
```

### 3. Seed the Database
```bash
psql -U postgres -d node_pg_demo -f seeds.sql
```

### 4. Configure Environment
```bash
cp .env.example .env
# Edit .env and add your PostgreSQL password
```

### 5. Run the Application
```bash
npm start
```

## The JOIN Query Explained

```sql
SELECT 
  users.name AS user_name,
  users.email AS user_email,
  orders.product_name,
  orders.amount,
  orders.order_date
FROM users
INNER JOIN orders ON users.id = orders.user_id
ORDER BY users.name, orders.order_date;
```

### Query Breakdown:

1. **SELECT** - Specifies which columns to retrieve from both tables
2. **AS** - Creates aliases for cleaner column names in the results
3. **FROM users** - The primary table we're querying
4. **INNER JOIN orders** - Combines users with their orders
5. **ON users.id = orders.user_id** - The join condition (foreign key relationship)
6. **ORDER BY** - Sorts results by user name, then order date

## Key Concepts Demonstrated

✅ **Foreign Key Relationships** - orders.user_id references users.id  
✅ **INNER JOIN** - Returns only users who have orders  
✅ **Column Aliases** - Using AS for readable result column names  
✅ **Multi-table Queries** - Combining data from related tables  
✅ **Parameterized Queries** - Safe database interactions  

## INNER JOIN vs LEFT JOIN

**INNER JOIN** (used in this solution):
- Returns only rows where there's a match in BOTH tables
- Users without orders are NOT included
- Result: 14 rows (only users with orders)

**LEFT JOIN** (bonus example in comments):
- Returns ALL rows from the left table (users)
- If no match in right table (orders), order columns are NULL
- Result: Would include Frank and Jack with NULL order data

## Database Structure

**users table:**
- id (PRIMARY KEY)
- name
- email
- created_at

**orders table:**
- id (PRIMARY KEY)
- user_id (FOREIGN KEY → users.id)
- product_name
- amount
- order_date

## Expected Output

The query returns 14 rows showing:
- User names and emails
- Their order details (product, amount, date)
- Results sorted alphabetically by user, then by order date

Note: Frank Ocean and Jack Ryan don't appear in results because they have no orders (INNER JOIN only shows matches).

## Additional Learning Resources

- [PostgreSQL JOIN Tutorial](https://www.postgresql.org/docs/current/tutorial-join.html)
- [Visual JOIN Guide](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-joins/)
- [Foreign Keys Explained](https://www.postgresql.org/docs/current/tutorial-fk.html)
