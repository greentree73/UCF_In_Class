-- ============================================================================
-- Quick Data Types Activity - 5-7 Minutes

-- PART 1: CONNECT TO DATABASE

\c knights_realm

-- TODO: Drop the table if it exists
DROP TABLE IF EXISTS realms CASCADE;

-- ============================================================================
-- PART 2: CREATE TABLE WITH DATA TYPES (10 COLUMNS)
-- ============================================================================
-- TODO: Complete the CREATE TABLE statement below.
-- Add all 10 columns with their data types and constraints:
--
-- Column List:
-- 1. id              - SERIAL PRIMARY KEY
-- 2. name            - VARCHAR(120) NOT NULL
-- 3. ruler           - VARCHAR(100) NOT NULL
-- 4. population      - INTEGER DEFAULT 0
-- 5. prosperity      - DECIMAL(3, 2)
-- 6. is_magical      - BOOLEAN DEFAULT FALSE
-- 7. founded_date    - DATE
-- 8. created_at      - TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- 9. keywords        - TEXT[]
-- 10. gov_info       - JSONB

CREATE TABLE realms (
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


-- ============================================================================
-- PART 3: VERIFY TABLE STRUCTURE
-- ============================================================================
-- TODO: Write the command to display the table structure
\d realms


-- ============================================================================
-- PART 4: INSERT SAMPLE REALMS (3 REALMS)
-- ============================================================================
-- TODO: Insert 3 sample realms into the table.
-- Complete the INSERT statements using the data below:

-- Realm 1: The Northern Kingdom
-- Name: 'The Northern Kingdom'
-- Ruler: 'King Harald Ironclad'
-- Population: 500000
-- Prosperity: 7.85
-- is_magical: TRUE
-- founded_date: '1200-05-15'
-- keywords: ARRAY['magical', 'royal', 'ancient']
-- gov_info: '{"type": "monarchy", "branches": 3}'::jsonb

INSERT INTO realms (
  name, ruler, population, prosperity, is_magical, founded_date, keywords, gov_info
) VALUES (
  'The Northern Kingdom',
  'King Harald Ironclad',
  500000,
  7.85,
  TRUE,
  '1200-05-15',
  ARRAY['magical', 'royal', 'ancient'],
  '{"type": "monarchy", "branches": 3}'::jsonb
);

-- Realm 2: The Emerald Dominion
-- Name: 'The Emerald Dominion'
-- Ruler: 'Queen Aldara of the Mists'
-- Population: 350000
-- Prosperity: 8.50
-- is_magical: TRUE
-- founded_date: '1150-06-20'
-- keywords: ARRAY['magical', 'learned', 'beautiful']
-- gov_info: '{"type": "matriarchy", "branches": 2}'::jsonb

INSERT INTO realms (
  name, ruler, population, prosperity, is_magical, founded_date, keywords, gov_info
) VALUES (
  'The Emerald Dominion',
  'Queen Aldara of the Mists',
  350000,
  8.50,
  TRUE,
  '1150-06-20',
  ARRAY['magical', 'learned', 'beautiful'],
  '{"type": "matriarchy", "branches": 2}'::jsonb
);

-- Realm 3: The Crimson Duchy
-- Name: 'The Crimson Duchy'
-- Ruler: 'Duke Marcus Redstone'
-- Population: 420000
-- Prosperity: 8.90
-- is_magical: FALSE
-- founded_date: '1180-03-10'
-- keywords: ARRAY['trading', 'wealthy', 'architectural']
-- gov_info: '{"type": "duchy", "branches": 2}'::jsonb

INSERT INTO realms (
  name, ruler, population, prosperity, is_magical, founded_date, keywords, gov_info
) VALUES (
  'The Crimson Duchy',
  'Duke Marcus Redstone',
  420000,
  8.90,
  FALSE,
  '1180-03-10',
  ARRAY['trading', 'wealthy', 'architectural'],
  '{"type": "duchy", "branches": 2}'::jsonb
);


-- ============================================================================
-- PART 5: VIEW YOUR DATA
-- ============================================================================
-- TODO: Write a SELECT statement to view all your data
-- Select: name, ruler, is_magical, prosperity, keywords
-- Order by: name

SELECT 
  name, ruler, is_magical, prosperity, keywords
FROM realms
ORDER BY name;

-- ============================================================================
-- PART 6: ALTER TABLE - ADD A NEW COLUMN
-- ============================================================================
-- TODO: Add a new column called 'last_visited' with type DATE
-- Use ALTER TABLE ... ADD COLUMN ...

ALTER TABLE realms
  ADD COLUMN last_visited DATE;


-- ============================================================================
-- PART 7: VERIFY UPDATED TABLE STRUCTURE
-- ============================================================================
-- TODO: Display the updated table structure

\d realms


-- ============================================================================
-- COMPLETION CHECKLIST
-- ============================================================================
-- [ ] Part 2: Created realms table with 10 columns
-- [ ] Part 4: Inserted 3 realms with different data values
-- [ ] Part 5: Ran SELECT query to view your data
-- [ ] Part 6: Added new column using ALTER TABLE
-- [ ] Part 7: Verified table structure with \d command
--
-- You've completed the quick data types activity!

-- ============================================================================
-- END OF ACTIVITY
-- ============================================================================
