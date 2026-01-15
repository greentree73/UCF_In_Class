# Lab 16: Primary Keys and Foreign Keys Activity

## Overview

In this quick lab, you'll learn about **primary keys** and **foreign keys** by creating two related tables in the `knights_realm` database.

**Database:** `knights_realm`  
**Tables:** `realms` (parent) and `knights` (child with foreign key)  
**Time:** 5-7 minutes

**Learning Objectives:**
- Understand what a primary key is
- Learn how to create a foreign key that references another table
- See data integrity in action
- Understand one-to-many relationships

---

## Part 1: Table Relationships

### Simple Diagram

```
REALMS (parent table)         KNIGHTS (child table)
─────────────────────────     ─────────────────────
realm_id (PRIMARY KEY) ◄──┐   knight_id 
realm_name             │   └─→ realm_id (FOREIGN KEY)
ruler                  │       knight_name
                       │       class
          ONE realm has MANY knights!
```

**Key Concept:** The `realm_id` in the `knights` table acts as a **foreign key** that references (points to) the `realm_id` in the `realms` table. This creates a one-to-many relationship: one realm can have many knights.

---

## Part 2: Create the REALMS Table

Create a simple `realms` table with a **primary key**.

### Your Task

```sql
\c knights_realm

DROP TABLE IF EXISTS realms CASCADE;

-- CREATE TABLE realms (
--   realm_id SERIAL PRIMARY KEY,
--   realm_name VARCHAR(120) NOT NULL,
--   ruler VARCHAR(100) NOT NULL,
--   is_magical BOOLEAN DEFAULT FALSE
-- );

-- Verify
\d realms
```

### Insert 3 Realms

```sql
INSERT INTO realms (realm_name, ruler, is_magical)
VALUES
  ('The Northern Kingdom', 'King Harald Ironclad', true),
  ('The Emerald Dominion', 'Queen Aldara of the Mists', true),
  ('The Crimson Duchy', 'Duke Marcus Redstone', false);

SELECT * FROM realms;
```

---

## Part 3: Create KNIGHTS Table with Foreign Key

Now create a `knights` table that **references** the `realms` table using a foreign key.

### Your Task

```sql
DROP TABLE IF EXISTS knights CASCADE;

-- CREATE TABLE knights (
--   knight_id SERIAL PRIMARY KEY,
--   knight_name VARCHAR(120) NOT NULL,
--   realm_id INTEGER NOT NULL,
--   class VARCHAR(50),
--   FOREIGN KEY (realm_id) REFERENCES realms(realm_id)
-- );

-- Verify
\d knights
\d+ knights
```

### Insert 4 Knights

```sql
INSERT INTO knights (knight_name, realm_id, class)
VALUES
  ('Sir Aldous the Brave', 1, 'warrior'),
  ('Lady Elowen Starlight', 2, 'mage'),
  ('Sir Garrett the Silent', 1, 'rogue'),
  ('Sir Marcus Redstone Jr.', 3, 'paladin');

SELECT * FROM knights;
```

---

## Part 4: Test Data Integrity

Try this to see the foreign key in action:

```sql
-- This WILL FAIL because realm_id 999 doesn't exist
INSERT INTO knights (knight_name, realm_id, class)
VALUES ('Sir Nobody', 999, 'warrior');

-- ERROR: foreign key constraint violation!
-- This is DATA INTEGRITY - the database protects you from invalid data.
```

---

## Part 5: View the Relationship

```sql
-- See all knights and their realms
SELECT k.knight_name, k.class, r.realm_name
FROM knights k
JOIN realms r ON k.realm_id = r.realm_id
ORDER BY k.knight_id;
```

---

## Completion Checklist

- [ ] Created `realms` table with PRIMARY KEY
- [ ] Inserted 3 realms
- [ ] Created `knights` table with FOREIGN KEY
- [ ] Inserted 4 knights (all with valid realm_ids)
- [ ] Tested foreign key constraint (tried invalid realm_id)
- [ ] Viewed the relationship with a JOIN query

---

## Key Concepts

**Primary Key:** Uniquely identifies each record (realm_id in realms table)

**Foreign Key:** References a primary key in another table (realm_id in knights table references realms.realm_id)

**One-to-Many:** One realm has many knights

**Data Integrity:** Foreign keys prevent invalid data by ensuring every knight references a real realm

---

## Next Steps

After this lab, you'll learn:
- **Lesson 17:** JOINs - Query across multiple related tables
- **Lesson 18:** Normalization - Design efficient databases
