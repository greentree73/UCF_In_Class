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



---

### Your Task 2: INNER JOIN with Quests

**Question:** "Show me all quests and which realm they're in, sorted by realm name."

```sql
-- TODO: Write an INNER JOIN to show quests and their realms
-- Tables: quests and realms
-- Join condition: quests.realm_id = realms.realm_id
-- Select: name, name, reward, is_complete


```

**Expected Result Format:**
```
       quest_name        | reward | is_complete | realm_name 
-------------------------+--------+-------------+------------
 Rescue the Villagers    |    200 | f           | Ironmarch
 Retrieve the Iron Crown |    500 | f           | Ironmarch
```
