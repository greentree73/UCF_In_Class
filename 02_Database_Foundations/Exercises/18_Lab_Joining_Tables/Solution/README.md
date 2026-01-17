# Lab 18: Joining Tables Activity

## Overview

In this lab, you'll learn to write **INNER JOIN** and **LEFT JOIN** queries using the `knights_realm` database. You'll combine data from multiple tables to answer real-world questions about knights, realms, and quests.

**Database:** `knights_realm`  
**Tables:** `realms`, `knights`, `quests`  
**Time:** 20-25 minutes

**Learning Objectives:**
- Understand how INNER JOINs combine data from two tables
- Understand how LEFT JOINs keep all rows from the left table
- Write queries that combine data from multiple tables
- Answer complex questions that span multiple tables
- Understand when to use each join type

---

## Part 1: Understanding Your Data

### The Table Relationships

```
┌──────────────────────────┐
│      REALMS              │
│ (Parent Table)           │
├──────────────────────────┤
│ realm_id (PRIMARY KEY)   │
│ name               │
│ ruler                    │
│ is_magical               │
└────────────┬─────────────┘
             │
             │ realm_id (FK)
             │
    ┌────────┴────────────┬─────────────────┐
    │                     │                 │
    ▼                     ▼                 ▼
┌─────────────┐    ┌──────────────┐   ┌──────────────┐
│   KNIGHTS   │    │    QUESTS    │   │   (More...)  │
├─────────────┤    ├──────────────┤   └──────────────┘
│ knight_id   │    │ quest_id     │
│ name        │    │ name   │
│ realm_id(FK)│    │ realm_id(FK) │
│ class       │    │ difficulty   │
└─────────────┘    └──────────────┘
```

### Sample Data in Your Database

**REALMS:**
- 1: The Northern Kingdom (King Harald Ironclad)
- 2: The Emerald Dominion (Queen Aldara of the Mists)
- 3: The Crimson Duchy (Duke Marcus Redstone)

**KNIGHTS:**
- Sir Aldous the Brave (realm_id: 1)
- Lady Elowen Starlight (realm_id: 2)
- Sir Garrett the Silent (realm_id: 1)
- Sir Marcus Redstone Jr. (realm_id: 3)

**QUESTS:**
- Collect Northern Herbs (realm_id: 1)
- Defeat the Ice Troll (realm_id: 1)
- Retrieve Lost Amulet (realm_id: 2)
- And more...

---

## Part 2: INNER JOIN - Getting Started

### What is an INNER JOIN?

An **INNER JOIN** combines rows from two tables where there's a match based on your join condition. It returns ONLY the matching rows—if there's no match, the row is excluded.

### Concept Diagram

```
KNIGHTS Table                REALMS Table
(Left Table)                 (Right Table)
────────────────────────     ────────────────────
Sir Aldous (realm_id: 1) ──→ The Northern Kingdom (id: 1) ✓ MATCH → INCLUDED
Lady Elowen (realm_id: 2) ──→ The Emerald Dominion (id: 2) ✓ MATCH → INCLUDED
Sir Garrett (realm_id: 1) ──→ The Northern Kingdom (id: 1) ✓ MATCH → INCLUDED
Sir Marcus (realm_id: 3) ──→ The Crimson Duchy (id: 3) ✓ MATCH → INCLUDED

All knights have a realm, so all rows match!
Result: 4 rows with knight names paired with realm names
```

### Basic Syntax

```sql
SELECT column1, column2, ...
FROM table1 t1
INNER JOIN table2 t2 ON t1.foreign_key = t2.primary_key
ORDER BY column_name;
```

### Your Task 1: Write Your First INNER JOIN

**Question:** "Show me all knights and the realm they belong to."

Fill in the blanks:

```sql
-- TODO: Connect to knights_realm database
\c knights_realm

-- TODO: Write an INNER JOIN to show knights and their realms
-- Use: SELECT, FROM knights, INNER JOIN realms
-- Join condition: knights.realm_id = realms.id
-- Select: name as knight_name, name as realm_name

SELECT
  k.name as Knight_name,
  k.title,
  r.name as Realm_name      
FROM knights k
INNER JOIN realms r ON k.realm_id = r.id
ORDER BY r.name, k.name;
```

