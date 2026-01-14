# Lab 14: Quick Data Types Activity - 5-7 Minutes

## Overview

In thislab, you'll create a table with different PostgreSQL data types and practice inserting data.

**Database:** `knights_realm`  
**Table:** `realms_enhanced`  
**Time:** 5-7 minutes

---

## PART 1: Create the Table

Connect to the database and create the `realms_enhanced` table with these 10 columns:

```sql
\c knights_realm

DROP TABLE IF EXISTS realms_enhanced CASCADE;

CREATE TABLE realms_enhanced (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  ruler VARCHAR(100) NOT NULL,
  population INTEGER DEFAULT 0,
  prosperity DECIMAL(3, 2),
  is_magical BOOLEAN DEFAULT FALSE,
  founded_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  keywords TEXT[],
  gov_info JSONB
);
```

**Column Types:**
- **SERIAL** - Auto-incrementing ID
- **VARCHAR(n)** - Text up to n characters
- **INTEGER** - Whole numbers
- **DECIMAL(p,s)** - Exact decimals (precision, scale)
- **BOOLEAN** - True/False
- **DATE** - Calendar dates
- **TIMESTAMP** - Date + Time
- **TEXT[]** - Array of text
- **JSONB** - JSON structured data

---

## PART 2: Insert 3 Realms

Insert sample realms into your table. Here's an example:

```sql
INSERT INTO realms_enhanced 
(name, ruler, population, prosperity, is_magical, founded_date, keywords, gov_info)
VALUES
('Realm 3', 'Ruler Name 3', 300000, 8.50, FALSE, '1180-03-10', ARRAY['trade', 'wealth'], '{"type": "duchy", "branches": 2}'::jsonb),
('Realm 4', 'Ruler Name 4', 450000, 7.25, FALSE, '1200-06-15', ARRAY['peace', 'fair'], '{"type": "republic", "branches": 3}'::jsonb);
```

---

## PART 3: Query and Modify

Run a quick SELECT and then try ALTER TABLE:

```sql
-- View your data
SELECT name, ruler, is_magical, prosperity, keywords FROM realms_enhanced;

-- Add a new column
ALTER TABLE realms_enhanced ADD COLUMN last_visited DATE;

-- Check the updated table
\d realms_enhanced
```

---

## Key Data Types Summary

| Type | Example | Used For |
|------|---------|----------|
| VARCHAR(n) | 'Northern Kingdom' | Short text with limit |
| INTEGER | 500000 | Whole numbers |
| DECIMAL(p,s) | 8.75 | Precise decimals |
| BOOLEAN | TRUE/FALSE | Yes/No values |
| DATE | '1180-03-10' | Calendar dates |
| TIMESTAMP | CURRENT_TIMESTAMP | Date + time |
| TEXT[] | ARRAY['magic', 'old'] | Multiple text values |
| JSONB | {"type": "monarchy"} | Complex structured data |

---

## Completion Checklist

- [ ] Created realms_enhanced table with 10 columns
- [ ] Inserted 3 realms with different data values
- [ ] Ran SELECT query to view data
- [ ] Added new column with ALTER TABLE
- [ ] Viewed table structure with \d command
