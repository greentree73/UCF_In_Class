# Basic Querying & Filtering - SELECT, DISTINCT, ORDER BY, LIMIT/OFFSET

## Overview

In this lesson, you'll learn how to write sophisticated queries that retrieve exactly the data you need. We'll explore filtering rows with WHERE clauses, removing duplicates with DISTINCT, sorting results with ORDER BY, and controlling result sets with LIMIT and OFFSET for pagination.

---

## 🎯 What You'll Learn

By the end of this lesson, you'll be able to:

- Write SELECT statements that retrieve specific columns
- Filter rows using the WHERE clause with various conditions
- Remove duplicate rows using DISTINCT
- Sort results using ORDER BY (ascending and descending)
- Control result set size using LIMIT
- Implement pagination using OFFSET
- Combine these techniques for powerful queries

---

## Part 1: The Basic SELECT Statement

### The Foundation: SELECT all columns

```sql
SELECT * FROM locations;
```

This returns all columns and all rows from the `locations` table.

### Select Specific Columns

Instead of `*` (all columns), specify which columns you want:

```sql
SELECT name, region FROM locations;
```

Returns only the `name` and `region` columns.

### Select with Column Aliases

Rename columns for clearer output:

```sql
SELECT 
    name AS location_name,
    region AS area,
    description AS details
FROM locations;
```

The `AS` keyword creates temporary aliases that appear in results but don't change the database.

### Select with Expressions

You can perform calculations or concatenations:

```sql
-- Concatenate columns
SELECT name || ' is located in ' || region AS description FROM locations;

-- Calculate with numbers
SELECT id, name, (id * 10) AS multiplied FROM locations;
```

---

## Part 2: Filtering with WHERE

### The WHERE Clause: The Power of Filtering

WHERE determines which rows are returned:

```sql
SELECT * FROM locations WHERE region = 'Mountains';
```

Returns only locations in the Mountains region.

### Comparison Operators

```sql
-- Equal to
SELECT * FROM locations WHERE id = 1;

-- Not equal to
SELECT * FROM locations WHERE id != 5;
-- or use <>
SELECT * FROM locations WHERE id <> 5;

-- Greater than
SELECT * FROM locations WHERE id > 3;

-- Less than
SELECT * FROM locations WHERE id < 5;

-- Greater than or equal to
SELECT * FROM locations WHERE id >= 2;

-- Less than or equal to
SELECT * FROM locations WHERE id <= 4;
```

### Text Pattern Matching: LIKE

```sql
-- Starts with 'Silver'
SELECT * FROM locations WHERE name LIKE 'Silver%';

-- Contains 'Peak' anywhere
SELECT * FROM locations WHERE name LIKE '%Peak%';

-- Ends with 'Forest'
SELECT * FROM locations WHERE name LIKE '%Forest';

-- Exactly 3 characters after 'Cav'
SELECT * FROM locations WHERE name LIKE 'Cav___';
```

**LIKE Wildcards:**
- `%` — Matches any number of characters
- `_` — Matches exactly one character

### IN Operator: Multiple Values

```sql
-- Find locations with id 1, 3, or 5
SELECT * FROM locations WHERE id IN (1, 3, 5);

-- Find locations in specific regions
SELECT * FROM locations WHERE region IN ('Mountains', 'Forests', 'Coastal');
```

### BETWEEN Operator: Range Matching

```sql
-- Find locations with id between 2 and 4 (inclusive)
SELECT * FROM locations WHERE id BETWEEN 2 AND 4;

-- Find locations with name alphabetically between A and M
SELECT * FROM locations WHERE name BETWEEN 'A' AND 'M';
```

### NULL Checking

```sql
-- Find locations with NULL description
SELECT * FROM locations WHERE description IS NULL;

-- Find locations with a description (not NULL)
SELECT * FROM locations WHERE description IS NOT NULL;
```

### Combining Conditions: AND / OR / NOT

```sql
-- Both conditions must be true (AND)
SELECT * FROM locations 
WHERE region = 'Mountains' AND description IS NOT NULL;

-- Either condition can be true (OR)
SELECT * FROM locations 
WHERE region = 'Mountains' OR region = 'Forests';

-- Negate a condition (NOT)
SELECT * FROM locations 
WHERE NOT region = 'Desert';
-- or equivalently:
SELECT * FROM locations WHERE region != 'Desert';

-- Complex combinations
SELECT * FROM locations
WHERE (region = 'Mountains' OR region = 'Forests')
  AND description IS NOT NULL
  AND name LIKE '%Peak%';
```