**Expected Result Format:**
```
knight_name             | title   | realm_name
────────────────────────┼─────────┼──────────────────────
Sir Aldous the Brave    | warrior | The Northern Kingdom
Sir Garrett the Silent  | rogue   | The Northern Kingdom
Lady Elowen Starlight   | mage    | The Emerald Dominion
Sir Marcus Redstone Jr. | paladin | The Crimson Duchy
```

**Expected Rows:** 4

---

### Your Task 2: INNER JOIN with Quests

**Question:** "Show me all quests and which realm they're in, sorted by realm name."

```sql
-- TODO: Write an INNER JOIN to show quests and their realms
-- Tables: quests and realms
-- Join condition: quests.realm_id = realms.realm_id
-- Select: name, name, difficulty

SELECT
  q.name as quest_name,
  q.reward,
  q.is_complete,
  r.name as realm_name 
FROM quests q
INNER JOIN realms r ON q.realm_id = r.id
ORDER BY r.name, q.name;
```

**Expected Result Format:**
```
       quest_name        | reward | is_complete | realm_name 
-------------------------+--------+-------------+------------
 Rescue the Villagers    |    200 | f           | Ironmarch
 Retrieve the Iron Crown |    500 | f           | Ironmarch
```

**Your Turn:** Write the query and run it. How many rows did you get?

---

### Your Task 3: Multiple INNER JOINs (Chaining)

**Question:** "Show me knights and the quests available in their realm."

**Concept:**
```
Knights ──→ Realms ──→ Quests
         (JOIN)    (JOIN)
```

When you have multiple joins, you chain them:

```sql
-- TODO: Write nested INNER JOINs
-- Start with knights table
-- JOIN to realms (on realm_id)
-- JOIN to quests (on realm_id)
-- Select: name, name, name

SELECT
  k.name,
  r.name,
  q.name,
  q.difficulty
FROM knights k
INNER JOIN realms r ON k.realm_id = r.realm_id
INNER JOIN quests q ON r.realm_id = q.realm_id
ORDER BY k.name, q.name;
```

**Expected Result Format:**
```
name            | name              | name             | difficulty
──────────────────────┼─────────────────────────┼────────────────────────┼────────────
Sir Aldous the Brave  | The Northern Kingdom    | Collect Northern Herbs | medium
Sir Aldous the Brave  | The Northern Kingdom    | Defeat the Ice Troll   | hard
Sir Garrett the Silent| The Northern Kingdom    | Collect Northern Herbs | medium
Sir Garrett the Silent| The Northern Kingdom    | Defeat the Ice Troll   | hard
Lady Elowen Starlight | The Emerald Dominion    | Retrieve Lost Amulet   | hard
... and more
```

**Your Turn:** Write this query. How many rows did you get? Why might there be duplicate knight names?

---

## Part 3: LEFT JOIN - When You Want to Keep All Rows

### What is a LEFT JOIN?

A **LEFT JOIN** returns ALL rows from the left table, plus matching rows from the right table. If there's no match, the right table's columns are NULL.

**Key Difference from INNER JOIN:**
```
INNER JOIN: 4 knights → 4 results (all matched)
LEFT JOIN:  4 knights → 4+ results (ALL included, match or not)
```

### Concept Diagram

```
KNIGHTS Table (Left)         REALMS Table (Right)
────────────────────────     ────────────────────
Sir Aldous (realm_id: 1)  ──→ The Northern Kingdom (id: 1) ✓ MATCH
Lady Elowen (realm_id: 2) ──→ The Emerald Dominion (id: 2) ✓ MATCH
Sir Garrett (realm_id: 1) ──→ The Northern Kingdom (id: 1) ✓ MATCH
Sir Marcus (realm_id: 3)  ──→ The Crimson Duchy (id: 3) ✓ MATCH

With LEFT JOIN: ALL knights included (whether they match or not)
With INNER JOIN: Only knights that match

In this case: Same result (all 4) because all knights have realms
```

