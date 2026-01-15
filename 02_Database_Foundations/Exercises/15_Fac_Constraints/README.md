# Facilitator Guide: Primary Keys and Foreign Keys

## Overview

This guide introduces the fundamental concepts of **primary keys** and **foreign keys** in PostgreSQL using the adventure database. These are the building blocks that allow databases to establish relationships between tables and maintain data integrity.

**Key Concept:** A primary key uniquely identifies a record in a table. A foreign key references a primary key in another table, creating a relationship that ensures data consistency.

**Database Context:** This module uses the `adventure` database with tables like `locations`, `characters`, `items`, and `quests` to demonstrate how primary and foreign keys create meaningful relationships in a fantasy adventure game system.

---

## Table of Contents

1. [What is a Primary Key?](#part-1-what-is-a-primary-key)
2. [Primary Key Syntax and Rules](#part-2-primary-key-syntax-and-rules)
3. [What is a Foreign Key?](#part-3-what-is-a-foreign-key)
4. [Foreign Key Syntax](#part-4-foreign-key-syntax)
5. [Relationships Between Tables](#part-5-relationships-between-tables)
6. [Data Integrity with Foreign Keys](#part-6-data-integrity-with-foreign-keys)
7. [Common Mistakes to Avoid](#part-7-common-mistakes-to-avoid)
8. [Teaching Tips](#part-8-teaching-tips)

---

## PART 1: What is a Primary Key?

### Definition
A **primary key** is a column (or combination of columns) that uniquely identifies each row in a table. No two rows can have the same primary key value, and a primary key cannot be NULL.

### Why Primary Keys Matter
- **Uniqueness**: Ensures each record is distinct
- **Identity**: Provides a way to reference individual records
- **Performance**: Databases create indexes on primary keys for faster lookups
- **Data Integrity**: Prevents duplicate records

### Real-World Analogy
Think of a primary key like a character ID in an adventure game:
- Each character gets a unique character_id
- No two characters have the same ID
- You can always find a specific character by their ID
- This ID appears on all their records (inventory, quests, achievements, etc.)

### Example
```sql
CREATE TABLE characters (
  character_id INT PRIMARY KEY,    -- This is the primary key
  name VARCHAR(120),
  class VARCHAR(50),
  level INT,
  created_date DATE
);
```

In this table:
- `character_id` is the primary key
- Each character has a unique `character_id`
- No two characters can have the same ID
- You can quickly find a character by their ID

---

## PART 2: Primary Key Syntax and Rules

### Syntax
```sql
-- Option 1: Column-level constraint
CREATE TABLE table_name (
  column_name INT PRIMARY KEY,
  other_column VARCHAR(100)
);

-- Option 2: Table-level constraint
CREATE TABLE table_name (
  column_name INT,
  other_column VARCHAR(100),
  PRIMARY KEY (column_name)
);

-- Option 3: Multiple columns (Composite Primary Key)
CREATE TABLE table_name (
  first_col INT,
  second_col INT,
  other_column VARCHAR(100),
  PRIMARY KEY (first_col, second_col)
);
```

### Rules for Primary Keys

| Rule | Meaning |
|------|---------|
| **Must be Unique** | No two rows can have the same PK value |
| **Cannot be NULL** | Every row must have a PK value |
| **One per Table** | Each table has exactly one primary key |
| **Immutable** | PK values should rarely (if ever) change |
| **Simple or Composite** | Can be one column or multiple columns |

### Common Primary Key Strategies

#### Strategy 1: SERIAL (Auto-increment)
```sql
CREATE TABLE products (
  product_id SERIAL PRIMARY KEY,
  name VARCHAR(120),
  price DECIMAL(10, 2)
);
```
✅ Good for: Most applications  
✅ Auto-generates unique IDs  
✅ Easy to use  

#### Strategy 2: UUID (Universal Unique Identifier)
```sql
CREATE TABLE items (
  item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT
);
```
✅ Good for: Distributed systems, APIs  
✅ Globally unique  
✅ Harder to guess IDs  

#### Strategy 3: Natural Key
```sql
CREATE TABLE countries (
  country_code CHAR(2) PRIMARY KEY,  -- e.g., 'US', 'CA', 'MX'
  country_name VARCHAR(100),
  population INT
);
```
✅ Good for: Data that has natural identifiers  
✅ Meaningful values  
⚠️ Must ensure uniqueness  

#### Strategy 4: Composite Key
```sql
CREATE TABLE student_courses (
  student_id INT,
  course_id INT,
  enrollment_date DATE,
  grade VARCHAR(2),
  PRIMARY KEY (student_id, course_id)
);
```
✅ Good for: Junction/bridge tables  
✅ Prevents duplicate enrollments  
⚠️ Slightly more complex

---

## PART 3: What is a Foreign Key?

### Definition
A **foreign key** is a column (or set of columns) in one table that references the primary key in another table. Foreign keys create relationships between tables.

### Why Foreign Keys Matter
- **Referential Integrity**: Ensures data consistency across related tables
- **Prevents Orphaned Data**: Can't add a customer_id that doesn't exist
- **Maintains Relationships**: Documents and enforces table relationships
- **Data Quality**: Prevents invalid data from being inserted
- **Cascading Operations**: Can automatically update or delete related records

### Real-World Analogy
Think of a foreign key like a quest assignment in an adventure game:
- Each quest belongs to a specific location (referenced by location_id)
- Each location has a unique location_id (primary key in locations table)
- When a quest is created, it stores the location_id of where the quest takes place
- The location_id in the quests table is a **foreign key** referencing the locations table
- The database ensures you can't assign a quest to a location_id that doesn't exist

### Example
```sql
-- Parent table: locations are identified by location_id
CREATE TABLE locations (
  location_id INT PRIMARY KEY,
  location_name VARCHAR(120),
  region VARCHAR(50),
  difficulty_rating INT
);

-- Child table: quests are identified by quest_id
-- But each quest takes place in a location (foreign key to locations)
CREATE TABLE quests (
  quest_id INT PRIMARY KEY,
  quest_name VARCHAR(120),
  description TEXT,
  location_id INT,
  reward_gold INT,
  FOREIGN KEY (location_id) REFERENCES locations(location_id)
);
```

In this example:
- `locations.location_id` is a primary key (identifies a location)
- `quests.location_id` is a foreign key (references a location)
- This ensures every quest in the quests table is tied to a valid location

---

## PART 4: Foreign Key Syntax

### Basic Syntax
```sql
CREATE TABLE child_table (
  child_id INT PRIMARY KEY,
  name VARCHAR(100),
  parent_id INT,
  FOREIGN KEY (parent_id) REFERENCES parent_table(parent_id)
);
```

### Complete Example with Both Keys
```sql
-- Parent table (standalone)
CREATE TABLE authors (
  author_id SERIAL PRIMARY KEY,
  author_name VARCHAR(120) NOT NULL,
  birth_year INT
);

-- Child table (references parent)
CREATE TABLE books (
  book_id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  author_id INT,
  publication_year INT,
  FOREIGN KEY (author_id) REFERENCES authors(author_id)
);
```

### Foreign Key Options

```sql
-- Option 1: Basic foreign key (default behavior)
FOREIGN KEY (parent_id) REFERENCES parent_table(parent_id)

-- Option 2: With ON DELETE action
FOREIGN KEY (parent_id) REFERENCES parent_table(parent_id)
  ON DELETE CASCADE           -- Delete child rows if parent is deleted
  
-- Option 3: With ON UPDATE action
FOREIGN KEY (parent_id) REFERENCES parent_table(parent_id)
  ON UPDATE CASCADE           -- Update child rows if parent PK changes

-- Option 4: Full specification
FOREIGN KEY (parent_id) REFERENCES parent_table(parent_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
```

### ON DELETE/UPDATE Actions Explained

| Action | Behavior | Use Case |
|--------|----------|----------|
| **CASCADE** | Delete/update child rows automatically | Orders when customer is deleted |
| **RESTRICT** | Prevent deletion if children exist | Strict data protection |
| **SET NULL** | Set FK to NULL on parent delete | Optional relationships |
| **NO ACTION** | Prevent delete (similar to RESTRICT) | Immediate enforcement |
| **SET DEFAULT** | Set FK to default value | Fallback values |

---

## PART 5: Relationships Between Tables

### The Concept
When tables have primary keys and foreign keys, they form **relationships**. Understanding these relationships is fundamental to database design.

### Types of Relationships

#### 1. One-to-Many Relationship (Most Common)
One record in the parent table relates to multiple records in the child table.

```sql
-- One location has many quests
CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY,
  location_name VARCHAR(120)
);

CREATE TABLE quests (
  quest_id SERIAL PRIMARY KEY,
  quest_name VARCHAR(200),
  location_id INT,              -- Foreign key
  FOREIGN KEY (location_id) REFERENCES locations(location_id)
);
```

**Visual:**
```
Locations Table           Quests Table
---------------           -----------
location_id | name        quest_id | quest_name | location_id
1           | Dark Forest 1        | Collect Herbs | 1
2           | Mountain Peak        | 2        | Defeat Goblin | 1
            |            3        | Find Treasure | 2
            |            4        | Retrieve Amulet | 2
            |            5        | Protect Village | 2
```
- Location 1 (Dark Forest) has 2 quests
- Location 2 (Mountain Peak) has 3 quests
- Each quest points to exactly one location

#### 2. One-to-One Relationship
One record in the parent table relates to exactly one record in the child table.

```sql
-- One character has one primary weapon
CREATE TABLE characters (
  character_id SERIAL PRIMARY KEY,
  character_name VARCHAR(120)
);

CREATE TABLE weapons (
  weapon_id SERIAL PRIMARY KEY,
  weapon_name VARCHAR(100),
  character_id INT UNIQUE,     -- UNIQUE makes it one-to-one
  FOREIGN KEY (character_id) REFERENCES characters(character_id)
);
```

#### 3. Many-to-Many Relationship (Preview)
Multiple records in table A relate to multiple records in table B (requires a junction table).

```sql
-- Characters can carry multiple items, items can be carried by multiple characters

-- Junction table bridges the relationship
CREATE TABLE character_inventory (
  character_id INT,
  item_id UUID,
  quantity INT,
  acquired_date DATE,
  PRIMARY KEY (character_id, item_id),
  FOREIGN KEY (character_id) REFERENCES characters(character_id),
  FOREIGN KEY (item_id) REFERENCES items(item_id)
);
```

### Data Flow Visualization

**Inserting Data - The Correct Order:**
```
1. Insert into parent table FIRST (e.g., locations)
   location_id=1, location_name='Dark Forest'
   
2. Insert into child table SECOND (e.g., quests)
   quest_id=1, quest_name='Collect Herbs', location_id=1  ← references location 1
   ✅ Works because location 1 exists
   
3. Try to insert invalid data
   quest_id=2, quest_name='Mystery Quest', location_id=999  ← references location 999
   ❌ Fails because location 999 doesn't exist
```

---

## PART 6: Data Integrity with Foreign Keys

### What Problems Do Foreign Keys Solve?

#### Problem 1: Orphaned Data
```sql
-- Without foreign key constraints:
INSERT INTO quests (quest_id, quest_name, location_id) 
VALUES (1, 'Lost Quest', 999);  -- location_id 999 doesn't exist!
-- ❌ Data is now inconsistent

-- With foreign key constraints:
INSERT INTO quests (quest_id, quest_name, location_id) 
VALUES (1, 'Lost Quest', 999);
-- ❌ ERROR: foreign key violation
-- ✅ Database prevents invalid data
```

#### Problem 2: Deleting Records with Dependencies
```sql
-- Without cascading delete:
DELETE FROM locations WHERE location_id = 1;
-- Quests in location 1 still exist but reference a deleted location
-- ❌ Orphaned quest records

-- With ON DELETE CASCADE:
DELETE FROM locations WHERE location_id = 1;
-- All quests in location 1 are automatically deleted
-- ✅ Data stays consistent
```

### Best Practices for Data Integrity

1. **Always Define Primary Keys**
   ```sql
   -- Bad: No primary key
   CREATE TABLE items (
     item_name VARCHAR(100),
     value_gold INT
   );
   
   -- Good: Has primary key
   CREATE TABLE items (
     item_id SERIAL PRIMARY KEY,
     item_name VARCHAR(100),
     value_gold INT
   );
   ```

2. **Use Foreign Keys to Enforce Relationships**
   ```sql
   -- Good: FK enforces data integrity
   CREATE TABLE character_items (
     character_id INT NOT NULL,
     item_id INT NOT NULL,
     FOREIGN KEY (character_id) REFERENCES characters(character_id),
     FOREIGN KEY (item_id) REFERENCES items(item_id)
   );
   ```

3. **Match Data Types**
   ```sql
   -- Bad: Different data types
   CREATE TABLE locations (id INT PRIMARY KEY);
   CREATE TABLE quests (location_id VARCHAR(50), FOREIGN KEY...);
   
   -- Good: Same data types
   CREATE TABLE locations (id INT PRIMARY KEY);
   CREATE TABLE quests (location_id INT, FOREIGN KEY...);
   ```

4. **Use Appropriate ON DELETE Actions**
   ```sql
   -- For optional relationships (quest can be deleted if location is deleted)
   FOREIGN KEY (location_id) REFERENCES locations(location_id)
     ON DELETE CASCADE
   
   -- For items that should remain even if character is deleted
   FOREIGN KEY (character_id) REFERENCES characters(character_id)
     ON DELETE SET NULL
   ```

5. **Name Foreign Keys Meaningfully**
   ```sql
   -- Good: Clear naming
   ALTER TABLE quests
   ADD CONSTRAINT fk_quests_location
   FOREIGN KEY (location_id) REFERENCES locations(location_id);
   ```

---

## PART 7: Common Mistakes to Avoid

### ❌ Mistake 1: Forgetting the Primary Key
```sql
-- Bad: No way to uniquely identify records
CREATE TABLE quests (
  quest_name VARCHAR(120),
  description TEXT
);

-- Good: Has a primary key
CREATE TABLE quests (
  quest_id SERIAL PRIMARY KEY,
  quest_name VARCHAR(120),
  description TEXT
);
```

### ❌ Mistake 2: Mismatched Foreign Key Data Types
```sql
-- Bad: INT vs VARCHAR
CREATE TABLE locations (id INT PRIMARY KEY);
CREATE TABLE quests (
  location_id VARCHAR(50),
  FOREIGN KEY (location_id) REFERENCES locations(id)  -- Type mismatch!
);

-- Good: Same types
CREATE TABLE locations (id INT PRIMARY KEY);
CREATE TABLE quests (
  location_id INT,
  FOREIGN KEY (location_id) REFERENCES locations(id)
);
```

### ❌ Mistake 3: Circular Foreign Keys
```sql
-- Bad: A depends on B, B depends on A
CREATE TABLE characters (
  character_id INT PRIMARY KEY,
  hometown_id INT,
  FOREIGN KEY (hometown_id) REFERENCES locations(location_id)
);
CREATE TABLE locations (
  location_id INT PRIMARY KEY,
  ruler_character_id INT,
  FOREIGN KEY (ruler_character_id) REFERENCES characters(character_id)
);

-- Good: Clear parent-child hierarchy
-- Define the parent table first, then child tables
```

### ❌ Mistake 4: Foreign Key Referencing Non-Primary Keys
```sql
-- Bad: Referencing a non-PK column
CREATE TABLE quests (
  quest_id INT PRIMARY KEY,
  quest_name VARCHAR(200),
  location_name VARCHAR(120),
  FOREIGN KEY (location_name) REFERENCES locations(name)
);

-- Good: Reference the actual primary key
CREATE TABLE quests (
  quest_id INT PRIMARY KEY,
  quest_name VARCHAR(200),
  location_id INT,
  FOREIGN KEY (location_id) REFERENCES locations(location_id)
);
```

### ❌ Mistake 5: Ignoring Cascading Consequences
```sql
-- Bad: Using CASCADE without thinking
CREATE TABLE quests (
  quest_id INT PRIMARY KEY,
  location_id INT,
  FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);
-- If location is deleted, all quests in it vanish (might not be desired)

-- Good: Think about what should happen
CREATE TABLE completed_quests (
  completion_id INT PRIMARY KEY,
  quest_id INT,
  FOREIGN KEY (quest_id) REFERENCES quests(quest_id) ON DELETE SET NULL
);
-- Quest can be deleted, completions remain (just no quest reference)
```

---

## PART 8: Teaching Tips

### Key Concepts to Emphasize

1. **Primary Keys = Identity**
   - Every table needs a way to identify unique records
   - Like a unique ID that never changes
   - Example: Student ID, Product Code, Customer ID

2. **Foreign Keys = Relationships**
   - Connect tables by referencing other tables' primary keys
   - Like "this product belongs to this store"
   - Creates parent-child relationships

3. **Integrity = Safety**
   - Foreign keys prevent inconsistent data
   - Database won't let you create invalid relationships
   - Think of it as a safety check

### Common Student Questions & Answers

**Q: Why can't I just store both IDs in one table?**  
A: You can, but it causes data duplication and makes updates harder. Databases are designed to minimize duplication.

**Q: What if I delete a parent record by accident?**  
A: That's why we use ON DELETE CASCADE or SET NULL. It prevents accidental data loss or orphaning.

**Q: Can a table have multiple primary keys?**  
A: No, only one primary key per table. But it can have multiple UNIQUE columns.

**Q: Must a foreign key always reference a primary key?**  
A: In PostgreSQL, it must reference a UNIQUE column (primary keys are just a special case of UNIQUE).

**Q: Can a character have items from multiple locations?**  
A: Yes! That's a many-to-many relationship, which requires a junction table (like character_inventory).

### Demonstration Script

Create these tables to demonstrate relationships in the adventure database:

```sql
-- Connect to adventure database
\c adventure

-- Create a simple location-quest relationship
CREATE TABLE locations (
  location_id SERIAL PRIMARY KEY,
  location_name VARCHAR(120) NOT NULL,
  region VARCHAR(50),
  difficulty_rating INT
);

CREATE TABLE quests (
  quest_id SERIAL PRIMARY KEY,
  quest_name VARCHAR(120) NOT NULL,
  description TEXT,
  location_id INT NOT NULL,
  reward_gold INT,
  FOREIGN KEY (location_id) REFERENCES locations(location_id) ON DELETE CASCADE
);

-- Demonstrate insertion
INSERT INTO locations (location_name, region, difficulty_rating) 
VALUES ('Dark Forest', 'North', 5);

INSERT INTO quests (quest_name, description, location_id, reward_gold) 
VALUES ('Collect Herbs', 'Find rare herbs in the forest', 1, 500);

-- Demonstrate integrity
INSERT INTO quests (quest_name, description, location_id, reward_gold) 
VALUES ('Defeat Shadow', 'Battle the shadow creature', 999, 1000);  
-- ❌ Error! location 999 doesn't exist

-- Demonstrate deletion
DELETE FROM locations WHERE location_id = 1;  
-- What happens to quests? With CASCADE, they are deleted too!
```

### Assessment Questions for Students

1. What is the purpose of a primary key?
2. What is the difference between a primary key and a foreign key?
3. Can a foreign key have NULL values?
4. What happens if you try to insert a quest with a location_id that doesn't exist?
5. When should you use ON DELETE CASCADE vs. ON DELETE SET NULL?
6. Draw a diagram showing a one-to-many relationship between locations and quests.
7. What data integrity problem does a foreign key prevent?
8. In the adventure database, why is location_id a foreign key in the quests table?
9. What would happen if you deleted a location with the ON DELETE CASCADE constraint?
10. Can a character have items from multiple locations? How would you design this relationship?

---

## Resources

- [PostgreSQL Foreign Keys Documentation](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)
- [Primary Keys Best Practices](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-PRIMARY-KEYS)
- [Referential Integrity](https://www.postgresql.org/docs/current/ddl-constraints.html#DDL-CONSTRAINTS-FK)

---

## Summary

**Primary Keys:**
- Uniquely identify records in a table
- No NULLs allowed
- Indexed for performance
- One per table

**Foreign Keys:**
- Reference primary keys in other tables
- Create relationships between tables
- Enforce referential integrity
- Support cascading operations

**Relationships:**
- One-to-Many (most common)
- One-to-One (strict relationships)
- Many-to-Many (via junction tables)

**Data Integrity:**
- Prevents orphaned data
- Ensures valid references
- Enables cascading updates/deletes
- Documents table relationships

