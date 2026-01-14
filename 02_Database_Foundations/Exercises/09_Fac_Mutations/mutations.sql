-- ============================================================================
--  MUTATING DATA SAFELY - UPDATE and DELETE Operations
-- ============================================================================
--
-- Objective: Learn how to safely modify and remove data using UPDATE and DELETE

--
-- CRITICAL CONCEPT: THE WHERE CLAUSE
-- Without a WHERE clause, UPDATE and DELETE will affect ALL rows!
-- This is known as "The Great Erasure" - a common beginner mistake.
--
-- ============================================================================


-- ============================================================================
-- IMPORTANT WARNING: THE WHERE CLAUSE SAVES LIVES (DATA LIVES, THAT IS!)
-- ============================================================================
--
-- ⚠️  DANGEROUS: UPDATE locations SET name = 'Danger Zone';
--     ^ This changes EVERY location to 'Danger Zone'!
--
-- ✅  SAFE: UPDATE locations SET name = 'Danger Zone' WHERE id = 1;
--     ^ This only changes location with id = 1
--
-- ⚠️  DANGEROUS: DELETE FROM locations;
--     ^ This DELETES EVERY LOCATION!
--
-- ✅  SAFE: DELETE FROM locations WHERE id = 1;
--     ^ This only deletes location with id = 1
--
-- REMEMBER: Always test your WHERE clause with a SELECT query FIRST!
--
-- ============================================================================


-- ============================================================================
-- PART 1: VERIFY YOUR DATA (Before making changes)
-- ============================================================================
--
-- Always start by seeing what you have!

-- Connect to the adventure database
\c adventure

-- View all current locations
SELECT * FROM locations;

-- Count how many locations exist
SELECT COUNT(*) as total_locations FROM locations;


-- ============================================================================
-- PART 2: UNDERSTANDING UPDATE STATEMENTS
-- ============================================================================
--
-- UPDATE Syntax:
-- 
-- UPDATE table_name
-- SET column_name = new_value
-- WHERE condition;
--
-- CRITICAL: The WHERE clause determines which rows are updated!
--


-- ============================================================================
-- PART 2A: UPDATE WITH WHERE CLAUSE (THE SAFE WAY)
-- ============================================================================
--
-- Step 1: First, let's SELECT the row we want to change
-- This helps us verify we're changing the RIGHT row!

SELECT * FROM locations WHERE id = 1;

-- Step 2: Now update ONLY that row
-- Update the name of location with id = 1

UPDATE locations
SET name = 'Golden Palace'
WHERE id = 1;

-- Step 3: Verify the change worked
SELECT * FROM locations WHERE id = 1;


-- ============================================================================
-- More UPDATE Examples with WHERE
-- ============================================================================

-- Update multiple columns at once
-- Let's update location id = 2 with new name and description

SELECT * FROM locations WHERE id = 2;

UPDATE locations
SET 
	name = 'Mystic Caverns',
	description = 'Deep caves filled with glowing crystals and ancient mysteries',
	region = 'Underground'
WHERE id = 2;

-- Verify the changes
SELECT * FROM locations WHERE id = 2;


-- ============================================================================
-- Update based on a region (UPDATE multiple rows with specific criteria)
-- ============================================================================

-- First, let's see which locations are in 'Mountains'
SELECT * FROM locations WHERE region = 'Mountains';

-- Update all locations in the Mountains region to add a prefix to their names
-- (This will update MULTIPLE rows, but only those matching the WHERE condition)

UPDATE locations
SET region = 'Highland Mountains'
WHERE region = 'Mountains';

-- Verify the changes
SELECT * FROM locations WHERE region = 'Highland Mountains';


-- ============================================================================
-- Update with CASE statement (Conditional updates)
-- ============================================================================

-- Let's add a description to locations that don't have one yet
-- First, see which locations have NULL descriptions

SELECT id, name, description FROM locations WHERE description IS NULL;

-- Update them with a generic description
UPDATE locations
SET description = 'A mysterious place yet to be discovered'
WHERE description IS NULL;

-- Verify
SELECT id, name, description FROM locations WHERE description IS NULL;


-- ============================================================================
-- PART 3: UNDERSTANDING DELETE STATEMENTS
-- ============================================================================
--
-- DELETE Syntax:
--
-- DELETE FROM table_name
-- WHERE condition;
--
-- CRITICAL: Without WHERE, ALL rows are deleted!
--