### When LEFT JOIN Differs from INNER JOIN

Imagine if we had a knight with `realm_id = NULL`:

```
INNER JOIN Result:
name            | name
──────────────────────┼──────────────────────
Sir Aldous the Brave  | The Northern Kingdom
Sir Garrett the Silent | The Northern Kingdom
Lady Elowen Starlight  | The Emerald Dominion
Sir Marcus Redstone Jr.| The Crimson Duchy
(4 rows - unassigned knight NOT included)

LEFT JOIN Result:
name             | name
───────────────────────┼─────────────────────
Sir Aldous the Brave   | The Northern Kingdom
Sir Garrett the Silent | The Northern Kingdom
Lady Elowen Starlight  | The Emerald Dominion
Sir Marcus Redstone Jr.| The Crimson Duchy
Unknown Knight         | (NULL) ← Included but realm is NULL
(5 rows - unassigned knight IS included)
```

### Your Task 4: LEFT JOIN - Show All Realms and Their Knights

**Question:** "Show me all realms and which knights are in each realm. Include realms with no knights."

```sql
-- TODO: Write a LEFT JOIN to show realms and knights
-- Left table: realms (we want ALL realms)
-- Right table: knights (only matching knights)
-- Join condition: realms.realm_id = knights.realm_id
-- Select: name, name

SELECT
  r.name,
  r.ruler,
  k.name,
  k.class
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
ORDER BY r.name, k.name;
```

**Expected Result Format:**
```
name               | ruler                     | name            | class
─────────────────────────┼───────────────────────────┼────────────────────────┼────────
The Crimson Duchy       | Duke Marcus Redstone      | Sir Marcus Redstone Jr.| paladin
The Emerald Dominion    | Queen Aldara of the Mists | Lady Elowen Starlight  | mage
The Northern Kingdom    | King Harald Ironclad      | Sir Aldous the Brave   | warrior
The Northern Kingdom    | King Harald Ironclad      | Sir Garrett the Silent | rogue
```

**Your Turn:** Run this query. How many rows do you get? Are there any NULL values?

---

### Your Task 5: LEFT JOIN - Find Unmatched Data

**Question:** "Show me all realms and count how many knights are in each realm."

This is useful for finding realms with NO knights (count = 0).

```sql
-- TODO: Write a LEFT JOIN with COUNT
-- This shows data at the realm level
-- Select: name, COUNT of knights

SELECT
  r.name,
  r.ruler,
  COUNT(k.knight_id) as knight_count
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
GROUP BY r.realm_id, r.name, r.ruler
ORDER BY knight_count DESC, r.name;
```

**Expected Result Format:**
```
name               | ruler                     | knight_count
─────────────────────────┼───────────────────────────┼──────────────
The Northern Kingdom    | King Harald Ironclad      | 2
The Emerald Dominion    | Queen Aldara of the Mists | 1
The Crimson Duchy       | Duke Marcus Redstone      | 1
```

**Why is this important?**
- Identifies realms with no knights (0 count)
- Shows data imbalance
- Useful for understanding your data structure

---

### Your Task 6: LEFT JOIN with Multiple Tables

**Question:** "Show me all realms, their knights, and available quests in each realm."

```sql
-- TODO: Write a LEFT JOIN with multiple tables
-- Left table: realms (we want ALL realms)
-- Join 1: realms to knights
-- Join 2: realms to quests
-- Select: name, name, name

SELECT
  r.name,
  k.name,
  q.name,
  q.difficulty
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
LEFT JOIN quests q ON r.realm_id = q.realm_id
ORDER BY r.name, k.name, q.name;
```

