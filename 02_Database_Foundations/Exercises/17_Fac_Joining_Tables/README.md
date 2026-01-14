# Lesson 17: Joining Tables - Facilitator Guide

## Overview

Joins are **the bread and butter of SQL**. They allow you to combine data from multiple tables based on relationships. Understanding joins is essential for working with relational databases because data is typically spread across multiple tables for efficiency and organization.

**Key Question:** How do we answer questions like "Show me all characters and the locations where they are?"

**Answer:** We use **JOINs** to combine the `characters` and `locations` tables!

---

## Why Do We Need Joins?

### The Problem with Separate Tables

In our adventure database, we have:
- **characters** table: Character names and levels
- **locations** table: Location names and descriptions
- **quests** table: Quest information
- **items** table: Item details

A character has a `location_id` that references the `locations` table, but the actual location name is stored in a different table.

```
characters table          locations table
──────────────            ───────────────
id    name  location_id   id    name
1     Aragorn    3    ─→   3     Rivendell
2     Legolas    1    ─→   1     Mirkwood
3     Gimli      2    ─→   2     Khazad-dûm
```

**Without Joins:** We'd have to query characters, then for each character, manually look up the location. That's slow and tedious!

**With Joins:** One query gets us everything!

---

## Core Concept: The Join Logic

### How Joins Work

A join matches rows from two tables based on a **join condition** (usually a foreign key relationship).

```
Step 1: Take a row from the LEFT table
Step 2: Find matching rows in the RIGHT table (based on join condition)
Step 3: Combine them into one result row
Step 4: Repeat for every row in the LEFT table
Step 5: Decide what to do with unmatched rows (depends on join type)
```

---

## The Four Types of Joins

### 1. INNER JOIN (The Most Common)

**What it does:** Returns ONLY rows where there's a match in BOTH tables.

**Visual:**
```
LEFT TABLE (characters)    RIGHT TABLE (locations)
────────────────────────   ────────────────────────
Aragorn (location_id: 3)   Rivendell (id: 3) ✓ MATCH
Legolas (location_id: 1)   Mirkwood (id: 1) ✓ MATCH
Gimli (location_id: 2)     Khazad-dûm (id: 2) ✓ MATCH
Boromir (location_id: NULL) ✗ NO MATCH - EXCLUDED

Result Rows: 3 (only matching rows)
```

**Venn Diagram:**
```
┌─────────────────────────────┐
│      LEFT TABLE             │
│    ┌──────────────┐         │
│    │ INTERSECTION │         │ RIGHT TABLE
│    │  (INCLUDED)  │         │
│    └──────────────┘         │
└─────────────────────────────┘
        ↓
   INNER JOIN results
```

**Syntax:**
```sql
SELECT c.name, l.name
FROM characters c
INNER JOIN locations l ON c.location_id = l.id;
```

**Real Example:**
```sql
-- Show characters and where they are located
SELECT 
  c.name AS character_name,
  l.name AS location_name,
  l.region
FROM characters c
INNER JOIN locations l ON c.location_id = l.id
ORDER BY c.name;
```

**Expected Result (if we had data):**
```
character_name | location_name | region
───────────────┼───────────────┼─────────
Aragorn        | Rivendell     | Elven Lands
Gimli          | Khazad-dûm    | Mountains
Legolas        | Mirkwood      | Forests
```

---

### 2. LEFT JOIN (Keep All From Left)

**What it does:** Returns ALL rows from the LEFT table, plus matching rows from the RIGHT table. If no match, the right side is NULL.

**Visual:**
```
LEFT TABLE (characters)    RIGHT TABLE (locations)
────────────────────────   ────────────────────────
Aragorn (location_id: 3)   Rivendell (id: 3) ✓ MATCH
Legolas (location_id: 1)   Mirkwood (id: 1) ✓ MATCH
Gimli (location_id: 2)     Khazad-dûm (id: 2) ✓ MATCH
Boromir (location_id: NULL) ✗ NO MATCH - INCLUDED WITH NULL VALUES

Result Rows: 4 (ALL from left, matching data from right where available)
```

**Venn Diagram:**
```
┌──────────────────────────────────────┐
│      LEFT TABLE (ALL INCLUDED)      │
│    ┌──────────────┐                 │
│    │ INTERSECTION │ RIGHT TABLE      │
│    │  (INCLUDED)  │ (ONLY MATCHES)   │
│    └──────────────┘                 │
└──────────────────────────────────────┘
        ↓
   LEFT JOIN results
```

**Syntax:**
```sql
SELECT c.name, l.name
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id;
```

**Real Example:**
```sql
-- Show ALL characters and where they are (if known)
SELECT 
  c.name AS character_name,
  c.level,
  l.name AS location_name
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
ORDER BY c.name;
```

