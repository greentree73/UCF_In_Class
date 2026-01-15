# Lab 20: Aggregations & Grouping Activity

## Overview

In this quick lab, you'll practice writing **aggregation queries** and **GROUP BY** statements using the `knights_realm` database. You'll learn to summarize data and answer reporting questions.

**Database:** `knights_realm`  
**Tables:** `realms`, `knights`, `quests`  
**Time:** 5-10 minutes

**Learning Objectives:**
- Write simple COUNT() queries
- Use GROUP BY to summarize data
- Answer reporting questions with aggregations

---

## Part 1: Simple Aggregation (Counts)

### Task 1: Count Total Knights

**Question:** "How many knights are there in total?"

**What You Need:**
- COUNT(*) to count rows
- FROM knights table

**Fill in the blanks:**

```sql
-- TODO: Connect to knights_realm
\c knights_realm

-- TODO: Count total knights
SELECT COUNT(*) as total_knights
FROM knights;
```

**Expected Result:**
```
total_knights
───────────────
4
```

---

### Task 2: Count Total Quests

**Question:** "How many quests are there?"

```sql
-- TODO: Count total quests
SELECT COUNT(*) as total_quests
FROM quests;
```

**Expected Result:**
```
total_quests
─────────────
6
```

---

### Task 3: Count Quests Per Difficulty

**Question:** "How many quests are easy, medium, hard, and legendary?"

**What You Need:**
- GROUP BY difficulty
- COUNT(*) to count per group

```sql
-- TODO: Group quests by difficulty and count
SELECT 
  difficulty,
  COUNT(*) as quest_count
FROM quests
GROUP BY difficulty
ORDER BY quest_count DESC;
```

**Expected Result:**
```
difficulty | quest_count
────────────┼─────────────
medium     | 2
hard       | 2
easy       | 1
legendary  | 1
```

---

## Part 2: Aggregation with GROUP BY and JOINs

### Task 4: Count Knights Per Realm

**Question:** "How many knights does each realm have?"

**What You Need:**
- JOIN knights and realms
- GROUP BY realm_name
- COUNT(*) to count knights per realm

```sql
-- TODO: Show each realm and how many knights it has
SELECT 
  r.realm_name,
  COUNT(k.knight_id) as knight_count
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
GROUP BY r.realm_id, r.realm_name
ORDER BY knight_count DESC;
```

**Expected Result:**
```
realm_name              | knight_count
────────────────────────┼───────────────
The Northern Kingdom    | 2
The Emerald Dominion    | 1
The Crimson Duchy       | 1
```

**Why LEFT JOIN?** To include all realms, even if they have no knights.

---

### Task 5: Count Quests Per Realm

**Question:** "How many quests are available in each realm?"

```sql
-- TODO: Show each realm and how many quests it has
SELECT 
  r.realm_name,
  COUNT(q.quest_id) as quest_count
FROM realms r
LEFT JOIN quests q ON r.realm_id = q.realm_id
GROUP BY r.realm_id, r.realm_name
ORDER BY quest_count DESC;
```

**Expected Result:**
```
realm_name              | quest_count
────────────────────────┼───────────────
The Northern Kingdom    | 2
The Emerald Dominion    | 2
The Crimson Duchy       | 2
```

---

## Part 3: Filtering with HAVING

### Task 6: Find Realms with Multiple Knights

**Question:** "Which realms have MORE than 1 knight?"

**What You Need:**
- GROUP BY realm_name
- COUNT knights
- HAVING to filter groups where count > 1

```sql
-- TODO: Show realms with 2 or more knights
SELECT 
  r.realm_name,
  COUNT(k.knight_id) as knight_count
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
GROUP BY r.realm_id, r.realm_name
HAVING COUNT(k.knight_id) > 1
ORDER BY knight_count DESC;
```

**Expected Result:**
```
realm_name              | knight_count
────────────────────────┼───────────────
The Northern Kingdom    | 2
```

**Note:** Only The Northern Kingdom has 2+ knights, so only it appears in the result.

---

## Part 4: Real-World Reporting

