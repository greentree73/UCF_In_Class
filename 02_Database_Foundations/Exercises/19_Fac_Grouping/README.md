# Lesson 19: Aggregations & Grouping - Facilitator Guide

## Overview

After mastering JOINs, the next essential SQL skill is **aggregation and grouping**. These techniques let you summarize data, answer reporting questions, and derive insights from raw data.

**Key Questions Aggregations Answer:**
- "How many characters are there in total?"
- "What's the average level of all characters?"
- "How many characters are in each location?"
- "Which location has the most characters?"
- "What's the total value of all items?"

**Without Aggregation:** Manual counting and calculations  
**With Aggregation:** One SQL query gives you the answer!

---

## Why Aggregation Matters

### The Problem: Raw Data vs. Insights

Imagine you have 10,000 character records. A manager asks:
- "How many characters do we have?" → You need COUNT
- "What's the average level?" → You need AVG
- "How many per location?" → You need COUNT with GROUP BY
- "Which locations have 50+ characters?" → You need GROUP BY with HAVING

**Without aggregation:** You'd have to manually count, calculate averages, etc.  
**With aggregation:** SQL does it all in one query!

### Real-World Example

```
RAW DATA (characters table):
id  | name        | level | location_id
────┼─────────────┼───────┼─────────────
1   | Aragorn     | 10    | 3
2   | Legolas     | 9     | 1
3   | Gimli       | 12    | 2
4   | Boromir     | 8     | 3
5   | Frodo       | 5     | 3
... | ...         | ...   | ...

AGGREGATED INSIGHTS:
Total Characters: 1000
Average Level: 7.5
Characters per Location: {1: 234, 2: 156, 3: 312, ...}
Highest Level: 20
Lowest Level: 1
```

---

## Part 1: Aggregate Functions (The Basics)

### What is an Aggregate Function?

An **aggregate function** takes multiple rows of data and combines them into a single result.

```
Input: Multiple rows
   ↓
Aggregate Function
   ↓
Output: Single value
```

### The Big Four Aggregate Functions

#### 1. COUNT() - Count Rows

**What it does:** Counts how many rows match your criteria.

**Syntax:**
```sql
SELECT COUNT(*) FROM table_name;           -- Count all rows
SELECT COUNT(column_name) FROM table_name; -- Count non-NULL values in column
```

**Examples:**

```sql
-- How many total characters?
SELECT COUNT(*) as total_characters
FROM characters;

Result: 
total_characters
─────────────────
30
```

```sql
-- How many characters have a location assigned?
SELECT COUNT(location_id) as characters_with_location
FROM characters;

Result:
characters_with_location
────────────────────────
28
(2 characters have NULL location_id)
```

**Visual Explanation:**
```
Characters Table
─────────────────────────────
Aragorn   ✓ COUNTED
Legolas   ✓ COUNTED
Gimli     ✓ COUNTED
Boromir   ✓ COUNTED
...
(30 total rows)

COUNT(*) = 30
```

---

#### 2. SUM() - Sum Values

**What it does:** Adds up all values in a column (for numeric columns only).

**Syntax:**
```sql
SELECT SUM(column_name) FROM table_name;
```

**Examples:**

```sql
-- What's the total value of all items?
SELECT SUM(value) as total_inventory_value
FROM items;

Result:
total_inventory_value
──────────────────────
15750
(All item values added together)
```

```sql
-- What's the combined value of rare items?
SELECT SUM(value) as rare_item_value
FROM items
WHERE rarity = 'rare';

Result:
rare_item_value
────────────────
3200
```

**Visual Explanation:**
```
Items with Values:
Sword       → 100
Shield      → 150
Armor       → 200
Helmet      → 50
...

SUM(value) = 100 + 150 + 200 + 50 + ... = 15750
```

---

#### 3. AVG() - Average Value

**What it does:** Calculates the mean (average) of all values in a column.

**Syntax:**
```sql
SELECT AVG(column_name) FROM table_name;
```

