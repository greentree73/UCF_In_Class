-- ============================================================================
-- Lab 16: Primary Keys and Foreign Keys Activity (SIMPLIFIED - 5-7 minutes)
-- Student Activity File: keys.sql
-- ============================================================================
-- Instructions: Complete all TODO sections below. This is a quick lab
-- focusing on the essentials of PRIMARY KEYS and FOREIGN KEYS.
-- ============================================================================

-- ============================================================================
-- PART 1: CONNECT TO DATABASE AND CREATE REALMS TABLE
-- ============================================================================
-- TODO: Connect to the knights_realm database
\c knights_realm

-- TODO: Drop the realms table if it exists
DROP TABLE IF EXISTS realms CASCADE;

-- TODO: CREATE the realms table with these columns:
-- - realm_id (SERIAL PRIMARY KEY)
-- - realm_name (VARCHAR(120) NOT NULL)
-- - ruler (VARCHAR(100) NOT NULL)
-- - is_magical (BOOLEAN DEFAULT FALSE)

CREATE TABLE realms (
  -- TODO: Add realm_id as SERIAL PRIMARY KEY
  
  -- TODO: Add realm_name (VARCHAR(120) NOT NULL)
  
  -- TODO: Add ruler (VARCHAR(100) NOT NULL)
  
  -- TODO: Add is_magical (BOOLEAN DEFAULT FALSE)
);

-- TODO: Verify the realms table structure
\d realms


-- ============================================================================
-- PART 2: INSERT 3 SAMPLE REALMS
-- ============================================================================
-- TODO: Insert the three realms with this data:
-- Realm 1: The Northern Kingdom | King Harald Ironclad | is_magical: true
-- Realm 2: The Emerald Dominion | Queen Aldara of the Mists | is_magical: true
-- Realm 3: The Crimson Duchy | Duke Marcus Redstone | is_magical: false

INSERT INTO realms (realm_name, ruler, is_magical)
VALUES
  -- TODO: Add Realm 1 values
  -- TODO: Add Realm 2 values
  -- TODO: Add Realm 3 values
;

-- TODO: Verify the realms were inserted
SELECT * FROM realms ORDER BY realm_id;


-- ============================================================================
-- PART 3: CREATE KNIGHTS TABLE (WITH FOREIGN KEY)
-- ============================================================================
-- TODO: Drop the knights table if it exists

-- TODO: CREATE the knights table with these columns:
-- - knight_id (SERIAL PRIMARY KEY)
-- - knight_name (VARCHAR(120) NOT NULL)
-- - realm_id (INTEGER NOT NULL) - This is a FOREIGN KEY
-- - class (VARCHAR(50))
-- Plus a FOREIGN KEY constraint: FOREIGN KEY (realm_id) REFERENCES realms(realm_id)

CREATE TABLE knights (
  -- TODO: Add knight_id as SERIAL PRIMARY KEY
  
  -- TODO: Add knight_name (VARCHAR(120) NOT NULL)
  
  -- TODO: Add realm_id (INTEGER NOT NULL)
  
  -- TODO: Add class (VARCHAR(50))
  
  -- TODO: Add FOREIGN KEY constraint for realm_id
  -- Hint: FOREIGN KEY (realm_id) REFERENCES realms(realm_id)
);

-- TODO: Verify the knights table structure and foreign key
\d knights


-- ============================================================================
-- PART 4: INSERT 4 SAMPLE KNIGHTS
-- ============================================================================
-- TODO: Insert four knights with valid realm_ids (1, 2, 3):
-- Knight 1: Sir Aldous the Brave | realm_id: 1 | class: warrior
-- Knight 2: Lady Elowen Starlight | realm_id: 2 | class: mage
-- Knight 3: Sir Garrett the Silent | realm_id: 1 | class: rogue
-- Knight 4: Sir Marcus Redstone Jr. | realm_id: 3 | class: paladin

INSERT INTO knights (knight_name, realm_id, class)
VALUES
  -- TODO: Add Knight 1
  -- TODO: Add Knight 2
  -- TODO: Add Knight 3
  -- TODO: Add Knight 4
;

-- TODO: Verify the knights were inserted
SELECT * FROM knights ORDER BY knight_id;


-- ============================================================================
-- PART 5: TEST THE FOREIGN KEY CONSTRAINT
-- ============================================================================
-- TODO: Try to insert a knight with an invalid realm_id (should FAIL)
-- Uncomment and run this - it should produce a FOREIGN KEY CONSTRAINT VIOLATION
-- INSERT INTO knights (knight_name, realm_id, class)
-- VALUES ('Sir Nobody', 999, 'warrior');
-- Expected error: foreign key constraint violation
-- This is DATA INTEGRITY in action!


-- ============================================================================
-- PART 6: VIEW THE RELATIONSHIP
-- ============================================================================
-- TODO: Show all knights and their realms using a JOIN

SELECT k.knight_name, k.class, r.realm_name
FROM knights k
JOIN realms r ON k.realm_id = r.realm_id
ORDER BY k.knight_id;


-- ============================================================================
-- KEY LEARNING POINTS
-- ============================================================================
-- PRIMARY KEY: realm_id uniquely identifies each realm
-- FOREIGN KEY: realm_id in knights table points to realm_id in realms table
-- ONE-TO-MANY: One realm can have many knights
-- DATA INTEGRITY: Foreign keys prevent invalid data (can't reference non-existent realm)
-- RELATIONSHIP: The junction is the matching realm_id value

-- ============================================================================
-- END OF ACTIVITY
-- ============================================================================