### Task 7: Realm Summary Report

**Question:** "Create a summary showing each realm with knights and quests."

```sql
-- TODO: Create a report with realm, knight count, and quest count
SELECT 
  r.realm_name,
  r.ruler,
  COUNT(DISTINCT k.knight_id) as total_knights,
  COUNT(DISTINCT q.quest_id) as total_quests
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
LEFT JOIN quests q ON r.realm_id = q.realm_id
GROUP BY r.realm_id, r.realm_name, r.ruler
ORDER BY total_knights DESC, total_quests DESC;
```

**Expected Result:**
```
realm_name              | ruler                     | total_knights | total_quests
────────────────────────┼───────────────────────────┼───────────────┼──────────────
The Northern Kingdom    | King Harald Ironclad      | 2             | 2
The Emerald Dominion    | Queen Aldara of the Mists | 1             | 2
The Crimson Duchy       | Duke Marcus Redstone      | 1             | 2
```

---

## Completion Checklist

- [ ] Task 1: Counted total knights (4)
- [ ] Task 2: Counted total quests (6)
- [ ] Task 3: Grouped quests by difficulty
- [ ] Task 4: Counted knights per realm using LEFT JOIN
- [ ] Task 5: Counted quests per realm using LEFT JOIN
- [ ] Task 6: Used HAVING to filter realms with 2+ knights
- [ ] Task 7: Created realm summary report with multiple aggregates

---

## Key Concepts Review

**COUNT():** Counts rows
```sql
SELECT COUNT(*) FROM knights;  -- Returns: 4
```

**GROUP BY:** Divides rows into groups
```sql
SELECT difficulty, COUNT(*)
FROM quests
GROUP BY difficulty;
```

**LEFT JOIN:** Keeps all rows from left table
```sql
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
```

**HAVING:** Filters groups (like WHERE for groups)
```sql
HAVING COUNT(k.knight_id) > 1
```

**DISTINCT:** Counts unique values only
```sql
COUNT(DISTINCT knight_id)  -- Counts each knight once
```

---

## Quick Reference

### Common Aggregation Patterns

**Count all rows:**
```sql
SELECT COUNT(*) FROM table_name;
```

**Count per group:**
```sql
SELECT column, COUNT(*) FROM table_name GROUP BY column;
```

**Count with JOIN:**
```sql
SELECT t1.col, COUNT(t2.id)
FROM table1 t1
LEFT JOIN table2 t2 ON t1.id = t2.table1_id
GROUP BY t1.id, t1.col;
```

**Filter groups with HAVING:**
```sql
SELECT col, COUNT(*) as cnt
FROM table_name
GROUP BY col
HAVING COUNT(*) > 5;
```

---

## Troubleshooting

### Problem: "Column must appear in GROUP BY"
```
ERROR: column "..." must appear in the GROUP BY clause
```
**Solution:** Add all non-aggregated columns to GROUP BY:
```sql
-- Wrong:
SELECT r.realm_name, r.ruler, COUNT(k.knight_id)
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
GROUP BY r.realm_name;

-- Right:
SELECT r.realm_name, r.ruler, COUNT(k.knight_id)
FROM realms r
LEFT JOIN knights k ON r.realm_id = k.realm_id
GROUP BY r.realm_id, r.realm_name, r.ruler;
```

### Problem: "Aggregate functions cannot appear in WHERE clause"
```
ERROR: aggregate function cannot appear in WHERE clause
```
**Solution:** Use HAVING instead:
```sql
-- Wrong:
GROUP BY difficulty WHERE COUNT(*) > 2;

-- Right:
GROUP BY difficulty HAVING COUNT(*) > 2;
```

### Problem: "No rows returned"
Check that your data exists:
```sql
SELECT * FROM realms;     -- See all realms
SELECT * FROM knights;    -- See all knights
SELECT * FROM quests;     -- See all quests
```

---

## Next Steps

After this lab, you can:
- Use aggregations for data analysis
- Create summary reports
- Find patterns in your data
- Answer business intelligence questions

**Next lesson:** Subqueries - Using aggregates in more complex queries