**Examples:**

```sql
-- What's the average character level?
SELECT AVG(level) as average_level
FROM characters;

Result:
average_level
────────────────
7.85
```

```sql
-- What's the average item value?
SELECT AVG(value) as average_item_value
FROM items;

Result:
average_item_value
───────────────────
525.33
```

**Visual Explanation:**
```
Character Levels: 5, 8, 10, 9, 12, 6, 8, 7
Sum: 5 + 8 + 10 + 9 + 12 + 6 + 8 + 7 = 65
Count: 8
Average: 65 / 8 = 8.125
```

---

#### 4. MAX() and MIN() - Extremes

**What they do:** Find the largest and smallest values.

**Syntax:**
```sql
SELECT MAX(column_name), MIN(column_name) FROM table_name;
```

**Examples:**

```sql
-- What's the strongest and weakest character?
SELECT 
  MAX(level) as highest_level,
  MIN(level) as lowest_level
FROM characters;

Result:
highest_level | lowest_level
───────────── | ────────────
20            | 1
```

```sql
-- Most and least valuable items?
SELECT 
  MAX(value) as most_valuable_item,
  MIN(value) as least_valuable_item
FROM items;

Result:
most_valuable_item | least_valuable_item
──────────────────┼────────────────────
1500              | 10
```

---

### Your Task 1: Basic Aggregation Queries

Write queries that answer:

1. **"How many locations are there?"**
```sql
SELECT COUNT(*) as total_locations
FROM locations;
```

2. **"How many quests are there in total?"**
```sql
SELECT COUNT(*) as total_quests
FROM quests;
```

3. **"What's the average reward for a quest?"**
```sql
SELECT AVG(reward_gold) as average_reward
FROM quests;
```

4. **"What's the highest reward offered?"**
```sql
SELECT MAX(reward_gold) as highest_reward
FROM quests;
```

5. **"What's the total possible gold from all quests?"**
```sql
SELECT SUM(reward_gold) as total_possible_gold
FROM quests;
```

---

## Part 2: GROUP BY - The Real Power

### What is GROUP BY?

**GROUP BY** divides your rows into groups based on column values, then applies aggregate functions to each group.

```
BEFORE GROUP BY (Raw Data):
character_id | name      | location_id
──────────────┼───────────┼─────────────
1             | Aragorn   | 1
2             | Legolas   | 1
3             | Gimli     | 2
4             | Boromir   | 1

AFTER GROUP BY location_id:
location_id | group
─────────────┼──────────────────────────
1            | {Aragorn, Legolas, Boromir}
2            | {Gimli}

Then apply COUNT():
location_id | character_count
─────────────┼─────────────────
1            | 3
2            | 1
```

### Basic GROUP BY Syntax

```sql
SELECT 
  column_to_group_by,
  AGGREGATE_FUNCTION(column)
FROM table_name
GROUP BY column_to_group_by
ORDER BY aggregate_result DESC;
```

### Example: Characters by Location

**Question:** "How many characters are in each location?"

```sql
SELECT 
  l.name as location_name,
  COUNT(c.id) as character_count
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.id, l.name
ORDER BY character_count DESC;
```

**Visual Process:**

```
Step 1: LEFT JOIN characters with locations
───────────────────────────────────────────
Aragorn    | Rivendell
Legolas    | Mirkwood
Gimli      | Khazad-dûm
Boromir    | Rivendell
...

Step 2: GROUP BY location_name
──────────────────────────────
Rivendell: {Aragorn, Boromir}
Mirkwood: {Legolas}
Khazad-dûm: {Gimli}
...

Step 3: Apply COUNT() to each group
────────────────────────────────────
Rivendell: 2
Mirkwood: 1
Khazad-dûm: 1
...

Result:
location_name  | character_count
───────────────┼─────────────────
Rivendell      | 2
Khazad-dûm     | 1
Mirkwood       | 1
```

