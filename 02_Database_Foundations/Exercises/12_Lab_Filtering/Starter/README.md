# Lab 12: Basic Querying & Filtering - SELECT, DISTINCT, ORDER BY, LIMIT/OFFSET

## Overview

In this lab, you'll practice fundamental SQL querying skills using the `knights_realm` database. You'll learn how to:
- Write basic SELECT queries to retrieve data
- Filter results using WHERE clauses
- Use DISTINCT to find unique values
- Sort results with ORDER BY
- Implement pagination with LIMIT and OFFSET

**Database:** `knights_realm`  
**Table:** `realms` (columns: id, name, ruler, description)

---

## Prerequisites

Before starting this activity, make sure you have:
1. PostgreSQL installed and running
2. The `knights_realm` database created
3. The `realms` table with 30 records populated (use `realms.sql`)
4. Access to psql or another database client

### Quick Setup (if needed):
```bash
psql -U postgres -d knights_realm -f realms.sql
```

---

## PART 1: Basic SELECT Queries

### What is SELECT?
The SELECT statement is used to retrieve data from a database. It's the most fundamental SQL operation.

### Basic Syntax:
```sql
SELECT column_name(s)
FROM table_name;
```

### Activity 1.1: Select All Columns
**Goal:** Retrieve all realm data from the realms table

```sql
SELECT * 
FROM realms;
```

**Expected Result:** 30 rows with id, name, ruler, and description columns

---

### Activity 1.2: Select Specific Columns
**Goal:** Show only realm names and their rulers (more focused data)

```sql
SELECT name, ruler 
FROM realms;
```

**Expected Result:** 30 rows showing just the name and ruler columns

**Why this matters:** In real applications, you often don't need every column. Selecting only what you need improves performance and readability.

---

### Activity 1.3: Select with Column Aliases
**Goal:** Rename columns in your results for clarity

```sql
SELECT 
  name AS "Realm Name",
  ruler AS "Current Ruler",
  description AS "Description"
FROM realms;
```

**Expected Result:** 30 rows with renamed column headers

**Tip:** Use quotes around alias names if they contain spaces. This makes output more readable!

---

## PART 2: Filtering with WHERE

### What is WHERE?
The WHERE clause filters records based on specified conditions. Only rows matching your criteria are returned.

### Basic Syntax:
```sql
SELECT column_name(s)
FROM table_name
WHERE condition;
```

### Activity 2.1: Filter by Exact Match
**Goal:** Find all realms ruled by a King

```sql
SELECT name, ruler 
FROM realms
WHERE ruler LIKE 'King %';
```

**Expected Result:** Multiple King-ruled realms (The Northern Kingdom, etc.)

**Note:** We use LIKE with 'King %' to find all rulers whose names start with "King "

---

### Activity 2.2: Filter with Multiple Conditions (AND)
**Goal:** Find peaceful, well-governed realms with "Peace", "Republic", or "Haven" in their name

```sql
SELECT name, ruler, description
FROM realms
WHERE name LIKE '%Peace%' 
  OR name LIKE '%Republic%' 
  OR name LIKE '%Haven%';
```

**Expected Result:** 3-4 specific realms matching these criteria

---

### Activity 2.3: Filter by Description Content
**Goal:** Find all realms with "magic" mentioned in their description

```sql
SELECT name, ruler, description
FROM realms
WHERE description LIKE '%magic%'
  OR description LIKE '%Magic%';
```

**Expected Result:** 10+ realms with magic-related descriptions

**Tip:** Notice we check for both lowercase and uppercase "magic" - this is case-insensitive in most cases, but it's good practice.

---

### Activity 2.4: Filter Using NOT
**Goal:** Find all realms that are NOT ruled by a Queen

```sql
SELECT name, ruler
FROM realms
WHERE ruler NOT LIKE 'Queen %';
```

**Expected Result:** 27 realms (all except the Queen-ruled ones)

---

## PART 3: DISTINCT - Finding Unique Values