**Expected Result:**
```
character_name | level | location_name
───────────────┼───────┼───────────────
Aragorn        |  10   | Rivendell
Boromir        |   8   | (NULL) ← No location assigned
Gimli          |  12   | Khazad-dûm
Legolas        |   9   | Mirkwood
```

**Use Case:** "Show me all characters and their locations. If a character doesn't have a location, show NULL."

---

### 3. RIGHT JOIN (Keep All From Right)

**What it does:** Returns ALL rows from the RIGHT table, plus matching rows from the LEFT table. If no match, the left side is NULL.

**Visual:**
```
LEFT TABLE (characters)    RIGHT TABLE (locations)
────────────────────────   ────────────────────────
Aragorn (location_id: 3) ─→ Rivendell (id: 3) ✓ MATCH
Legolas (location_id: 1) ─→ Mirkwood (id: 1) ✓ MATCH
Gimli (location_id: 2)  ─→ Khazad-dûm (id: 2) ✓ MATCH
                            Mordor (id: 5) ✗ NO MATCH - INCLUDED WITH NULL VALUES

Result Rows: 4 (ALL from right, matching data from left where available)
```

**Venn Diagram:**
```
┌──────────────────────────────────────┐
│ LEFT TABLE    ┌──────────────┐       │
│ (ONLY MATCHES)│ INTERSECTION │       │
│               │  (INCLUDED)  │       │
│               └──────────────┘       │
│      RIGHT TABLE (ALL INCLUDED)      │
└──────────────────────────────────────┘
        ↓
   RIGHT JOIN results
```

**Syntax:**
```sql
SELECT c.name, l.name
FROM characters c
RIGHT JOIN locations l ON c.location_id = l.id;
```

**Real Example:**
```sql
-- Show ALL locations and which characters are there (if any)
SELECT 
  l.name AS location_name,
  l.region,
  c.name AS character_name
FROM characters c
RIGHT JOIN locations l ON c.location_id = l.id
ORDER BY l.name;
```

**Expected Result:**
```
location_name  | region       | character_name
───────────────┼──────────────┼───────────────
Khazad-dûm     | Mountains    | Gimli
Mirkwood       | Forests      | Legolas
Mordor         | Dark Lands   | (NULL) ← No characters there
Rivendell      | Elven Lands  | Aragorn
```

**Use Case:** "Show me all locations and which characters are in them. If a location has no characters, show NULL."

---

### 4. FULL OUTER JOIN (Keep All From Both)

**What it does:** Returns ALL rows from BOTH tables. If there's no match, the unmatched side gets NULL.

**Visual:**
```
LEFT TABLE (characters)    RIGHT TABLE (locations)
────────────────────────   ────────────────────────
Aragorn (location_id: 3)   Rivendell (id: 3) ✓ MATCH
Legolas (location_id: 1)   Mirkwood (id: 1) ✓ MATCH
Gimli (location_id: 2)     Khazad-dûm (id: 2) ✓ MATCH
Boromir (location_id: NULL) ✗ NO MATCH - INCLUDED
                            Mordor (id: 5) ✗ NO MATCH - INCLUDED

Result Rows: 5 (ALL from both tables)
```

**Venn Diagram:**
```
┌────────────────────────────────────────┐
│ LEFT TABLE (ALL INCLUDED)              │
│    ┌──────────────┐                    │
│    │ INTERSECTION │ RIGHT TABLE        │
│    │  (INCLUDED)  │ (ALL INCLUDED)     │
│    └──────────────┘                    │
└────────────────────────────────────────┘
        ↓
   FULL OUTER JOIN results
```

**Syntax:**
```sql
SELECT c.name, l.name
FROM characters c
FULL OUTER JOIN locations l ON c.location_id = l.id;
```

**Real Example:**
```sql
-- Show ALL characters and ALL locations with matches where they exist
SELECT 
  COALESCE(c.name, 'No Character') AS character_name,
  COALESCE(l.name, 'No Location') AS location_name
FROM characters c
FULL OUTER JOIN locations l ON c.location_id = l.id
ORDER BY c.name, l.name;
```

**Expected Result:**
```
character_name  | location_name
────────────────┼───────────────
Aragorn         | Rivendell
Boromir         | (NULL)
Gimli           | Khazad-dûm
Legolas         | Mirkwood
(NULL)          | Mordor
```

**Use Case:** "Show me all characters and all locations, even if they don't match up."

---

## Quick Reference: Join Comparison

### The Venn Diagram Summary