**Result:**
```
location_name  | character_count
───────────────┼─────────────────
Rivendell      | 2
Mirkwood       | 1
Khazad-dûm     | 1
Mordor         | 0
```

---

### GROUP BY with Multiple Aggregates

**Question:** "For each location, show how many characters, average level, and highest level."

```sql
SELECT 
  l.name as location_name,
  COUNT(c.id) as total_characters,
  AVG(c.level) as average_level,
  MAX(c.level) as highest_level,
  MIN(c.level) as lowest_level
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.id, l.name
ORDER BY total_characters DESC;
```

**Result:**
```
location_name  | total_characters | average_level | highest_level | lowest_level
───────────────┼──────────────────┼───────────────┼───────────────┼──────────────
Rivendell      | 2                | 9.0           | 10            | 8
Mirkwood       | 1                | 9              | 9             | 9
Khazad-dûm     | 1                | 12             | 12            | 12
Mordor         | 0                | (NULL)        | (NULL)        | (NULL)
```

---

### GROUP BY with JOINs

**Question:** "For each quest, how many characters could complete it (by location)?"

```sql
SELECT 
  q.title as quest_title,
  l.name as location_name,
  COUNT(c.id) as available_characters
FROM quests q
INNER JOIN locations l ON q.location_id = l.id
LEFT JOIN characters c ON l.id = c.location_id
GROUP BY q.id, q.title, l.id, l.name
ORDER BY q.title;
```

**Result:**
```
quest_title          | location_name | available_characters
──────────────────────┼───────────────┼──────────────────────
Collect Northern Herbs| Rivendell     | 2
Defeat the Ice Troll | Rivendell     | 2
Retrieve Lost Amulet | Mirkwood      | 1
Protect the Grove   | Khazad-dûm    | 1
Mine Dragon Gold    | Mordor        | 0
```

---

### Your Task 2: GROUP BY Queries

Write queries that answer:

1. **"How many quests are in each location?"**
```sql
SELECT 
  l.name as location_name,
  COUNT(q.id) as quest_count
FROM quests q
INNER JOIN locations l ON q.location_id = l.id
GROUP BY l.id, l.name
ORDER BY quest_count DESC;
```

2. **"What's the average quest reward by location?"**
```sql
SELECT 
  l.name as location_name,
  COUNT(q.id) as total_quests,
  AVG(q.reward_gold) as average_reward
FROM quests q
INNER JOIN locations l ON q.location_id = l.id
GROUP BY l.id, l.name
ORDER BY average_reward DESC;
```

3. **"How many items of each type do we have?"**
```sql
SELECT 
  type as item_type,
  COUNT(*) as item_count,
  AVG(value) as average_value,
  SUM(value) as total_value
FROM items
GROUP BY type
ORDER BY item_count DESC;
```

---

## Part 3: HAVING - Filter Your Groups

### What is HAVING?

**HAVING** is like **WHERE**, but for grouped data. It filters groups AFTER aggregation.

```
WHERE filters BEFORE grouping (rows)
HAVING filters AFTER grouping (groups)
```

### Why Not Just Use WHERE?

**The Problem:**
```sql
-- This WON'T work:
SELECT 
  l.name,
  COUNT(c.id) as character_count
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.name
WHERE COUNT(c.id) > 2;  -- ❌ ERROR: Can't use aggregate in WHERE

-- Result: ERROR - aggregates cannot appear in WHERE clause
```

**The Solution: Use HAVING**
```sql
-- This WORKS:
SELECT 
  l.name,
  COUNT(c.id) as character_count
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.name
HAVING COUNT(c.id) > 2;  -- ✓ Correct: aggregate in HAVING

-- Result: Only locations with MORE than 2 characters
```

### HAVING vs WHERE Comparison

```
┌─────────────┐
│ Raw Data    │
└──────┬──────┘
       │
       ▼
  [WHERE filters rows]
       │
       ▼
  [GROUP BY groups data]
       │
       ▼
 [Apply aggregates]
       │
       ▼
  [HAVING filters groups] ←── Only groups matching condition
       │
       ▼
  [Result]
```