-- ============================================================================
-- PART 3A: DELETE WITH WHERE CLAUSE (THE SAFE WAY)
-- ============================================================================
--
-- Step 1: SELECT the row(s) you want to delete first

SELECT * FROM locations WHERE id = 5;

-- Step 2: If you're confident, DELETE only that row

DELETE FROM locations
WHERE id = 5;

-- Step 3: Verify it's gone
SELECT * FROM locations WHERE id = 5;
-- (Should return no results)


-- ============================================================================
-- Delete multiple rows based on criteria
-- ============================================================================

-- First, identify which rows to delete
SELECT * FROM locations WHERE region = 'Desert';

-- Delete all locations in the Desert region
DELETE FROM locations
WHERE region = 'Desert';

-- Verify they're gone
SELECT COUNT(*) as locations_in_desert FROM locations WHERE region = 'Desert';


-- ============================================================================
-- PART 4: USING WHERE CLAUSES SAFELY
-- ============================================================================
--
-- BEST PRACTICE: Always test your WHERE clause with SELECT first!
--

-- Bad approach: Just run DELETE without checking
-- DELETE FROM locations WHERE name LIKE '%Mountain%';

-- Good approach: Check what you'll delete FIRST
SELECT * FROM locations WHERE name LIKE '%Mountain%';

-- If you're satisfied with the results, THEN delete
-- DELETE FROM locations WHERE name LIKE '%Mountain%';

-- Even better: Use AND/OR to be more specific
SELECT * FROM locations WHERE region = 'Mountains' AND name LIKE '%Peak%';


-- ============================================================================
-- PART 5: UNDERSTANDING THE WHERE CLAUSE CONDITIONS
-- ============================================================================
--
-- Different types of WHERE conditions:
--

-- Equality (exact match)
SELECT * FROM locations WHERE id = 1;

-- Not equal
SELECT * FROM locations WHERE id != 3;
-- Or use: WHERE id <> 3;

-- Greater than / Less than
SELECT * FROM locations WHERE id > 2;
SELECT * FROM locations WHERE id < 5;

-- LIKE (pattern matching)
SELECT * FROM locations WHERE name LIKE 'Silver%';      -- Starts with 'Silver'
SELECT * FROM locations WHERE name LIKE '%Forest%';    -- Contains 'Forest'
SELECT * FROM locations WHERE name LIKE '%Peak';       -- Ends with 'Peak'

-- IN (multiple values)
SELECT * FROM locations WHERE id IN (1, 2, 3);

-- BETWEEN
SELECT * FROM locations WHERE id BETWEEN 2 AND 4;

-- IS NULL / IS NOT NULL
SELECT * FROM locations WHERE description IS NULL;
SELECT * FROM locations WHERE description IS NOT NULL;

-- AND / OR combinations
SELECT * FROM locations 
WHERE region = 'Mountains' AND description IS NOT NULL;

SELECT * FROM locations 
WHERE region = 'Mountains' OR region = 'Forests';


-- ============================================================================
-- PART 6: THE GREAT ERASURE (What NOT to do!)
-- ============================================================================
--
-- These are DANGEROUS statements. DO NOT RUN THEM!
-- They would delete or modify your entire table!
--
-- ⚠️  WARNING: Examples of catastrophic mistakes:
--

-- NEVER do this without WHERE:
-- UPDATE locations SET name = 'Danger Zone';
-- Result: ALL locations renamed to 'Danger Zone'! 😱

-- NEVER do this without WHERE:
-- DELETE FROM locations;
-- Result: ALL locations deleted! "The Great Erasure"! 😱😱😱

-- Even this is risky without being specific:
-- UPDATE locations SET region = 'Unknown';
-- Result: ALL locations have region changed! 😱

-- The fix is always: Add a WHERE clause!
-- UPDATE locations SET name = 'Danger Zone' WHERE id = 1;
-- DELETE FROM locations WHERE id = 999;


-- ============================================================================
-- PART 7: TRANSACTIONS (SAFETY NET FOR BIG CHANGES)
-- ============================================================================
--
-- For important operations, use transactions:
-- This lets you test changes and ROLLBACK if needed!
--

-- Start a transaction
BEGIN TRANSACTION;

-- Make your changes
UPDATE locations SET region = 'Test Zone' WHERE id = 1;

-- Check the results
SELECT * FROM locations WHERE id = 1;