---

## Part 3: Removing Duplicates with DISTINCT

### The Problem: Duplicate Values

If you select just the region column, you'll see 'Mountains' multiple times:

```sql
SELECT region FROM locations;
-- Returns:
-- Mountains
-- Mountains
-- Coastal
-- Mountains
-- Forests
```

### The Solution: DISTINCT

```sql
SELECT DISTINCT region FROM locations;
-- Returns (each region only once):
-- Mountains
-- Coastal
-- Forests
```

### DISTINCT with Multiple Columns

```sql
SELECT DISTINCT region, description FROM locations;
-- Returns unique combinations of region and description
```

### COUNT DISTINCT

Count unique values:

```sql
-- How many different regions are there?
SELECT COUNT(DISTINCT region) FROM locations;

-- How many different descriptions?
SELECT COUNT(DISTINCT description) FROM locations;
```

---

## Part 4: Sorting with ORDER BY

### Basic Sorting: Ascending (Default)

```sql
-- Sort by name A to Z (ascending)
SELECT * FROM locations ORDER BY name ASC;
-- or simply (ASC is default):
SELECT * FROM locations ORDER BY name;
```

### Descending Order

```sql
-- Sort by name Z to A (descending)
SELECT * FROM locations ORDER BY name DESC;

-- Sort by id from highest to lowest
SELECT * FROM locations ORDER BY id DESC;
```

### Sort by Multiple Columns

```sql
-- Sort by region ascending, then by name ascending
SELECT * FROM locations 
ORDER BY region ASC, name ASC;

-- Sort by region ascending, then by name descending
SELECT * FROM locations 
ORDER BY region ASC, name DESC;
```

### Sorting by Expression

```sql
-- Sort by name length (shortest to longest)
SELECT * FROM locations 
ORDER BY LENGTH(name) ASC;

-- Sort by name length descending
SELECT * FROM locations 
ORDER BY LENGTH(name) DESC;
```

### Sorting Numbers vs Text

```sql
-- Numeric sort (1, 2, 10, 20)
SELECT * FROM locations ORDER BY id ASC;

-- Text sort ('1', '10', '2', '20') - if stored as text
SELECT * FROM locations ORDER BY id::text ASC;
```

---

## Part 5: Limiting Results with LIMIT

### The LIMIT Clause: Get Only X Rows

```sql
-- Get only the first 3 locations
SELECT * FROM locations LIMIT 3;

-- Get the first 5 locations, ordered by name
SELECT * FROM locations 
ORDER BY name ASC 
LIMIT 5;
```

### Common Use Cases

```sql
-- Get the top 10 most recent entries
SELECT * FROM locations 
ORDER BY id DESC 
LIMIT 10;

-- Get just the first location
SELECT * FROM locations LIMIT 1;

-- Get the 5 shortest location names
SELECT name FROM locations 
ORDER BY LENGTH(name) ASC 
LIMIT 5;
```

---

## Part 6: Pagination with LIMIT and OFFSET

### The OFFSET Clause: Skip Rows

```sql
-- Skip the first 2 rows, then get 3 rows
SELECT * FROM locations 
LIMIT 3 OFFSET 2;
```

This returns rows 3, 4, and 5.

### Pagination Pattern

Implement pagination by changing OFFSET:

```sql
-- Page 1: Rows 1-10
SELECT * FROM locations 
ORDER BY name 
LIMIT 10 OFFSET 0;

-- Page 2: Rows 11-20
SELECT * FROM locations 
ORDER BY name 
LIMIT 10 OFFSET 10;

-- Page 3: Rows 21-30
SELECT * FROM locations 
ORDER BY name 
LIMIT 10 OFFSET 20;

-- Page N: Skip (N-1)*page_size rows
SELECT * FROM locations 
ORDER BY name 
LIMIT 10 OFFSET ((3 - 1) * 10);  -- For page 3
```

### Pagination Formula

```
OFFSET = (page_number - 1) * page_size
```