### Example: HAVING in Action

**Question:** "Which locations have MORE than 1 character?"

```sql
SELECT 
  l.name as location_name,
  COUNT(c.id) as character_count
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.id, l.name
HAVING COUNT(c.id) > 1
ORDER BY character_count DESC;
```

**Visual Process:**

```
Step 1: GROUP BY location
──────────────────────────
Rivendell: {Aragorn, Boromir} → COUNT = 2
Mirkwood: {Legolas} → COUNT = 1
Khazad-dûm: {Gimli} → COUNT = 1
Mordor: {} → COUNT = 0

Step 2: Apply HAVING COUNT > 1
──────────────────────────────
Rivendell: 2 ✓ INCLUDED (2 > 1)
Mirkwood: 1 ✗ EXCLUDED (1 is not > 1)
Khazad-dûm: 1 ✗ EXCLUDED (1 is not > 1)
Mordor: 0 ✗ EXCLUDED (0 is not > 1)

Result:
location_name | character_count
──────────────┼─────────────────
Rivendell     | 2
```

---

### Complex HAVING Examples

**Question:** "Which quest locations have a total reward of less than 1000 gold?"

```sql
SELECT 
  l.name as location_name,
  COUNT(q.id) as quest_count,
  SUM(q.reward_gold) as total_reward
FROM quests q
INNER JOIN locations l ON q.location_id = l.id
GROUP BY l.id, l.name
HAVING SUM(q.reward_gold) < 1000
ORDER BY total_reward DESC;
```

**Question:** "Which item types have an average value higher than 500?"

```sql
SELECT 
  type as item_type,
  COUNT(*) as item_count,
  AVG(value) as average_value
FROM items
GROUP BY type
HAVING AVG(value) > 500
ORDER BY average_value DESC;
```

---

### Your Task 3: HAVING Queries

Write queries that answer:

1. **"Which locations have 2 or more characters?"**
```sql
SELECT 
  l.name as location_name,
  COUNT(c.id) as character_count
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.id, l.name
HAVING COUNT(c.id) >= 2
ORDER BY character_count DESC;
```

2. **"Which locations have total quest rewards exceeding 2000 gold?"**
```sql
SELECT 
  l.name as location_name,
  COUNT(q.id) as quest_count,
  SUM(q.reward_gold) as total_reward
FROM quests q
INNER JOIN locations l ON q.location_id = l.id
GROUP BY l.id, l.name
HAVING SUM(q.reward_gold) > 2000
ORDER BY total_reward DESC;
```

3. **"Which item types have more than 3 items in inventory?"**
```sql
SELECT 
  type as item_type,
  COUNT(*) as item_count,
  AVG(value) as average_value,
  SUM(value) as total_value
FROM items
GROUP BY type
HAVING COUNT(*) > 3
ORDER BY item_count DESC;
```

---

## Part 4: Real-World Reporting Queries

### Report 1: Location Overview

**"Create a comprehensive report showing all locations and their statistics."**

```sql
SELECT 
  l.name as location_name,
  l.region,
  COUNT(DISTINCT c.id) as total_characters,
  COUNT(DISTINCT q.id) as total_quests,
  AVG(c.level) as average_character_level,
  MAX(c.level) as max_character_level,
  SUM(q.reward_gold) as total_quest_rewards
FROM locations l
LEFT JOIN characters c ON l.id = c.location_id
LEFT JOIN quests q ON l.id = q.location_id
GROUP BY l.id, l.name, l.region
ORDER BY total_characters DESC, location_name;
```

**Output Format:**
```
location_name | region | total_characters | total_quests | avg_level | max_level | total_rewards
──────────────┼────────┼──────────────────┼──────────────┼───────────┼───────────┼──────────────
Rivendell     | Elven  | 3                | 4            | 8.67      | 10        | 3500
Mirkwood      | Elven  | 2                | 2            | 8.50      | 9         | 1800
...
```

---