**Expected Result Format:**
```
name              | name            | name           | difficulty
────────────────────────┼────────────────────────┼──────────────────────┼────────────
The Crimson Duchy       | Sir Marcus Redstone Jr.| Mine Dragon Gold     | legendary
The Emerald Dominion    | Lady Elowen Starlight  | Protect the Grove    | medium
The Emerald Dominion    | Lady Elowen Starlight  | Retrieve Lost Amulet | hard
The Northern Kingdom    | Sir Aldous the Brave   | Collect Northern Herbs| medium
... and more
```

**Your Turn:** Run this query. Notice how the number of rows increases because you're joining THREE tables!

---

## Part 4: Comparing INNER vs LEFT JOIN

### Side-by-Side Comparison

**Same tables, different join types:**

#### INNER JOIN (Only Matches)

```sql
SELECT
  r.name,
  k.name
FROM realms r
INNER JOIN knights k ON r.realm_id = k.realm_id
ORDER BY r.name;
```

Result: 4 rows (only realms that have knights)

#### LEFT JOIN (All From Left)

```sql
SELECT
  r.name,
  k.name
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
ORDER BY r.name;
```

Result: 4+ rows (ALL realms, even ones without knights)

### Your Task 7: Find the Difference

**Question:** "Are there any realms with NO knights?"

Run both queries above and compare:
- INNER JOIN result count: ____
- LEFT JOIN result count: ____
- Difference: ____

If LEFT JOIN returns more rows than INNER JOIN, there are unassigned records!

---

## Part 5: Real-World Queries

### Task 8: "Give Me a Team Report"

**Question:** "Create a report showing each realm, its ruler, and all knights in a readable format."

```sql
-- TODO: Create a LEFT JOIN report
-- Show realm info + all knights in that realm

SELECT
  r.name,
  r.ruler,
  r.is_magical,
  k.name,
  k.class,
  k.level
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
ORDER BY r.name, k.name;
```

**Use Case:** This is how you'd generate a report for a manager who wants to see all realms and their staffing.

---

### Task 9: "Show Me Quest Availability"

**Question:** "For each realm, how many quests are available?"

```sql
-- TODO: Use LEFT JOIN with GROUP BY to count quests per realm

SELECT
  r.name,
  r.ruler,
  COUNT(q.quest_id) as available_quests,
  COALESCE(STRING_AGG(q.name, ', '), 'No quests') as quest_list
FROM realms r
LEFT JOIN quests q ON r.realm_id = q.realm_id
GROUP BY r.realm_id, r.name, r.ruler
ORDER BY available_quests DESC, r.name;
```

**Use Case:** Find which realms need more quests (count = 0).

---

### Task 10: "Show Me Knight Assignments"

**Question:** "Create a list of all knights with their realm and the quests they could undertake."

```sql
-- TODO: Use INNER JOINs to connect knight → realm → quests

SELECT
  k.name,
  k.class,
  k.level,
  r.name,
  q.name,
  q.difficulty,
  CASE
    WHEN q.difficulty = 'easy' THEN 'Suitable'
    WHEN q.difficulty = 'medium' AND k.level >= 3 THEN 'Suitable'
    WHEN q.difficulty = 'hard' AND k.level >= 5 THEN 'Suitable'
    WHEN q.difficulty = 'legendary' AND k.level >= 8 THEN 'Suitable'
    ELSE 'Too Difficult'
  END as quest_suitability
FROM knights k
INNER JOIN realms r ON k.realm_id = r.realm_id
INNER JOIN quests q ON r.realm_id = q.realm_id
ORDER BY k.name, q.difficulty;
```

**Use Case:** Matching knights to quests based on their skill level!

---

## Part 6: Challenge Exercises

### Challenge 1: Find Missing Data

**Write a query that shows:**
- All realms
- Count of knights in each realm
- Count of quests in each realm
- Which realms have knights BUT no quests?

```sql
-- TODO: Write this query yourself!
-- Hint: Use LEFT JOINs and GROUP BY
-- Start with realms table (left)
```

### Challenge 2: Create a Realm Summary

**Write a query that shows (for each realm):**
- Realm name
- Ruler name
- Is it magical? (yes/no)
- Total knights
- Total quests available
- List of all knight names