### What is DISTINCT?
DISTINCT eliminates duplicate values from your results, showing only unique entries.

### Basic Syntax:
```sql
SELECT DISTINCT column_name(s)
FROM table_name;
```

### Activity 3.1: Find All Unique Ruler Types
**Goal:** See what types of rulers exist in the realms database (without duplicates)

```sql
SELECT DISTINCT 
  SUBSTRING(ruler, 1, POSITION(' ' IN ruler) - 1) AS ruler_title
FROM realms
ORDER BY ruler_title;
```

**Expected Result:** A sorted list of unique ruler titles (King, Queen, Duke, Sultan, etc.)

**Explanation:** SUBSTRING extracts the first word (the ruler title) from each ruler name, and DISTINCT shows each title only once.

---

### Activity 3.2: Alternative - Simpler DISTINCT
**Goal:** Get unique ruler names (without worrying about the title part)

```sql
SELECT DISTINCT ruler
FROM realms
ORDER BY ruler;
```

**Expected Result:** All 30 unique ruler names in alphabetical order

---

## PART 4: ORDER BY - Sorting Results

### What is ORDER BY?
ORDER BY sorts your results in ascending (ASC) or descending (DESC) order by one or more columns.

### Basic Syntax:
```sql
SELECT column_name(s)
FROM table_name
ORDER BY column_name ASC | DESC;
```

### Activity 4.1: Sort Realms Alphabetically by Name
**Goal:** List all realms in alphabetical order by name

```sql
SELECT name, ruler
FROM realms
ORDER BY name ASC;
```

**Expected Result:** All 30 realms sorted from A-Z by name

**Note:** ASC (ascending) is the default, so you can omit it

---

### Activity 4.2: Sort Reverse Alphabetically
**Goal:** List realms in reverse alphabetical order (Z-A)

```sql
SELECT name, ruler
FROM realms
ORDER BY name DESC;
```

**Expected Result:** All 30 realms sorted from Z-A by name

---

### Activity 4.3: Sort by Multiple Columns
**Goal:** Sort realms by ruler first, then by name within each ruler group

```sql
SELECT name, ruler
FROM realms
ORDER BY ruler ASC, name ASC;
```

**Expected Result:** Realms grouped by ruler name, with realm names alphabetized within each group

---

### Activity 4.4: Sort Filtered Results
**Goal:** Find all realms with "Kingdom" in their name, sorted alphabetically

```sql
SELECT name, ruler
FROM realms
WHERE name LIKE '%Kingdom%'
ORDER BY name ASC;
```

**Expected Result:** 3-4 realms with "Kingdom" in their name, sorted alphabetically

---

## PART 5: LIMIT and OFFSET - Pagination

### What are LIMIT and OFFSET?
- **LIMIT:** Specifies the maximum number of rows to return
- **OFFSET:** Specifies how many rows to skip before starting to return results
- Together, they enable pagination (showing results in pages)

### Basic Syntax:
```sql
SELECT column_name(s)
FROM table_name
LIMIT number
OFFSET number;
```

### Pagination Formula:
```
OFFSET = (page_number - 1) * page_size
LIMIT = page_size

Example: Show page 2 with 10 items per page
OFFSET = (2 - 1) * 10 = 10
LIMIT = 10
```

---

### Activity 5.1: Show First 10 Results
**Goal:** Get the first 10 realms (page 1, 10 items per page)

```sql
SELECT name, ruler
FROM realms
ORDER BY name ASC
LIMIT 10;
```

**Expected Result:** First 10 realms alphabetically

---

### Activity 5.2: Show Second Page (Next 10 Results)
**Goal:** Skip the first 10 and show the next 10 realms (page 2)

```sql
SELECT name, ruler
FROM realms
ORDER BY name ASC
LIMIT 10
OFFSET 10;
```

**Expected Result:** Realms 11-20 alphabetically

---

### Activity 5.3: Show Third Page
**Goal:** Get realms 21-30 (page 3)