### Report 2: Quest Analysis

**"Show quests grouped by difficulty with statistics."**

```sql
SELECT 
  difficulty,
  COUNT(*) as quest_count,
  AVG(reward_gold) as average_reward,
  MIN(reward_gold) as minimum_reward,
  MAX(reward_gold) as maximum_reward,
  SUM(reward_gold) as total_reward_pool
FROM quests
GROUP BY difficulty
ORDER BY 
  CASE difficulty
    WHEN 'easy' THEN 1
    WHEN 'medium' THEN 2
    WHEN 'hard' THEN 3
    WHEN 'legendary' THEN 4
  END;
```

**Output Format:**
```
difficulty | quest_count | avg_reward | min_reward | max_reward | total_reward
───────────┼─────────────┼────────────┼────────────┼────────────┼──────────────
easy       | 3           | 300        | 200        | 400        | 900
medium     | 5           | 600        | 500        | 750        | 3000
hard       | 4           | 900        | 800        | 1000       | 3600
legendary  | 1           | 1500       | 1500       | 1500       | 1500
```

---

### Report 3: Character Strength by Location

**"Show which locations have the strongest characters."**

```sql
SELECT 
  l.name as location_name,
  COUNT(c.id) as character_count,
  AVG(c.level) as average_level,
  MAX(c.level) as strongest_character_level,
  MIN(c.level) as weakest_character_level,
  ROUND(AVG(c.level), 2) as rounded_average
FROM characters c
INNER JOIN locations l ON c.location_id = l.id
GROUP BY l.id, l.name
HAVING COUNT(c.id) > 0
ORDER BY average_level DESC;
```

---

## Part 5: Advanced Concepts

### COUNT(DISTINCT column)

**Use this to count unique values only (no duplicates).**

**Example:** "How many different locations have quests?"

```sql
SELECT COUNT(DISTINCT location_id) as locations_with_quests
FROM quests;

-- If you have 5 quests but only 3 different locations,
-- this returns 3 (not 5)
```

**With GROUP BY:** "How many unique item types are at each location?"

```sql
SELECT 
  l.name as location_name,
  COUNT(DISTINCT i.type) as unique_item_types
FROM locations l
LEFT JOIN items i ON l.id = i.location_id
GROUP BY l.id, l.name;
```

---

### CASE Statements with Aggregates

**"Count items by quality level (based on value)."**

```sql
SELECT 
  CASE 
    WHEN value < 100 THEN 'Common'
    WHEN value < 500 THEN 'Uncommon'
    WHEN value < 1000 THEN 'Rare'
    ELSE 'Legendary'
  END as item_quality,
  COUNT(*) as item_count,
  AVG(value) as average_value
FROM items
GROUP BY item_quality
ORDER BY average_value DESC;
```

---

### String Aggregation: STRING_AGG()

**Combine multiple values into a single string.**

**"Show all character names in each location."**

```sql
SELECT 
  l.name as location_name,
  COUNT(c.id) as character_count,
  STRING_AGG(c.name, ', ' ORDER BY c.name) as character_list
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.id, l.name
ORDER BY character_count DESC;
```

**Result:**
```
location_name | character_count | character_list
──────────────┼─────────────────┼──────────────────────────────────
Rivendell     | 3               | Aragorn, Boromir, Elrond
Mirkwood      | 2               | Legolas, Tauriel
Khazad-dûm    | 2               | Dwalin, Gimli
```

---

## Teaching Tips

### Tip 1: Start with Simple Counts

Before introducing HAVING and complex aggregates, make sure students master:
```sql
SELECT COUNT(*) FROM characters;
SELECT AVG(level) FROM characters;
```

### Tip 2: Emphasize the WHERE → GROUP BY → HAVING Flow

```
Raw Data
   ↓
WHERE (filters rows before grouping)
   ↓
GROUP BY (groups the remaining rows)
   ↓
Aggregate functions
   ↓
HAVING (filters groups after aggregation)
   ↓
ORDER BY
   ↓
Result
```

