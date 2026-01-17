-- ============================================================================
-- Lab 16: Primary Keys and Foreign Keys Activity (SIMPLIFIED - 5-7 minutes)
-- SOLUTION FILE - Complete Working Code
-- ============================================================================

-- ============================================================================
-- PART 1: CONNECT TO DATABASE AND CREATE REALMS TABLE
-- ============================================================================

\c knights_realm

DROP TABLE IF EXISTS realms CASCADE;

CREATE TABLE realms (
  realm_id SERIAL PRIMARY KEY,
  realm_name VARCHAR(120) NOT NULL,
  ruler VARCHAR(100) NOT NULL,
  is_magical BOOLEAN DEFAULT FALSE
);

\d realms


-- ============================================================================
-- PART 2: INSERT 3 SAMPLE REALMS
-- ============================================================================

INSERT INTO realms (realm_name, ruler, is_magical)
VALUES
  ('The Northern Kingdom', 'King Harald Ironclad', true),
  ('The Emerald Dominion', 'Queen Aldara of the Mists', true),
  ('The Crimson Duchy', 'Duke Marcus Redstone', false);

SELECT * FROM realms ORDER BY realm_id;


-- ============================================================================
-- PART 3: CREATE KNIGHTS TABLE (WITH FOREIGN KEY)
-- ============================================================================

DROP TABLE IF EXISTS knights CASCADE;

CREATE TABLE knights (
  knight_id SERIAL PRIMARY KEY,
  knight_name VARCHAR(120) NOT NULL,
  realm_id INTEGER NOT NULL,
  class VARCHAR(50),
  FOREIGN KEY (realm_id) REFERENCES realms(realm_id)
);

\d knights


-- ============================================================================
-- PART 4: INSERT 4 SAMPLE KNIGHTS
-- ============================================================================

INSERT INTO knights (knight_name, realm_id, class)
VALUES
  ('Sir Aldous the Brave', 1, 'warrior'),
  ('Lady Elowen Starlight', 2, 'mage'),
  ('Sir Garrett the Silent', 1, 'rogue'),
  ('Sir Marcus Redstone Jr.', 3, 'paladin');

SELECT * FROM knights ORDER BY knight_id;


-- ============================================================================
-- PART 5: TEST THE FOREIGN KEY CONSTRAINT
-- ============================================================================

-- This would fail if uncommented (foreign key constraint violation):
-- INSERT INTO knights (knight_name, realm_id, class)
-- VALUES ('Sir Nobody', 999, 'warrior');
-- ERROR: foreign key constraint violation
-- This demonstrates DATA INTEGRITY - the database protects us from invalid data!


-- ============================================================================
-- PART 6: VIEW THE RELATIONSHIP
-- ============================================================================

SELECT k.knight_name, k.class, r.realm_name
FROM knights k
JOIN realms r ON k.realm_id = r.realm_id
ORDER BY k.knight_id;


-- ============================================================================
-- COMPLETION SUMMARY
-- ============================================================================
-- 
-- ✓ PRIMARY KEY: realm_id uniquely identifies each realm
-- ✓ FOREIGN KEY: realm_id in knights table points to realm_id in realms table
-- ✓ ONE-TO-MANY: One realm can have many knights
-- ✓ DATA INTEGRITY: Foreign keys prevent invalid data
-- ✓ RELATIONSHIP: The junction is the matching realm_id value
--
-- Expected Results:
-- - 3 realms created and inserted
-- - 4 knights created and inserted
-- - All knights reference valid realms
-- - JOIN shows knight names with their realm names
--
-- Next Lessons:
-- - Lesson 17: JOINs - Query across multiple related tables
-- - Lesson 18: Normalization - Design efficient databases
--
-- ============================================================================