```sql
SELECT name, ruler
FROM realms
ORDER BY name ASC
LIMIT 10
OFFSET 20;
```

**Expected Result:** Last 10 realms alphabetically

---

### Activity 5.4: Different Page Size
**Goal:** Show only 5 realms per page, get page 1

```sql
SELECT name, ruler
FROM realms
ORDER BY name ASC
LIMIT 5;
```

**Expected Result:** First 5 realms alphabetically

---

### Activity 5.5: Paginate with Filtering
**Goal:** Show page 1 of realms with "Kingdom" in their name (5 per page)

```sql
SELECT name, ruler
FROM realms
WHERE name LIKE '%Kingdom%'
ORDER BY name ASC
LIMIT 5
OFFSET 0;
```

**Expected Result:** First 5 realms matching the filter criterion

---

## PART 6: Combining Concepts - Advanced Queries

### Activity 6.1: Complex Filter + Sort + Limit
**Goal:** Find realms with "magic" in the description, sort by name, show first 5

```sql
SELECT name, ruler, description
FROM realms
WHERE description LIKE '%magic%' 
   OR description LIKE '%Magic%'
ORDER BY name ASC
LIMIT 5;
```

**Expected Result:** First 5 magic-related realms, sorted alphabetically

---

### Activity 6.2: Find Realms by Specific Ruler Types
**Goal:** List all realms with rulers that start with "Dragon", "Demon", or "Lich"

```sql
SELECT name, ruler
FROM realms
WHERE ruler LIKE 'Dragon %' 
   OR ruler LIKE 'Demon %' 
   OR ruler LIKE 'Lich %'
ORDER BY ruler, name;
```

**Expected Result:** Realms ruled by these powerful entities

---

### Activity 6.3: Practical Pagination Example
**Goal:** Build a paginated list showing 8 realms per page, ordered by ruler name

**Page 1:**
```sql
SELECT name, ruler
FROM realms
ORDER BY ruler ASC, name ASC
LIMIT 8
OFFSET 0;
```

**Page 2:**
```sql
SELECT name, ruler
FROM realms
ORDER BY ruler ASC, name ASC
LIMIT 8
OFFSET 8;
```

**Page 3:**
```sql
SELECT name, ruler
FROM realms
ORDER BY ruler ASC, name ASC
LIMIT 8
OFFSET 16;
```

**Expected Result:** 8 realms per page, 4 pages total

---

## PART 7: Query Best Practices

### 1. Always Use ORDER BY Before LIMIT/OFFSET
```sql
-- ✅ GOOD - Results are consistent and predictable
SELECT name FROM realms 
ORDER BY name ASC 
LIMIT 10;

-- ❌ BAD - Without ORDER BY, pagination results are unpredictable
SELECT name FROM realms 
LIMIT 10;
```

### 2. Use Specific Columns Instead of SELECT *
```sql
-- ✅ GOOD - Only retrieve needed data
SELECT name, ruler FROM realms;

-- ❌ BAD - Retrieves unnecessary data
SELECT * FROM realms;
```

### 3. Use Aliases for Readability
```sql
-- ✅ GOOD - Clear column headers
SELECT name AS "Realm Name", ruler AS "Ruler" FROM realms;

-- ❌ LESS CLEAR
SELECT name, ruler FROM realms;
```

### 4. Comment Your Complex Queries
```sql
-- Retrieve all magic-related realms, sorted alphabetically, 
-- showing 10 results starting from position 10 (page 2)
SELECT name, ruler, description
FROM realms
WHERE description LIKE '%magic%'
ORDER BY name ASC
LIMIT 10
OFFSET 10;
```

---

## PART 8: Practice Challenges

### Challenge 1: Search and Sort
Create a query that finds all realms with "Forest" or "Forest" in the description, sorted by ruler name.

**Hint:** Use LIKE with OR, then ORDER BY ruler

---

