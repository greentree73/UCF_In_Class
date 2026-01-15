-- ============================================================================
-- ACTIVITY: Insert Records into the `realms` Table
-- ============================================================================
-- 
-- Objective: Insert sample realm records into the knights_realm database
-- Time: 15-25 minutes
-- Prerequisites: knights_realm database and realms table already created
--
-- ============================================================================


-- ============================================================================
-- STEP 1: VERIFY DATABASE CONNECTION
-- ============================================================================
-- 
-- In psql, you should already be connected to knights_realm
-- If not, use: \c knights_realm
-- 
-- Verify the connection:

SELECT current_database() as "Current Database";

-- Verify the realms table exists:

\dt realms

-- Verify the table structure:

\d realms


-- ============================================================================
-- STEP 2: REVIEW INSERT STATEMENT STRUCTURE
-- ============================================================================
--
-- Basic PostgreSQL INSERT Syntax:
-- 
-- INSERT INTO table_name (column1, column2, column3)
-- VALUES (value1, value2, value3);
--
-- For our realms table:
-- - TABLE NAME: realms
-- - COLUMNS: name, ruler, description (NOT id, it's auto-generated)
-- - VALUES: The actual data for each column


-- ============================================================================
-- STEP 3: INSERT METHOD 1 - ONE RECORD AT A TIME
-- ============================================================================
--
-- This method helps you see each insertion and its result.
-- Execute each INSERT statement individually.
-- You should see: INSERT 0 1 (meaning 1 record inserted)
--

-- Insert Record 1: The Northern Realm
INSERT INTO realms (name, ruler, description)
VALUES (
	'Northern Realm',
	'King Aldric the Bold',
	'A cold, mountainous kingdom known for brave warriors and legendary dragon slayers.'
);

-- Check the result:
-- SELECT * FROM realms WHERE name = 'Northern Realm';


-- ============================================================================
-- Insert Record 2: The Enchanted Forest
INSERT INTO realms (name, ruler, description)
VALUES (
	'Enchanted Forest',
	'Queen Sylphia',
	'A mystical woodland realm where ancient magic flows through the ancient trees and magical creatures roam freely.'
);

-- Check the result:
-- SELECT * FROM realms WHERE name = 'Enchanted Forest';


-- ============================================================================
-- Insert Record 3: The Desert Kingdom
INSERT INTO realms (name, ruler, description)
VALUES (
	'Desert Kingdom',
	'Sultan Rashid the Wise',
	'A sprawling desert empire built on trade routes. Home to master merchants and sand-sailors.'
);

-- Check the result:
-- SELECT * FROM realms WHERE name = 'Desert Kingdom';


-- ============================================================================
-- Insert Record 4: The Coastal Dominion
INSERT INTO realms (name, ruler, description)
VALUES (
	'Coastal Dominion',
	'Admiral Lady Coretta',
	'A maritime realm of skilled sailors, pirates, and fishing villages. The wealth flows from the seas.'
);

-- Check the result:
-- SELECT * FROM realms WHERE name = 'Coastal Dominion';


-- ============================================================================
-- Insert Record 5: The Dwarven Hold
INSERT INTO realms (name, ruler, description)
VALUES (
	'Dwarven Hold',
	'Thane Gordin Ironbeard',
	'Underground kingdom carved deep beneath the mountains. Renowned for craftsmanship and mining riches.'
);

-- Check the result:
-- SELECT * FROM realms WHERE name = 'Dwarven Hold';


-- ============================================================================
-- STEP 4: VERIFY ALL INSERTS (Run after completing Step 3)
-- ============================================================================
--
-- View all realms you've inserted:

SELECT * FROM realms;

-- You should see 5 records with auto-generated id values (1-5)


-- ============================================================================
-- STEP 5: PRACTICE QUERIES - EXPLORE YOUR DATA
-- ============================================================================
--
-- Try these SELECT queries to practice working with your data.
-- Uncomment each one and run individually.
--

-- View only the name and ruler columns:
-- SELECT name, ruler FROM realms;

-- Count how many realms exist:
-- SELECT COUNT(*) as total_realms FROM realms;

-- Order realms by name alphabetically:
-- SELECT * FROM realms ORDER BY name ASC;

-- Order realms by id in reverse order:
-- SELECT * FROM realms ORDER BY id DESC;

-- Find realms where the ruler name contains "King":
-- SELECT * FROM realms WHERE ruler LIKE '%King%';

-- Find realms where the ruler name contains "Queen":
-- SELECT * FROM realms WHERE ruler LIKE '%Queen%';

-- Get the name and ruler for a specific realm:
-- SELECT name, ruler FROM realms WHERE name = 'Northern Realm';


-- ============================================================================
-- STEP 6: OPTIONAL - INSERT ALTERNATIVE METHOD (Batch Insert)
-- ============================================================================
--
-- If you want to insert multiple records at once, use this format:
-- Uncomment and run if you want to try batch insert instead of individual records
--
-- NOTE: Only use this if you haven't already inserted records in Step 3
--
-- INSERT INTO realms (name, ruler, description) VALUES
-- ('Northern Realm', 'King Aldric the Bold', 'A cold, mountainous kingdom known for brave warriors and legendary dragon slayers.'),
-- ('Enchanted Forest', 'Queen Sylphia', 'A mystical woodland realm where ancient magic flows through the ancient trees and magical creatures roam freely.'),
-- ('Desert Kingdom', 'Sultan Rashid the Wise', 'A sprawling desert empire built on trade routes. Home to master merchants and sand-sailors.'),
-- ('Coastal Dominion', 'Admiral Lady Coretta', 'A maritime realm of skilled sailors, pirates, and fishing villages. The wealth flows from the seas.'),
-- ('Dwarven Hold', 'Thane Gordin Ironbeard', 'Underground kingdom carved deep beneath the mountains. Renowned for craftsmanship and mining riches.');


-- ============================================================================
-- STEP 7: OPTIONAL - CHALLENGE EXTENSION
-- ============================================================================
--
-- Try these advanced tasks to deepen your learning:
--

-- 7.1: Add a custom realm
-- INSERT INTO realms (name, ruler, description)
-- VALUES ('Your Realm', 'Your Ruler', 'Your description here');

-- 7.2: Update an existing realm's ruler
-- UPDATE realms SET ruler = 'New Ruler Name' WHERE name = 'Northern Realm';

-- 7.3: Update a realm's description
-- UPDATE realms SET description = 'Updated description' WHERE id = 1;

-- 7.4: Delete a realm (be careful!)
-- DELETE FROM realms WHERE id = 5;

-- 7.5: Complex query - Get all realms with descriptions ordered by name
-- SELECT id, name, ruler, description FROM realms ORDER BY name ASC;

-- 7.6: Complex query - Count realms grouped by characteristics
-- SELECT COUNT(*) as realm_count FROM realms;

-- 7.7: View table structure again to review
-- \d realms


-- ============================================================================
-- COMPLETION CHECKLIST
-- ============================================================================
--
-- After completing this activity, you should have accomplished:
-- 
-- [ ] Connected to knights_realm database
-- [ ] Verified the realms table exists
-- [ ] Understood INSERT statement structure
-- [ ] Inserted 5 sample realm records (Method 1 or Method 2)
-- [ ] Ran SELECT * FROM realms; and saw all 5 records
-- [ ] Viewed the auto-generated id values (1-5)
-- [ ] Practiced at least 3 SELECT queries from Step 5
-- [ ] (Optional) Tried one of the Challenge Extension tasks
--
-- ============================================================================
-- NOTES:
-- ============================================================================
--
-- • The 'id' column is SERIAL (auto-generated) - don't include it in INSERT
-- • String values MUST be wrapped in single quotes: 'value'
-- • If a value contains a single quote, use two: 'Merchant''s Quarter'
-- • Each SQL statement MUST end with a semicolon ;
-- • Comments start with -- (two hyphens)
-- • Block comments: /* comment */ for multiple lines
--
-- ============================================================================
-- Good luck, and happy database building! 🏰
-- ============================================================================
