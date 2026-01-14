# Lesson 7: PostgreSQL Data Types

## Overview

In this lesson, we'll explore PostgreSQL data types—the different formats for storing information in a database. Understanding data types is crucial because:
- They define what kind of data a column can hold
- They affect how data is stored and how much space it consumes
- They determine what operations can be performed on the data
- They ensure data integrity and consistency

**Database:** `adventure`  
**Table:** `locations_enhanced` (demonstrates various data types)

---

## What Are Data Types?

A **data type** specifies what kind of information can be stored in a column. Think of it like a container label:
- A VARCHAR container holds text
- An INTEGER container holds whole numbers
- A BOOLEAN container holds true/false values

When you define a table, you must specify the data type for each column.

---

## PostgreSQL Data Types Overview

PostgreSQL supports many data types, but we'll focus on the most commonly used ones:

| Category | Data Types |
|----------|-----------|
| **Text** | VARCHAR, CHAR, TEXT |
| **Numeric** | INTEGER, SMALLINT, BIGINT, DECIMAL, NUMERIC, REAL, DOUBLE PRECISION |
| **Boolean** | BOOLEAN |
| **Date/Time** | DATE, TIME, TIMESTAMP, INTERVAL |
| **Binary** | BYTEA |
| **Special** | UUID, JSON, JSONB, ARRAY |

---

## PART 1: Text Data Types

### What are Text Data Types?
Text data types store character strings—letters, numbers, symbols, and words.

### VARCHAR (Variable Character)
**Definition:** Stores variable-length text with a maximum length limit  
**Syntax:** `VARCHAR(n)` where n is the maximum number of characters  
**Use:** Most common for names, descriptions, addresses, etc.

```sql
-- Column definition
name VARCHAR(120)

-- Examples
'The Crystal Falls'          -- 17 characters (well within 120 limit)
'Shadowbrook Forest'         -- 19 characters (well within 120 limit)
```