### Challenge 2: Pagination Calculation
If you have 30 realms and want to display 7 realms per page:
- What LIMIT should you use? **Answer: 7**
- What OFFSET for page 3? **Answer: 14** (2 * 7 = 14)
- What OFFSET for page 4? **Answer: 21** (3 * 7 = 21)

Write the query for page 4.

---

### Challenge 3: Complex Filtering
Find all realms that:
- Have a ruler title starting with "King" or "Queen"
- AND have "ancient", "magic", or "powerful" in their description
- Order by realm name
- Show only the first 5

**Hint:** Use multiple WHERE conditions with AND/OR, combine with LIKE operators

---

### Challenge 4: Count and Limit
Write a query to:
1. Count how many realms have each unique ruler title (first word of ruler name)
2. Show only the 5 most common ruler titles
3. Order by count descending

**Hint:** Use GROUP BY, COUNT(), ORDER BY, and LIMIT together

---

## Completion Checklist

- [ ] Completed Activity 1.1 (Select all columns)
- [ ] Completed Activity 1.2 (Select specific columns)
- [ ] Completed Activity 1.3 (Column aliases)
- [ ] Completed Activity 2.1 (Filter by exact match)
- [ ] Completed Activity 2.2 (Multiple conditions with OR)
- [ ] Completed Activity 2.3 (Filter by description)
- [ ] Completed Activity 2.4 (NOT filter)
- [ ] Completed Activity 3.1 (DISTINCT ruler types)
- [ ] Completed Activity 3.2 (DISTINCT simple)
- [ ] Completed Activity 4.1 (ORDER BY ascending)
- [ ] Completed Activity 4.2 (ORDER BY descending)
- [ ] Completed Activity 4.3 (ORDER BY multiple columns)
- [ ] Completed Activity 4.4 (ORDER BY filtered results)
- [ ] Completed Activity 5.1 (LIMIT first page)
- [ ] Completed Activity 5.2 (LIMIT/OFFSET second page)
- [ ] Completed Activity 5.3 (LIMIT/OFFSET third page)
- [ ] Completed Activity 5.4 (LIMIT different page size)
- [ ] Completed Activity 5.5 (LIMIT/OFFSET with filtering)
- [ ] Completed Activity 6.1 (Complex combination)
- [ ] Completed Activity 6.2 (Specific ruler types)
- [ ] Completed Activity 6.3 (Practical pagination)
- [ ] Reviewed best practices in Part 7
- [ ] Completed at least 2 of the 4 challenges

---

## Troubleshooting

### Query Returns No Results
**Problem:** Your WHERE clause is too restrictive  
**Solution:** Check capitalization, spelling, and use LIKE with % wildcards

### Too Many Results
**Problem:** Your WHERE clause isn't specific enough  
**Solution:** Add more conditions with AND, or use more specific LIKE patterns

### Pagination Seems Wrong
**Problem:** Results aren't consistent between pages  
**Solution:** Make sure you're using ORDER BY before LIMIT/OFFSET

### Unexpected Column Order
**Problem:** SELECT * shows columns in unexpected order  
**Solution:** Explicitly list columns in the order you want them

---

## Resources

- [PostgreSQL SELECT Documentation](https://www.postgresql.org/docs/current/sql-select.html)
- [W3Schools SQL Tutorial](https://www.w3schools.com/sql/)
- [PostgreSQL LIKE Operator](https://www.postgresql.org/docs/current/functions-matching.html)
- [SQL ORDER BY Tutorial](https://www.w3schools.com/sql/sql_orderby.asp)
- [SQL LIMIT/OFFSET](https://www.postgresql.org/docs/current/sql-select.html#SQL-LIMIT)

---

## Summary

You've learned:
- ✅ How to retrieve data with SELECT
- ✅ How to filter results with WHERE
- ✅ How to find unique values with DISTINCT
- ✅ How to sort results with ORDER BY
- ✅ How to implement pagination with LIMIT and OFFSET

These foundational skills are essential for working with databases. Practice these concepts regularly, and you'll become proficient at extracting exactly the data you need from any database!