### Tip 3: Use Aliases in GROUP BY

When grouping by non-aggregated columns, include all of them in GROUP BY:

```sql
-- ✓ Correct
SELECT l.id, l.name, COUNT(c.id)
FROM locations l
LEFT JOIN characters c ON l.id = c.location_id
GROUP BY l.id, l.name;

-- ✗ Wrong (will error in strict PostgreSQL)
SELECT l.id, l.name, COUNT(c.id)
FROM locations l
LEFT JOIN characters c ON l.id = c.location_id
GROUP BY l.name;  -- Missing l.id!
```

### Tip 4: Test Aggregates Without GROUP BY First

Have students write:
```sql
SELECT COUNT(*), AVG(level), MAX(level) FROM characters;
```

Then show that adding GROUP BY breaks this into groups:
```sql
SELECT l.name, COUNT(*), AVG(level), MAX(level) 
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
GROUP BY l.id, l.name;
```

---

## Key Concepts Summary

**COUNT():** Count rows or non-NULL values

**SUM():** Add up numeric values

**AVG():** Calculate the average

**MAX() / MIN():** Find largest/smallest values

**GROUP BY:** Divide rows into groups based on column values

**HAVING:** Filter groups AFTER aggregation (like WHERE but for groups)

**DISTINCT:** Count only unique values

**STRING_AGG():** Combine multiple values into one string

---

## Common Mistakes

### Mistake 1: Using WHERE Instead of HAVING

❌ **Wrong:**
```sql
SELECT location_id, COUNT(*)
FROM characters
GROUP BY location_id
WHERE COUNT(*) > 2;  -- ERROR!
```

✅ **Correct:**
```sql
SELECT location_id, COUNT(*)
FROM characters
GROUP BY location_id
HAVING COUNT(*) > 2;
```

### Mistake 2: Forgetting Non-Aggregated Columns in GROUP BY

❌ **Wrong:**
```sql
SELECT l.name, l.region, COUNT(c.id)
FROM locations l
LEFT JOIN characters c ON l.id = c.location_id
GROUP BY l.name;  -- Missing l.id!
```

✅ **Correct:**
```sql
SELECT l.name, l.region, COUNT(c.id)
FROM locations l
LEFT JOIN characters c ON l.id = c.location_id
GROUP BY l.id, l.name, l.region;
```

### Mistake 3: Confusing COUNT(*) vs COUNT(column)

```sql
-- COUNT(*) = Count all rows (including NULLs)
SELECT COUNT(*) FROM characters;  -- 10

-- COUNT(location_id) = Count non-NULL values only
SELECT COUNT(location_id) FROM characters;  -- 9 (one has NULL location)
```

---

## Assessment Questions

**Basic:**
1. What does COUNT(*) return?
2. What's the difference between SUM() and AVG()?
3. When would you use GROUP BY?

**Intermediate:**
4. Write a query showing average level by location
5. Write a query with HAVING to filter locations with 2+ characters
6. Explain the difference between WHERE and HAVING

**Advanced:**
7. Write a query that uses COUNT(DISTINCT column)
8. Create a multi-table aggregation query with JOINs
9. When would you use STRING_AGG()?

---

## Next Steps

After mastering aggregations, students should learn:
- **Lesson 20:** Subqueries - Using aggregates in subqueries
- **Lesson 21:** Window Functions - Advanced aggregation patterns
- **Lesson 22:** Data Analysis - Real-world reporting and dashboards

---

## Resources

- [PostgreSQL Aggregate Functions](https://www.postgresql.org/docs/current/functions-aggregate.html)
- [PostgreSQL GROUP BY Tutorial](https://www.postgresql.org/docs/current/sql-select.html#SQL-GROUPBY)
- [Mode Analytics - Aggregates and GROUP BY](https://mode.com/sql-tutorial/sql-aggregate-functions/)
- [SQL Tutorial - GROUP BY](https://www.sqltutorial.org/sql-group-by/)