```
INNER JOIN              LEFT JOIN              RIGHT JOIN          FULL OUTER JOIN
──────────────          ──────────             ──────────          ─────────────────
    ◯◯◯                ◯◯◯◯◯◯◯                ◯◯◯◯◯◯◯             ◯◯◯◯◯◯◯◯◯◯◯◯◯
  ◯◯◯◯◯◯◯            ◯◯◯◯◯◯◯                  ◯◯◯◯◯◯◯          ◯◯◯◯◯◯◯◯◯◯◯◯◯
 ◯ Matches ◯          ◯ Left ◯          Right ◯ ◯              ◯ Left and Right ◯
  ◯◯◯◯◯◯◯            ◯◯◯◯◯◯◯          ◯◯◯◯◯◯◯          ◯◯◯◯◯◯◯◯◯◯◯◯◯
    ◯◯◯                        ◯◯◯                ◯◯◯

Only rows that     All left rows +     All right rows +    All rows from both
appear in BOTH     matching right       matching left       tables
tables
```

### Table: Join Comparison

| Join Type | Left Table | Right Table | Description |
|-----------|-----------|------------|-------------|
| **INNER** | ✓ Matched Only | ✓ Matched Only | Only matching rows |
| **LEFT** | ✓ All Rows | ✓ Matched Only | All left, matching right |
| **RIGHT** | ✓ Matched Only | ✓ All Rows | Matching left, all right |
| **FULL OUTER** | ✓ All Rows | ✓ All Rows | Everything from both |

---

## Real-World Examples Using Adventure DB

### Example 1: INNER JOIN - Characters and Their Locations

**Question:** "Which characters are assigned to locations?"

```sql
SELECT 
  c.name AS character_name,
  c.level,
  l.name AS location_name,
  l.region
FROM characters c
INNER JOIN locations l ON c.location_id = l.id
ORDER BY l.name, c.name;
```

**This returns:** Only characters that have a location assigned

---

### Example 2: LEFT JOIN - All Characters, Show Their Locations if Known

**Question:** "Show me all characters. If they have a location, show it. Otherwise show NULL."

```sql
SELECT 
  c.name AS character_name,
  c.level,
  COALESCE(l.name, 'Unassigned') AS location_name
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
ORDER BY c.name;
```

**This returns:** All characters, with location info where available

---

### Example 3: Multiple Joins - Characters, Locations, and Quests

**Question:** "Show me characters, their locations, and available quests in those locations."

```sql
SELECT 
  c.name AS character_name,
  l.name AS location_name,
  q.title AS quest_title
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
LEFT JOIN quests q ON l.id = q.location_id
ORDER BY c.name, q.title;
```

**This shows the power of chaining joins!**

---

### Example 4: INNER JOIN with THREE Tables - Quests with Locations and Item Rewards

**Question:** "Show me quests, where they are, and what items they reward."

```sql
SELECT 
  q.title AS quest_title,
  l.name AS location_name,
  i.name AS reward_item_name,
  i.type AS item_type
FROM quests q
INNER JOIN locations l ON q.location_id = l.id
INNER JOIN items i ON q.reward_item_id = i.id
ORDER BY l.name, q.title;
```

**This returns:** Only quests that have both a location AND a reward item

---

## Common Join Mistakes and How to Avoid Them

### Mistake 1: Wrong Join Condition

❌ **Wrong:**
```sql
SELECT c.name, l.name
FROM characters c
INNER JOIN locations l ON c.id = l.id;  -- Comparing wrong columns!
```

✅ **Correct:**
```sql
SELECT c.name, l.name
FROM characters c
INNER JOIN locations l ON c.location_id = l.id;  -- Use the foreign key!
```

### Mistake 2: Forgetting to Qualify Column Names

❌ **Wrong:**
```sql
SELECT name  -- Which table's name? Ambiguous!
FROM characters c
INNER JOIN locations l ON c.location_id = l.id;
```

✅ **Correct:**
```sql
SELECT c.name AS character_name, l.name AS location_name
FROM characters c
INNER JOIN locations l ON c.location_id = l.id;
```

### Mistake 3: Not Understanding NULL with LEFT/RIGHT/FULL JOINS

❌ **Wrong assumption:** "This character has no location, so the location row will have some default value."

✅ **Correct:** "The location fields will be NULL if there's no match."

---

## Teaching Tips

### Tip 1: Use Real-World Analogies

**INNER JOIN** = "Finding people who went to both parties"
- If you went to Party A and Party B, you're in the list
- If you only went to one party, you're not on the list

**LEFT JOIN** = "Starting with a guest list (left), then adding info about their plus-ones (right)"
- Everyone on the guest list is included
- If someone didn't bring a plus-one, that column is empty

**RIGHT JOIN** = "Starting with available seats (right), then seeing who's sitting (left)"
- All seats are listed
- If a seat is empty, the person column is empty

**FULL OUTER JOIN** = "A complete directory of all people and all events"
- Everyone appears, whether they came to events or not
- All events appear, whether people came or not

### Tip 2: Start with INNER JOIN