```sql
-- TODO: Advanced LEFT JOINs with aggregation
-- Hint: Use STRING_AGG() to combine knight names
```

### Challenge 3: Multi-Table Join Analysis

**Write a query showing:**
- Each quest
- The realm it's in
- How many knights are available to take it
- The difficulty level

```sql
-- TODO: Use multiple LEFT JOINs
-- Start with quests, then realms, then count knights per quest location
```

---

## Completion Checklist

✓ **INNER JOIN Mastery:**
- [ ] Completed Task 1 (Knights and Realms)
- [ ] Completed Task 2 (Quests and Realms)
- [ ] Completed Task 3 (Multiple JOINs)
- [ ] Can explain when to use INNER JOIN

✓ **LEFT JOIN Mastery:**
- [ ] Completed Task 4 (Realms and Knights)
- [ ] Completed Task 5 (Count by Realm)
- [ ] Completed Task 6 (Multiple Realms, Knights, Quests)
- [ ] Can explain when to use LEFT JOIN

✓ **Real-World Applications:**
- [ ] Completed Task 8 (Team Report)
- [ ] Completed Task 9 (Quest Availability)
- [ ] Completed Task 10 (Knight Assignments)

✓ **Challenge Problems:**
- [ ] Challenge 1 Complete
- [ ] Challenge 2 Complete
- [ ] Challenge 3 Complete

---

## Key Concepts Review

### INNER JOIN
- Returns **only matching rows** from both tables
- Use when you want to combine data and only see where matches exist
- Example: "Show knights with their realm" (if all knights have a realm)

### LEFT JOIN
- Returns **all rows from left table**, plus matching rows from right
- Use when you want to keep all data from the left table even if there's no match
- Example: "Show all realms, and any knights in them" (even realms with no knights)

### JOIN CONDITION (ON clause)
- Specifies which columns to match
- Usually compares a foreign key to a primary key
- Example: `ON knights.realm_id = realms.realm_id`

### Table ALIASES
- Use short names to reference tables: `FROM realms r`
- Makes queries shorter: `r.name` instead of `realms.name`

### ORDER BY with JOINs
- Can sort by columns from either table
- Helps organize results logically

---

## Troubleshooting

### Problem: "Column name is ambiguous"
```
Error: column "name" is ambiguous
```
**Solution:** Specify which table with the alias:
```sql
-- Wrong: SELECT name FROM realms r JOIN knights k...
-- Right: SELECT r.name, k.name FROM realms r JOIN knights k...
```

### Problem: "No rows returned from INNER JOIN"
```sql
-- You wrote INNER JOIN but got 0 rows
```
**Solutions:**
1. Check if the data actually exists: `SELECT * FROM realms;`
2. Check the join condition: Is it really matching? Try both columns separately
3. Check for NULL values: `WHERE realm_id IS NOT NULL`

### Problem: "Too many rows returned"
```sql
-- LEFT JOIN with multiple joins is returning duplicate rows
```
**Explanation:** When joining 3+ tables, you can get a Cartesian product
**Solution:** Use GROUP BY to aggregate, or add more specific WHERE conditions

### Problem: "NULL values appearing unexpectedly"
```sql
-- In a LEFT JOIN, right table columns showing NULL
```
**This is correct!** NULLs mean "no match found"
**Use:** `COALESCE(column, 'default value')` to replace NULLs

---

## Resources

- [PostgreSQL JOIN Documentation](https://www.postgresql.org/docs/current/tutorial-join.html)
- [SQL Joins Visualizer](https://sql-joins.leopard.in.ua/)
- [Mode Analytics JOIN Tutorial](https://mode.com/sql-tutorial/sql-joins/)

---

## Next Steps

After mastering JOINs, you're ready for:
- **Lesson 19:** Subqueries - Using queries as data sources
- **Lesson 20:** Aggregation with JOINs - GROUP BY and aggregate functions
- **Lesson 21:** Complex Queries - Combining everything you've learned