**Example:** Get page 4 with 5 items per page:
```sql
SELECT * FROM locations 
ORDER BY name 
LIMIT 5 OFFSET 15;  -- (4-1) * 5 = 15
```

---

## Part 7: Combining All Techniques

### Advanced Query: The Complete Package

```sql
-- Get the top 10 locations by alphabetical order, 
-- excluding nulls, pagination-ready
SELECT 
    id,
    name AS location_name,
    region AS location_region,
    description
FROM locations
WHERE description IS NOT NULL
  AND region IN ('Mountains', 'Forests')
ORDER BY region ASC, name ASC
LIMIT 10 OFFSET 0;
```

### Real-World Example: Product Search Results

```sql
-- Get page 2 of search results for locations containing 'Peak'
SELECT 
    id,
    name,
    region,
    LENGTH(description) AS description_length
FROM locations
WHERE name LIKE '%Peak%' OR description LIKE '%peak%'
ORDER BY name ASC
LIMIT 20 OFFSET 20;  -- Page 2, 20 items per page
```

---

## Part 8: Performance Considerations

### Indexing for Speed

Frequently filtered or sorted columns should have indexes:

```sql
-- Create an index on region for faster filtering
CREATE INDEX idx_locations_region ON locations(region);

-- Create an index on name for faster searching
CREATE INDEX idx_locations_name ON locations(name);
```

### Avoiding Common Mistakes

**❌ Not using WHERE for filtering**
```sql
-- Bad: Gets all data, filters in application
SELECT * FROM locations;  -- Then filter in code
```

**✅ Filter in the database**
```sql
-- Good: Let the database do the filtering
SELECT * FROM locations WHERE region = 'Mountains';
```

**❌ Not using LIMIT for large results**
```sql
-- Bad: Brings all data to your application
SELECT * FROM locations;
```

**✅ Use LIMIT to control result size**
```sql
-- Good: Only get what you need
SELECT * FROM locations LIMIT 100;
```

---

## 📋 Quick Reference Cheat Sheet

| Task | Syntax | Example |
|------|--------|---------|
| **Select all** | `SELECT * FROM table;` | `SELECT * FROM locations;` |
| **Select columns** | `SELECT col1, col2 FROM table;` | `SELECT name, region FROM locations;` |
| **Filter exact match** | `WHERE column = value` | `WHERE region = 'Mountains'` |
| **Filter text pattern** | `WHERE column LIKE pattern` | `WHERE name LIKE '%Peak%'` |
| **Filter range** | `WHERE column BETWEEN x AND y` | `WHERE id BETWEEN 1 AND 5` |
| **Filter list** | `WHERE column IN (list)` | `WHERE region IN ('Mountains', 'Forests')` |
| **Filter NULL** | `WHERE column IS NULL` | `WHERE description IS NULL` |
| **Remove duplicates** | `SELECT DISTINCT column` | `SELECT DISTINCT region FROM locations;` |
| **Sort ascending** | `ORDER BY column ASC` | `ORDER BY name ASC;` |
| **Sort descending** | `ORDER BY column DESC` | `ORDER BY id DESC;` |
| **Limit results** | `LIMIT n` | `LIMIT 10;` |
| **Skip rows** | `OFFSET n` | `OFFSET 5;` |
| **Pagination** | `LIMIT n OFFSET ((p-1)*n)` | `LIMIT 10 OFFSET 20;` |

---

## 🔑 Key Takeaways

### SELECT Clause
- Use `SELECT *` to get all columns
- Specify column names for specific columns
- Use `AS` to rename columns

### WHERE Clause
- Filters rows based on conditions
- Supports operators: =, !=, <, >, <=, >=
- Use LIKE for text pattern matching
- Use IN for multiple values
- Use BETWEEN for ranges
- Use IS NULL / IS NOT NULL for missing values
- Combine with AND, OR, NOT

### DISTINCT
- Removes duplicate rows
- Works with single or multiple columns
- Use COUNT(DISTINCT col) for counting unique values

### ORDER BY
- Sorts results ascending (ASC) or descending (DESC)
- Can sort by multiple columns
- Default is ASC

### LIMIT
- Controls how many rows are returned
- Common for performance optimization