Students understand INNER JOIN most easily because:
- It only returns rows that definitely match
- No NULL values (usually)
- Simpler to visualize

### Tip 3: Use Visual Diagrams

Always show:
- The two tables with sample data
- The join condition with arrows
- The result set

### Tip 4: Have Students Predict Results

Before running a query, ask students: "How many rows will this return?" and "Will there be NULLs?"

This forces them to think through the logic.

### Tip 5: Emphasize the JOIN Condition

The `ON` clause is **crucial**. It tells PostgreSQL which columns to match.

```
Correct: ON c.location_id = l.id
Wrong:   ON c.id = l.id
```

---

## Key Concepts Summary

**JOIN:** Combines rows from multiple tables based on a condition

**INNER JOIN:** Only matching rows from both tables

**LEFT JOIN:** All rows from left table, matching rows from right table

**RIGHT JOIN:** Matching rows from left table, all rows from right table

**FULL OUTER JOIN:** All rows from both tables

**JOIN Condition:** The `ON` clause that specifies how to match rows (usually a foreign key relationship)

**NULL Values:** LEFT, RIGHT, and FULL OUTER JOINs produce NULLs when there's no match

---

## Demonstration Script

Here's a complete script you can run to demonstrate all join types:

```sql
-- Connect to adventure database
\c adventure

-- Show the base data (characters and locations)
SELECT 'CHARACTERS:' AS section;
SELECT id, name, level, location_id FROM characters;

SELECT 'LOCATIONS:' AS section;
SELECT id, name, region FROM locations;

-- INNER JOIN Demo
SELECT 'INNER JOIN (Only matches):' AS section;
SELECT c.name, c.level, l.name, l.region
FROM characters c
INNER JOIN locations l ON c.location_id = l.id
ORDER BY c.name;

-- LEFT JOIN Demo
SELECT 'LEFT JOIN (All characters):' AS section;
SELECT c.name, c.level, l.name, l.region
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
ORDER BY c.name;

-- RIGHT JOIN Demo
SELECT 'RIGHT JOIN (All locations):' AS section;
SELECT c.name, l.name, l.region
FROM characters c
RIGHT JOIN locations l ON c.location_id = l.id
ORDER BY l.name;

-- FULL OUTER JOIN Demo
SELECT 'FULL OUTER JOIN (All from both):' AS section;
SELECT COALESCE(c.name, 'No Character'), COALESCE(l.name, 'No Location'), l.region
FROM characters c
FULL OUTER JOIN locations l ON c.location_id = l.id
ORDER BY COALESCE(c.name, 'zzz');
```

---

## Assessment Questions

**Basic Understanding:**
1. What is a JOIN and why do we use them?
2. What's the difference between INNER and LEFT JOIN?
3. What does the `ON` clause do in a JOIN?

**Intermediate:**
4. Write a query showing all characters and their locations (if assigned), using LEFT JOIN
5. Write a query that returns only locations that have characters in them
6. How many rows would an INNER JOIN return if the left table has 10 rows and the right table has 20 rows? (Answer: Depends on how many match, 0-10)

**Advanced:**
7. Write a query with THREE joins (characters → locations → quests)
8. What's the difference between these two results and why?
   - LEFT JOIN result: 15 rows
   - INNER JOIN result: 12 rows
   (Answer: 3 rows in the left table don't have matches)
9. When would you use FULL OUTER JOIN in a real-world scenario?

---

## Common Questions Students Ask

**Q: Why not just put the location name in the characters table?**  
A: Because then the location name would be repeated for every character in that location, wasting space and making updates hard. (Normalization!)

**Q: Can I JOIN the same table to itself?**  
A: Yes! This is called a SELF JOIN. Example: "Show me characters and their friends" (if characters had a friend_id column).

**Q: Can I use JOINs with non-key columns?**  
A: Yes! The `ON` clause can use any columns. Example: `ON c.region = l.region` would match by region name instead of ID.

**Q: What's the performance difference between join types?**  
A: INNER JOIN is usually fastest because it filters rows early. LEFT/RIGHT/FULL are slower because they must keep all rows.

---

## Next Steps

After students master joins, they should learn:
- **Lesson 18:** Normalization - Designing databases to minimize data redundancy
- **Lesson 19:** Subqueries - Using queries as data sources for other queries
- **Lesson 20:** Aggregation with JOINs - GROUP BY and COUNT with joined tables

---

## Resources

- [PostgreSQL JOIN Documentation](https://www.postgresql.org/docs/current/queries-table-expressions.html#QUERIES-JOIN)
- [SQL Joins Visualizer](https://sql-joins.leopard.in.ua/)
- [Khan Academy - SQL Joins](https://www.khanacademy.org/computing/computer-programming/sql)
- [Mode Analytics SQL Tutorial - Joins](https://mode.com/sql-tutorial/sql-joins/)