-- Choose one:
-- COMMIT;  -- Saves the changes permanently
-- ROLLBACK; -- Undoes all changes in this transaction

-- For this lesson, let's ROLLBACK (undo) the test change
ROLLBACK;

-- Verify it's back to original
SELECT * FROM locations WHERE id = 1;


-- ============================================================================
-- PART 8: PRACTICE ACTIVITIES
-- ============================================================================
--
-- Try these exercises to practice UPDATE and DELETE safely!
--

-- Exercise 1: Update a location's description
-- First, find a location you want to update
SELECT * FROM locations WHERE id = 1;

-- Write an UPDATE statement to change its description
-- UPDATE locations 
-- SET description = 'Your new description here'
-- WHERE id = 1;

-- Verify the change
-- SELECT * FROM locations WHERE id = 1;


-- ============================================================================
-- Exercise 2: Update multiple columns
-- Find a location and update both name and region

SELECT * FROM locations WHERE id = 2;

-- UPDATE locations
-- SET name = 'New Name', region = 'New Region'
-- WHERE id = 2;

-- SELECT * FROM locations WHERE id = 2;


-- ============================================================================
-- Exercise 3: Conditional Update
-- Add a prefix to all location names in a specific region

SELECT * FROM locations WHERE region = 'Underground';

-- UPDATE locations
-- SET name = 'Deep ' || name
-- WHERE region = 'Underground';

-- SELECT * FROM locations WHERE region = 'Underground';


-- ============================================================================
-- Exercise 4: Delete with confidence
-- First verify what you're deleting

SELECT * FROM locations WHERE id = 10;

-- If you're confident:
-- DELETE FROM locations WHERE id = 10;

-- Verify it's gone
-- SELECT * FROM locations WHERE id = 10;


-- ============================================================================
-- PART 9: CURRENT STATE OF YOUR DATA
-- ============================================================================
--
-- Final verification - see what you have now
--

SELECT * FROM locations;
SELECT COUNT(*) as total_locations FROM locations;


-- ============================================================================
-- PART 10: KEY TAKEAWAYS - THE WHERE CLAUSE COMMANDMENTS
-- ============================================================================
--
-- 1. ✅ ALWAYS use a WHERE clause with UPDATE and DELETE
-- 2. ✅ ALWAYS test your WHERE clause with SELECT first
-- 3. ✅ ALWAYS think carefully about what rows will be affected
-- 4. ✅ Use BEGIN TRANSACTION for testing big changes
-- 5. ✅ Be VERY specific with your WHERE conditions
-- 6. ✅ Use AND/OR to narrow down your selection
-- 7. ❌ NEVER update or delete without a WHERE clause
-- 8. ❌ NEVER assume your condition is correct without testing
-- 9. ❌ NEVER run destructive commands in a hurry
-- 10. ❌ NEVER forget: Data is precious! Treat it with respect!
--


-- ============================================================================
-- COMPLETION CHECKLIST
-- ============================================================================
--
-- After completing this lesson, you should be able to:
--
-- [ ] Understand the UPDATE syntax and its components
-- [ ] Write UPDATE statements with WHERE clauses
-- [ ] Update single and multiple columns
-- [ ] Update multiple rows based on conditions
-- [ ] Understand the DELETE syntax
-- [ ] Write DELETE statements with WHERE clauses
-- [ ] Write different types of WHERE conditions
-- [ ] Test WHERE clauses with SELECT before using UPDATE/DELETE
-- [ ] Explain why WHERE clauses are critical
-- [ ] Use transactions to test changes safely
-- [ ] Know the risks of "The Great Erasure"
-- [ ] Confidently modify data in your database
--
-- ============================================================================


-- ============================================================================
-- LESSON SUMMARY
-- ============================================================================
--
-- UPDATE changes existing data
-- - Syntax: UPDATE table SET column = value WHERE condition;
-- - WHERE clause determines which rows are changed
-- - Always test WHERE clause first with SELECT
--
-- DELETE removes data
-- - Syntax: DELETE FROM table WHERE condition;
-- - WHERE clause determines which rows are deleted
-- - Without WHERE, ALL rows are deleted!
--
-- The WHERE clause is your safety net!
-- Use it EVERY TIME with UPDATE and DELETE.
--
-- Never rush with data mutations!
-- Test first, execute second, sleep peacefully third!
--
-- ============================================================================
-- Remember: With great data power comes great data responsibility!
-- ============================================================================