### OFFSET
- Skips specified number of rows
- Combined with LIMIT for pagination
- Formula: `OFFSET = (page_number - 1) * page_size`

---

## 📚 Helpful Resources

### Official PostgreSQL Documentation

- [PostgreSQL SELECT Documentation](https://www.postgresql.org/docs/current/sql-select.html)
- [PostgreSQL WHERE Clause](https://www.postgresql.org/docs/current/sql-syntax.html#SQL-SYNTAX-LEXICAL)
- [PostgreSQL DISTINCT](https://www.postgresql.org/docs/current/sql-select.html#SQL-DISTINCT)
- [PostgreSQL ORDER BY](https://www.postgresql.org/docs/current/sql-select.html#SQL-ORDERBY)
- [PostgreSQL LIMIT/OFFSET](https://www.postgresql.org/docs/current/sql-select.html#SQL-LIMIT)

### Tutorials and Guides

- [PostgreSQL Tutorial - SELECT](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-select/)
- [PostgreSQL Tutorial - WHERE](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-where/)
- [PostgreSQL Tutorial - ORDER BY](https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-order-by/)
- [W3Schools - SQL SELECT](https://www.w3schools.com/sql/sql_select.asp)
- [W3Schools - SQL WHERE](https://www.w3schools.com/sql/sql_where.asp)
- [SQL Tutorial - Filtering and Sorting](https://www.sqltutorial.org/sql-select/)

### Interactive Learning

- [SQL Zoo - SELECT Tutorial](https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial)
- [LeetCode Database Challenges](https://leetcode.com/problemset/database/)
- [Mode Analytics SQL Tutorial](https://mode.com/sql-tutorial/)

---

## ✓ Completion Checklist

After completing this lesson, you should be able to:

- [ ] Write SELECT statements for all or specific columns
- [ ] Use column aliases with AS
- [ ] Filter data using WHERE clause
- [ ] Use comparison operators (=, !=, <, >, <=, >=)
- [ ] Use LIKE for pattern matching with % and _
- [ ] Use IN for matching multiple values
- [ ] Use BETWEEN for range matching
- [ ] Handle NULL values with IS NULL / IS NOT NULL
- [ ] Combine conditions with AND, OR, NOT
- [ ] Remove duplicates with DISTINCT
- [ ] Count distinct values with COUNT(DISTINCT)
- [ ] Sort results with ORDER BY (ASC/DESC)
- [ ] Sort by multiple columns
- [ ] Limit result set size with LIMIT
- [ ] Implement pagination with OFFSET
- [ ] Combine multiple techniques in complex queries

---

## 💡 Common Query Patterns

### Get Unique Values

```sql
SELECT DISTINCT region FROM locations;
```

### Get Top N Items

```sql
SELECT * FROM locations ORDER BY id DESC LIMIT 10;
```

### Search and Sort

```sql
SELECT * FROM locations 
WHERE name LIKE '%Peak%' 
ORDER BY name ASC;
```

### Paginated Results

```sql
SELECT * FROM locations 
ORDER BY name ASC 
LIMIT 50 OFFSET 100;
```

### Complex Filtering

```sql
SELECT * FROM locations
WHERE (region = 'Mountains' OR region = 'Forests')
  AND description IS NOT NULL
  AND name NOT LIKE 'Temp%'
ORDER BY region, name;
```

---

## Related Lessons

- **Previous:** [Mutating Data Safely - UPDATE and DELETE](../10_Lab_Mutations/)
- **Next:** [Aggregate Functions and GROUP BY](../TODO/)
- **Advanced:** [JOINs and Subqueries](../TODO/)

---

## 🎓 Practice Exercises

Try writing these queries yourself:

1. Get all locations in the 'Mountains' region
2. Find locations with names starting with 'S'
3. Get the top 5 locations alphabetically
4. Count distinct regions
5. Get page 2 of locations (10 per page)
6. Find locations with 'Peak' in name or description
7. Get the longest location descriptions
8. Find all regions except 'Desert'

---

**Master filtering and querying - it's the foundation of SQL!** 🚀

Remember: The WHERE clause is your filter, ORDER BY is your sorter, and LIMIT/OFFSET is your pagination control. Master these and you'll write powerful queries!

---

*Happy querying!* 📊