**Advantages:**
- Flexible length (doesn't waste space for short strings)
- Enforces maximum length constraint
- Good for most text fields

**Example in adventure.locations:**
```sql
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120),           -- Realm names, max 120 chars
  description TEXT,            -- Longer text field
  region VARCHAR(100)
);
```

---

### CHAR (Fixed Character)
**Definition:** Stores fixed-length text; pads with spaces if shorter  
**Syntax:** `CHAR(n)` where n is the exact number of characters  
**Use:** When you know the exact length (like country codes, phone formats)

```sql
-- Column definition
country_code CHAR(2)

-- Examples
'US'  -- Stored as 'US' (2 characters, exact length)
'UK'  -- Stored as 'UK' (2 characters, exact length)
```

**Disadvantages:**
- Wastes space if actual string is shorter
- Less flexible than VARCHAR
- Rarely used in modern applications

---

### TEXT
**Definition:** Stores variable-length text with NO maximum length  
**Syntax:** `TEXT` (no length limit required)  
**Use:** Long descriptions, articles, comments, stories

```sql
-- Column definition
description TEXT

-- Examples
'A breathtaking waterfall with crystal-clear water cascading down rocky cliffs. 
Home to rare water sprites and magical fish. Perfect for meditation and water 
magic studies.'  -- Can be very long
```

**Advantages:**
- Unlimited length (perfect for long content)
- Flexible
- Same storage as VARCHAR in most cases

**When to Use:**
- Detailed descriptions
- Blog posts or articles
- User comments or reviews
- Stories or narratives

---

## PART 2: Numeric Data Types

### What are Numeric Data Types?
Numeric data types store numbers and allow mathematical operations.

### INTEGER
**Definition:** Stores whole numbers (no decimals) from -2,147,483,648 to 2,147,483,647  
**Syntax:** `INTEGER` or `INT`  
**Use:** Counts, ages, quantities, IDs

```sql
-- Column definition
visitor_count INTEGER

-- Examples
100               -- Simple count
0                 -- Zero value
-50               -- Negative number
```

**Common Uses:**
- Record counts
- Population numbers
- Age values
- Ordering or ranking

**Storage:** Uses 4 bytes

---

### SMALLINT
**Definition:** Stores smaller whole numbers from -32,768 to 32,767  
**Syntax:** `SMALLINT`  
**Use:** When you know values will be small (saves storage)

```sql
-- Column definition
rating SMALLINT  -- For ratings 1-10

-- Examples
5         -- Star rating
10        -- Perfect score
1         -- Minimum rating
```

**Advantages:**
- Uses only 2 bytes (half the space of INTEGER)
- Good for limited ranges

**Common Uses:**
- Ratings (1-5 stars, 1-10 scale)
- Difficulty levels (1-3 or 1-5)
- Priority levels

---

### BIGINT
**Definition:** Stores large whole numbers from -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807  
**Syntax:** `BIGINT`  
**Use:** Very large counts, scientific calculations

```sql
-- Column definition
total_visits BIGINT

-- Examples
1000000000        -- 1 billion visits
5000000000        -- 5 billion events
```

**Advantages:**
- Handles extremely large numbers
- Necessary for web-scale counting

**Storage:** Uses 8 bytes

---

### DECIMAL and NUMERIC
**Definition:** Stores exact decimal numbers (no floating-point errors)  
**Syntax:** `DECIMAL(precision, scale)` or `NUMERIC(precision, scale)`
- **precision:** Total number of digits
- **scale:** Number of digits after the decimal point

```sql
-- Column definition
admission_price DECIMAL(10, 2)  -- Up to 99,999,999.99

-- Examples
15.99             -- $15.99
0.50              -- 50 cents
1000.00           -- $1000.00
```

**Why Not Just Use FLOAT?**
```sql
-- DECIMAL: Exact
15.99 + 0.01 = 16.00 ✅

-- FLOAT: Approximate (can have rounding errors)
15.99 + 0.01 = 16.000000000001 ❌
```

**Common Uses:**
- Money/currency (ALWAYS use DECIMAL)
- Precise scientific measurements
- Grades or scores
- Percentages

**Example:**
```sql
entrance_fee DECIMAL(8, 2)       -- $1,000,000.00 max
quality_rating DECIMAL(3, 2)     -- 9.99 max
```

---

### REAL and DOUBLE PRECISION
**Definition:** Store approximate decimal numbers (floating-point)  
**Syntax:** `REAL` or `DOUBLE PRECISION`  
**Use:** Scientific calculations, temperatures, measurements (where precision isn't critical)

```sql
-- Column definition
temperature REAL
average_elevation DOUBLE PRECISION

-- Examples
23.5              -- Temperature in Celsius
1.23456789        -- Can store many decimal places
```

**Note:** Use DECIMAL for money; use REAL/DOUBLE PRECISION for scientific data.

---

## PART 3: Boolean Data Types

### BOOLEAN
**Definition:** Stores true/false values  
**Syntax:** `BOOLEAN` or `BOOL`  
**Use:** Flags, toggles, yes/no fields

```sql
-- Column definition
is_accessible BOOLEAN
has_facilities BOOLEAN

-- Acceptable Values
TRUE, 't', 'true', 'y', 'yes', 'on', '1'    -- All evaluate to true
FALSE, 'f', 'false', 'n', 'no', 'off', '0'  -- All evaluate to false
```

**Examples:**
```sql
is_accessible = TRUE           -- Location is accessible to visitors
has_magic = TRUE               -- Location has magical properties
is_safe = FALSE                -- Location is dangerous
```

**Common Uses:**
- Feature flags (has_parking, is_open)
- Status indicators (is_active, is_approved)
- Attributes (is_historical, has_wifi)

---

## PART 4: Date and Time Data Types

### DATE
**Definition:** Stores calendar dates (year, month, day)  
**Syntax:** `DATE`  
**Format:** 'YYYY-MM-DD'  
**Use:** Dates when time isn't needed

```sql
-- Column definition
discovered_date DATE
last_visited DATE

-- Examples
'2023-12-15'      -- December 15, 2023
'1542-06-20'      -- June 20, 1542 (historical date)
'2025-01-02'      -- January 2, 2025
```

**Common Uses:**
- Birthdays
- Event dates
- Historical dates
- Opening dates

---

### TIME
**Definition:** Stores time of day (hours, minutes, seconds)  
**Syntax:** `TIME`  
**Format:** 'HH:MM:SS'  
**Use:** When you only need the time portion

```sql
-- Column definition
opening_time TIME
closing_time TIME

-- Examples
'09:00:00'        -- 9:00 AM
'17:30:00'        -- 5:30 PM
'23:59:59'        -- Just before midnight
```

**Common Uses:**
- Business hours
- Appointment times
- Scheduled events

---

### TIMESTAMP
**Definition:** Stores date AND time together (most commonly used)  
**Syntax:** `TIMESTAMP` or `TIMESTAMP WITHOUT TIME ZONE`  
**Format:** 'YYYY-MM-DD HH:MM:SS'  
**Use:** Record when events occur (created, updated, modified)

```sql
-- Column definition
created_at TIMESTAMP
updated_at TIMESTAMP
last_check TIMESTAMP

-- Examples
'2023-12-15 14:30:00'         -- December 15, 2023 at 2:30 PM
'2025-01-02 09:45:30'         -- January 2, 2025 at 9:45:30 AM
```

**Special: TIMESTAMP WITH TIME ZONE**
```sql
-- Column definition
created_at TIMESTAMP WITH TIME ZONE

-- Stores timezone information
'2023-12-15 14:30:00+00:00'   -- UTC timezone
'2023-12-15 14:30:00-05:00'   -- Eastern Time
```

**Common Uses:**
- Record creation timestamps
- Last modification timestamps
- Audit trails
- Event logging

**Best Practice:**
```sql
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Auto-set to now
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP   -- Auto-set to now
);
```

---

### INTERVAL
**Definition:** Stores a time duration (span of time)  
**Syntax:** `INTERVAL`  
**Use:** Lengths of time, durations, time differences

```sql
-- Column definition
visit_duration INTERVAL
tour_length INTERVAL

-- Examples
'1 day'                    -- 1 day
'2 hours 30 minutes'       -- 2 hours, 30 minutes
'45 minutes'               -- 45 minutes
'1 year 2 months'          -- 1 year and 2 months
```

**Common Uses:**
- Duration of visits
- How long something takes
- Time differences
- Interval calculations

**Calculation Example:**
```sql
-- Calculate difference between two timestamps
SELECT 
  created_at,
  updated_at,
  updated_at - created_at AS time_elapsed
FROM locations;

-- Result might be: "2 days 05:30:00" (INTERVAL)
```

---

## PART 5: Special Data Types

### UUID (Universally Unique Identifier)
**Definition:** Stores a unique 128-bit identifier  
**Syntax:** `UUID`  
**Format:** 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'

```sql
-- Column definition
id UUID PRIMARY KEY

-- Examples
'550e8400-e29b-41d4-a716-446655440000'
'6ba7b810-9dad-11d1-80b2-00c04fd430c8'
```

**Advantages:**
- Globally unique (works across databases)
- Better than SERIAL for distributed systems
- Prevents ID collisions

---

### JSON and JSONB
**Definition:** Store structured data as JSON (JavaScript Object Notation)  
**Syntax:** `JSON` or `JSONB` (JSONB is preferred—more efficient)  
**Use:** Complex, semi-structured data

```sql
-- Column definition
metadata JSONB
features JSONB

-- Examples
'{"visited": true, "rating": 4.5, "difficulty": "medium"}'
'{"magic_types": ["fire", "water"], "guardians": 3}'
```

**Common Uses:**
- Configuration settings
- Complex nested data
- Tags or metadata
- Arrays of related items

---

### ARRAY
**Definition:** Stores multiple values of the same type in one column  
**Syntax:** `type_name[]`  
**Use:** Lists of related values

```sql
-- Column definition
keywords TEXT[]
difficulty_ratings SMALLINT[]

-- Examples
ARRAY['magical', 'historical', 'scenic']
ARRAY[1, 2, 3, 4, 5]
'{mountain, cave, forest}'  -- Alternative syntax
```

**Common Uses:**
- Tags
- Categories
- Related items
- Skill levels

---

## PART 6: Complete Enhanced Table Example

Here's a complete `locations_enhanced` table incorporating multiple data types:

```sql
CREATE TABLE locations_enhanced (
  -- Identifiers
  id SERIAL PRIMARY KEY,
  unique_code UUID NOT NULL DEFAULT gen_random_uuid(),
  
  -- Text Information
  name VARCHAR(120) NOT NULL,
  description TEXT,
  region VARCHAR(100),
  keywords TEXT[],
  
  -- Numeric Information
  visitor_count INTEGER DEFAULT 0,
  elevation_meters INTEGER,
  difficulty_rating SMALLINT CHECK (difficulty_rating BETWEEN 1 AND 5),
  entrance_fee DECIMAL(8, 2),
  average_temperature REAL,
  
  -- Boolean Flags
  is_accessible BOOLEAN DEFAULT TRUE,
  has_facilities BOOLEAN DEFAULT FALSE,
  requires_permit BOOLEAN DEFAULT FALSE,
  is_magical BOOLEAN DEFAULT FALSE,
  
  -- Date and Time
  discovered_date DATE,
  opening_time TIME,
  closing_time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Complex Data
  metadata JSONB,
  seasonal_hours JSONB
);
```

### Column Breakdown:

| Column | Type | Purpose | Example |
|--------|------|---------|---------|
| id | SERIAL | Auto-incrementing ID | 1, 2, 3 |
| unique_code | UUID | Globally unique identifier | '550e8400-e29b-41d4...' |
| name | VARCHAR(120) | Location name | 'Crystal Falls' |
| description | TEXT | Detailed description | Long multi-line text |
| region | VARCHAR(100) | Region name | 'Northern Mountains' |
| keywords | TEXT[] | Array of keywords | {'magical', 'waterfall'} |
| visitor_count | INTEGER | Total visitors | 1500000 |
| elevation_meters | INTEGER | Height above sea level | 2500 |
| difficulty_rating | SMALLINT | Scale 1-5 | 3 |
| entrance_fee | DECIMAL(8, 2) | Price per visitor | 15.99 |
| average_temperature | REAL | Celsius | 18.5 |
| is_accessible | BOOLEAN | Wheelchair accessible | TRUE |
| has_facilities | BOOLEAN | Bathrooms, parking | TRUE |
| requires_permit | BOOLEAN | Permit needed | FALSE |
| is_magical | BOOLEAN | Has magical properties | TRUE |
| discovered_date | DATE | When discovered | '1542-06-20' |
| opening_time | TIME | Opens at | '09:00:00' |
| closing_time | TIME | Closes at | '18:00:00' |
| created_at | TIMESTAMP | Record created | '2023-12-15 10:30:00' |
| updated_at | TIMESTAMP | Last updated | '2024-01-02 14:45:00' |
| metadata | JSONB | Complex data | '{"best_season": "summer"}' |
| seasonal_hours | JSONB | Hours by season | '{"summer": "9-8", "winter": "10-6"}' |

---

## PART 7: Defining Columns with Data Types

### Basic Syntax:
```sql
column_name DataType [Constraints] [DEFAULT value]
```

### Examples:

```sql
-- Simple text
location_name VARCHAR(100)

-- Text with constraints
username VARCHAR(50) NOT NULL UNIQUE

-- Integer with default
visit_count INTEGER DEFAULT 0

-- Decimal with precision
price DECIMAL(10, 2) NOT NULL

-- Boolean with default
is_active BOOLEAN DEFAULT TRUE

-- Date with automatic current date
created_date DATE DEFAULT CURRENT_DATE

-- Timestamp with automatic current timestamp
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

-- Array of text
categories TEXT[] DEFAULT ARRAY[]::TEXT[]

-- UUID with automatic generation
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```

---

## PART 8: Data Type Constraints

### NOT NULL
Ensures a column must have a value (no empty fields)
```sql
name VARCHAR(100) NOT NULL
```

### UNIQUE
Ensures all values in the column are different
```sql
email VARCHAR(255) UNIQUE
unique_code UUID UNIQUE
```

### DEFAULT
Sets a default value if none is provided
```sql
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
is_active BOOLEAN DEFAULT TRUE
visitor_count INTEGER DEFAULT 0
```

### CHECK
Validates that values meet a specific condition
```sql
difficulty_rating SMALLINT CHECK (difficulty_rating BETWEEN 1 AND 5)
price DECIMAL(10, 2) CHECK (price >= 0)
age INTEGER CHECK (age >= 18)
```

### PRIMARY KEY
Uniquely identifies each row
```sql
id SERIAL PRIMARY KEY
```

### FOREIGN KEY
Links to another table
```sql
region_id INTEGER REFERENCES regions(id)
```

---

## PART 9: Choosing the Right Data Type

### Decision Guide:

**Storing Text?**
- Short, fixed length (codes) → CHAR
- Short, variable length (names) → VARCHAR
- Long content → TEXT

**Storing Numbers?**
- Whole numbers → INTEGER
- Very large numbers → BIGINT
- Small numbers (ratings) → SMALLINT
- Money/precise decimals → DECIMAL
- Scientific data → REAL or DOUBLE PRECISION

**Storing Yes/No?**
- Use BOOLEAN

**Storing Dates?**
- Just the date → DATE
- Just the time → TIME
- Date and time → TIMESTAMP
- Time difference → INTERVAL

**Storing Complex Data?**
- Multiple values of same type → ARRAY
- Structured data (JSON) → JSONB
- Unique identifier → UUID

---

## PART 10: Common Data Type Mistakes

### ❌ Mistake 1: Using VARCHAR for Money
```sql
-- BAD: Can have rounding errors
price VARCHAR(10)   -- '19.99'

-- GOOD: Exact decimal storage
price DECIMAL(10, 2)
```

### ❌ Mistake 2: Using TEXT for Numbers
```sql
-- BAD: Can't do math, inefficient
population TEXT

-- GOOD: Proper numeric type
population INTEGER
```

### ❌ Mistake 3: Using CHAR for Names
```sql
-- BAD: Wastes space with padding
name CHAR(100)

-- GOOD: Variable length, flexible
name VARCHAR(100)
```

### ❌ Mistake 4: Missing Timestamps
```sql
-- BAD: No audit trail
CREATE TABLE locations (id INTEGER, name VARCHAR(100));

-- GOOD: Track when records are created/modified
CREATE TABLE locations (
  id INTEGER,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### ❌ Mistake 5: Wrong Type for IDs
```sql
-- BAD: Integers can collide in distributed systems
id INTEGER PRIMARY KEY

-- GOOD: Globally unique
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
```

---

## PART 11: Data Type Examples from adventure.locations

### Real Table Definition (with all types):

```sql
CREATE TABLE locations_enhanced (
  id SERIAL PRIMARY KEY,
  unique_code UUID NOT NULL DEFAULT gen_random_uuid(),
  name VARCHAR(120) NOT NULL,
  description TEXT,
  region VARCHAR(100),
  visitor_count INTEGER DEFAULT 0,
  elevation_meters INTEGER,
  difficulty_rating SMALLINT CHECK (difficulty_rating BETWEEN 1 AND 5),
  entrance_fee DECIMAL(8, 2),
  average_temperature REAL,
  is_accessible BOOLEAN DEFAULT TRUE,
  has_facilities BOOLEAN DEFAULT FALSE,
  is_magical BOOLEAN DEFAULT FALSE,
  discovered_date DATE,
  opening_time TIME,
  closing_time TIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  keywords TEXT[],
  metadata JSONB,
  seasonal_hours JSONB
);
```

### Inserting Data:

```sql
INSERT INTO locations_enhanced (
  name, 
  description, 
  region, 
  visitor_count, 
  elevation_meters,
  difficulty_rating,
  entrance_fee,
  average_temperature,
  is_accessible,
  has_facilities,
  is_magical,
  discovered_date,
  opening_time,
  closing_time,
  keywords,
  metadata,
  seasonal_hours
) VALUES (
  'Crystal Falls',
  'A breathtaking waterfall with crystal-clear water cascading down rocky cliffs.',
  'Northern Mountains',
  150000,
  2500,
  3,
  15.99,
  18.5,
  TRUE,
  TRUE,
  TRUE,
  '1542-06-20',
  '09:00:00',
  '18:00:00',
  ARRAY['magical', 'waterfall', 'scenic'],
  '{"best_season": "summer", "tours_available": true}',
  '{"summer": "9:00-20:00", "winter": "10:00-18:00"}'
);
```

---

## PART 12: Casting Data Types

Sometimes you need to convert one type to another using **CAST**.

### Syntax:
```sql
CAST(value AS data_type)
```

### Examples:

```sql
-- Convert text to number
CAST('123' AS INTEGER)           -- Result: 123

-- Convert number to text
CAST(456 AS VARCHAR)             -- Result: '456'

-- Convert to date
CAST('2023-12-15' AS DATE)       -- Result: 2023-12-15

-- Convert timestamp to date
CAST(created_at AS DATE)         -- Removes time portion

-- Convert temperature to string
CAST(avg_temperature AS TEXT)    -- For display purposes
```

### Shorthand Syntax:
```sql
'123'::INTEGER                   -- Same as CAST('123' AS INTEGER)
456::VARCHAR                     -- Same as CAST(456 AS VARCHAR)
```

---

## Completion Checklist

- [ ] Understand what data types are and why they matter
- [ ] Know the 5 main categories of data types
- [ ] Can explain VARCHAR vs CHAR vs TEXT
- [ ] Can choose appropriate numeric types (INT, DECIMAL, REAL)
- [ ] Understand BOOLEAN and when to use it
- [ ] Know DATE, TIME, TIMESTAMP differences
- [ ] Understand special types (UUID, JSON, ARRAY)
- [ ] Can create a table with proper data types
- [ ] Can identify common data type mistakes
- [ ] Understand constraints (NOT NULL, UNIQUE, DEFAULT, CHECK)
- [ ] Can explain when to use each data type

---

## Resources

- [PostgreSQL Data Types Documentation](https://www.postgresql.org/docs/current/datatype.html)
- [PostgreSQL Numeric Types](https://www.postgresql.org/docs/current/datatype-numeric.html)
- [PostgreSQL Character Types](https://www.postgresql.org/docs/current/datatype-character.html)
- [PostgreSQL Date/Time Types](https://www.postgresql.org/docs/current/datatype-datetime.html)
- [PostgreSQL JSON Types](https://www.postgresql.org/docs/current/datatype-json.html)

---

## Summary

PostgreSQL offers a rich set of data types to store different kinds of information:

✅ **Text Types:** VARCHAR, CHAR, TEXT  
✅ **Numeric Types:** INTEGER, SMALLINT, BIGINT, DECIMAL, REAL, DOUBLE PRECISION  
✅ **Boolean:** BOOLEAN for true/false  
✅ **Date/Time:** DATE, TIME, TIMESTAMP, INTERVAL  
✅ **Special Types:** UUID, JSON/JSONB, ARRAY  

Choosing the right data type ensures:
- Data integrity (can't store wrong type of data)
- Efficient storage (right amount of space)
- Proper operations (math on numbers, text operations on text)
- Database performance (indexed searches work better with correct types)

Always think about what kind of data you're storing and choose the most appropriate type!
