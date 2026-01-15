-- ============================================================================
-- SOLUTION: Practice Safe Mutations with UPDATE and DELETE
-- ============================================================================


-- ============================================================================
-- PART 1: CONNECT AND VERIFY YOUR DATA - SOLUTION
-- ============================================================================

-- Connect to the knights_realm database
\c knights_realm

-- View all realms in your table
SELECT * FROM realms;

-- Count how many records you have
SELECT COUNT(*) as total_realms FROM realms;

-- View specific columns
SELECT id, name, ruler FROM realms;


-- ============================================================================
--  Update a Realm Name
-- ============================================================================
-- Objective: Update realm id = 1 with a new name

-- Step 1: Select the row you want to change
SELECT * FROM realms WHERE id = 1;

-- Step 2: Write and execute your UPDATE statement
-- Update the name of realm id = 1 to 'The Crystalline Kingdom'
UPDATE realms
SET name = 'The Crystalline Kingdom'
WHERE id = 1;

-- Step 3: Verify the change worked
SELECT * FROM realms WHERE id = 1;

-- Expected Results:
-- - The name should now be 'The Crystalline Kingdom'
-- - All other values should remain unchanged
-- - ONLY realm with id = 1 should be affected


-- ============================================================================
--  Update Multiple Columns
-- ============================================================================
-- Objective: Update realm id = 2 with new name and ruler

-- Step 1: Select a realm to update
SELECT * FROM realms WHERE id = 2;

-- Step 2: Update BOTH the name and ruler
UPDATE realms
SET 
    name = 'Twilight Realm',
    ruler = 'King Shadowmere the Wise'
WHERE id = 2;

-- Step 3: Verify the changes
SELECT * FROM realms WHERE id = 2;

-- Expected Results:
-- - Name should be 'Twilight Realm'
-- - Ruler should be 'King Shadowmere the Wise'
-- - Other columns should remain unchanged
-- - Only realm id = 2 should be affected


-- ============================================================================
--  Update All Records for a Specific Ruler
-- ============================================================================
-- Objective: Add 'Realm of ' prefix to all realm names with rulers containing 'King'

-- Step 1: First, identify which realms have rulers with 'King' in their name
SELECT * FROM realms WHERE ruler LIKE '%King%';

-- Count how many there are
SELECT COUNT(*) as king_count FROM realms WHERE ruler LIKE '%King%';

-- Step 2: Update all of them to add a prefix to their names
-- The || operator concatenates strings in PostgreSQL
UPDATE realms
SET name = 'Realm of ' || name
WHERE ruler LIKE '%King%';

-- Step 3: Verify all were updated
SELECT * FROM realms WHERE ruler LIKE '%King%';

-- Expected Results:
-- - All realm names with King rulers should start with 'Realm of '
-- - If there were 3 realms with King rulers, all 3 should be updated
-- - All other columns remain unchanged


-- ============================================================================
-- PART 3: DELETE PRACTICE (SINGLE ROW) - SOLUTION
-- ============================================================================

-- ============================================================================
--  Delete a Single Realm
-- ============================================================================
-- Objective: Delete the realm with the highest ID safely

-- Step 1: First, find the highest ID
SELECT MAX(id) as highest_id FROM realms;

-- View that realm before deleting
-- (Replace 5 with the actual highest ID from your table)
SELECT * FROM realms WHERE id = 5;

-- Alternative: If you want to see what will be deleted before committing
BEGIN TRANSACTION;
DELETE FROM realms WHERE id = 5;
SELECT * FROM realms WHERE id = 5;
-- ROLLBACK; -- Use this if you change your mind
COMMIT;    -- Use this to confirm the deletion

-- Step 3: Verify it's gone
SELECT * FROM realms WHERE id = 5;
-- Should return no results

-- Also verify you still have other realms
SELECT COUNT(*) as remaining_realms FROM realms;

-- Expected Results:
-- - The realm with the highest ID should be deleted
-- - Other realms should remain
-- - Total count should be reduced by 1


-- ============================================================================
-- PART 4: DELETE PRACTICE (MULTIPLE ROWS) - SOLUTION
-- ============================================================================

-- ============================================================================
-- ACTIVITY 4.1: Delete All Realms with Rulers Containing 'Sultan'
-- ============================================================================
-- Objective: Delete all realms with rulers containing 'Sultan'

-- Step 1: Identify realms with 'Sultan' rulers
SELECT * FROM realms WHERE ruler LIKE '%Sultan%';

-- Count them
SELECT COUNT(*) as sultan_count FROM realms WHERE ruler LIKE '%Sultan%';

-- Step 2: Delete them
DELETE FROM realms WHERE ruler LIKE '%Sultan%';

-- Step 3: Verify they're gone
SELECT COUNT(*) as sultan_count FROM realms WHERE ruler LIKE '%Sultan%';
-- Should return 0

-- Check total remaining realms
SELECT COUNT(*) as total_realms FROM realms;

-- Expected Results:
-- - All realms with Sultan rulers should be deleted
-- - Query for Sultan rulers should return 0 rows
-- - Other realms should remain untouched


-- ============================================================================
-- PART 5: COMPLEX WHERE CLAUSES - SOLUTION
-- ============================================================================

-- ============================================================================
-- ACTIVITY 5.1: Update with Multiple Conditions
-- ============================================================================
-- Objective: Update only realms with Queen rulers that have descriptions

-- Step 1: Find realms matching multiple criteria
SELECT * FROM realms 
WHERE ruler LIKE '%Queen%' AND adescription IS NOT NULL;

-- Step 2: Update only those realms
UPDATE realms
SET ruler = 'High ' || ruler
WHERE ruler LIKE '%Queen%' AND adescription IS NOT NULL;

-- Step 3: Verify
SELECT * FROM realms WHERE ruler LIKE 'High%';

-- Expected Results:
-- - Only Queen rulers WITH descriptions should be updated
-- - Queen rulers WITHOUT descriptions stay unchanged
-- - Ruler names should have 'High ' prefix


-- ============================================================================
-- ACTIVITY 5.2: Delete with Complex Conditions
-- ============================================================================
-- Objective: Delete realms with Thane/Dwarven rulers AND 'mountain' in description

-- Step 1: Find realms to delete
SELECT * FROM realms 
WHERE (ruler LIKE '%Thane%' OR ruler LIKE '%Dwarven%') AND adescription LIKE '%mountain%';

-- Step 2: If any exist, delete them
DELETE FROM realms 
WHERE (ruler LIKE '%Thane%' OR ruler LIKE '%Dwarven%') AND adescription LIKE '%mountain%';

-- Step 3: Verify

SELECT COUNT(*) as remaining FROM realms 
WHERE (ruler LIKE '%Thane%' OR ruler LIKE '%Dwarven%') AND adescription LIKE '%mountain%';

-- Should return 0

-- Expected Results:
-- - Only realms matching BOTH conditions should be deleted
-- - Other Thane/Dwarven realms remain
-- - Other realms remain untouched


-- ============================================================================
-- PART 6: WORKING WITH NULL VALUES - SOLUTION
-- ============================================================================

-- ============================================================================
-- ACTIVITY 6.1: Update Realms with Missing Descriptions
-- ============================================================================
-- Objective: Add a default description to all realms missing one

-- Step 1: Find realms with no description
SELECT * FROM realms WHERE adescription IS NULL;

-- Step 2: Add a description to them
UPDATE realms
SET adescription = 'A kingdom waiting for its story to be written'
WHERE adescription IS NULL;

-- Step 3: Verify
SELECT * FROM realms WHERE adescription IS NULL;
-- Should return no results (0 rows)

-- Also verify the update worked
SELECT * FROM realms WHERE adescription = 'A kingdom waiting for its story to be written';

-- Expected Results:
-- - All realms that had NULL description now have the default text
-- - No realms should have NULL in adescription column anymore


-- ============================================================================
-- PART 7: TRANSACTION-BASED TESTING - SOLUTION
-- ============================================================================

-- ============================================================================
-- ACTIVITY 7.1: Test a Mutation Before Committing
-- ============================================================================
-- Objective: Use transactions to safely test changes

-- Step 1: Start a transaction
BEGIN TRANSACTION;

-- Step 2: Make a change
UPDATE realms
SET ruler = 'TEST RULER'
WHERE id = 1;

-- Step 3: Verify the change (should show TEST RULER)
SELECT * FROM realms WHERE id = 1;

-- Step 4: Choose to keep or discard
-- Option A: Keep the changes (save permanently)
COMMIT;

-- Option B: Discard the changes (undo)
-- ROLLBACK;

-- If we used COMMIT above, verify change is permanent:
SELECT * FROM realms WHERE id = 1;
-- Should show ruler as 'TEST RULER'

-- If we used ROLLBACK, verify change was undone:
-- SELECT * FROM realms WHERE id = 1;
-- Should show original ruler value

-- To undo the TEST RULER change, we can do:
UPDATE realms
SET ruler = 'Original Ruler Name'
WHERE id = 1;


-- ============================================================================
-- PART 8: FINAL DATA VERIFICATION - SOLUTION
-- ============================================================================

-- See all remaining realms
SELECT * FROM realms;

-- Count total realms
SELECT COUNT(*) as total FROM realms;

-- Group by ruler to see distribution
SELECT ruler, COUNT(*) as count FROM realms GROUP BY ruler;

-- Find any with NULL descriptions
SELECT * FROM realms WHERE adescription IS NULL;
-- Should return no results if Activity 6.1 was completed


-- ============================================================================
-- CHALLENGES (OPTIONAL EXTENSIONS) - SOLUTION
-- ============================================================================

-- ============================================================================
-- CHALLENGE 1: Conditional Updates
-- ============================================================================
-- Update description based on ruler type for realms missing descriptions

UPDATE realms
SET adescription = 'A powerful kingdom'
WHERE ruler LIKE '%King%' AND adescription IS NULL;

-- Verify
SELECT * FROM realms WHERE ruler LIKE '%King%';


-- ============================================================================
-- CHALLENGE 2: Using CASE in Updates
-- ============================================================================
-- Update realm names based on ruler type

UPDATE realms
SET name = CASE
    WHEN ruler LIKE '%King%' THEN 'Royal ' || name
    WHEN ruler LIKE '%Queen%' THEN 'Imperial ' || name
    WHEN ruler LIKE '%Sultan%' THEN 'Desert ' || name
    ELSE name
END;

-- Verify the changes
SELECT * FROM realms;


-- ============================================================================
-- CHALLENGE 3: Bulk Operations with Safety
-- ============================================================================
-- Create a backup table before making large changes

-- Create a backup table
CREATE TABLE realms_backup AS SELECT * FROM realms;

-- Verify backup was created
SELECT COUNT(*) as backup_count FROM realms_backup;

-- Now you can safely experiment
-- Example: Update all rulers
UPDATE realms SET ruler = 'New Ruler' WHERE ruler = 'Old Ruler';

-- If something goes wrong, restore:
-- DELETE FROM realms;
-- INSERT INTO realms SELECT * FROM realms_backup;

-- Clean up backup when done
DROP TABLE realms_backup;


-- ============================================================================
-- CHALLENGE 4: Finding and Fixing Data
-- ============================================================================
-- Find and fix realms with incomplete data

-- Find realms with incomplete data
SELECT * FROM realms 
WHERE adescription IS NULL OR ruler IS NULL OR name IS NULL;

-- Update all incomplete records
UPDATE realms
SET adescription = 'A realm to be discovered'
WHERE adescription IS NULL;

-- Verify
SELECT * FROM realms 
WHERE adescription IS NULL OR ruler IS NULL OR name IS NULL;


-- ============================================================================
-- SUMMARY: WHAT WE LEARNED
-- ============================================================================
--
-- 1. THE THREE-STEP PROCESS IS CRITICAL:
--    - Step 1: SELECT to verify what you'll affect
--    - Step 2: Execute UPDATE or DELETE
--    - Step 3: VERIFY the results
--
-- 2. THE WHERE CLAUSE IS YOUR SAFETY NET:
--    - Always use WHERE with UPDATE and DELETE
--    - Test WHERE with SELECT first
--    - Be as specific as possible
--
-- 3. TRANSACTIONS HELP WITH TESTING:
--    - BEGIN TRANSACTION starts a test
--    - COMMIT saves changes permanently
--    - ROLLBACK undoes all changes
--
-- 4. DIFFERENT WHERE CONDITIONS SERVE DIFFERENT PURPOSES:
--    - Single ID (WHERE id = 1)
--    - Multiple rows (WHERE region = 'Mountains')
--    - Complex conditions (WHERE region = 'X' AND description IS NOT NULL)
--    - Pattern matching (WHERE name LIKE '%Peak%')
--
-- 5. NULL VALUES REQUIRE SPECIAL HANDLING:
--    - Use IS NULL / IS NOT NULL in WHERE clause
--    - Not with = or !=
--
-- ============================================================================
-- FINAL CHECKLIST: ALL ACTIVITIES COMPLETED
-- ============================================================================
--
-- ✅ Part 1: Connected and verified data
-- ✅ Part 2: Updated single and multiple columns
-- ✅ Part 2.3: Updated multiple rows by region
-- ✅ Part 3: Deleted single row by ID
-- ✅ Part 4: Deleted multiple rows by region
-- ✅ Part 5: Used complex WHERE clauses
-- ✅ Part 6: Updated NULL values
-- ✅ Part 7: Used transactions for safety
-- ✅ Part 8: Final verification
-- ✅ Challenges: Completed extension tasks
--
-- ============================================================================
-- KEY TAKEAWAYS
-- ============================================================================
--
-- "With great data power comes great data responsibility!"
--
-- 1. Always test with SELECT before UPDATE/DELETE
-- 2. Always use WHERE clause
-- 3. Always verify your changes
-- 4. Be specific with your conditions
-- 5. Use transactions to test big changes
-- 6. Respect your data!
--
-- ============================================================================
-- Good luck, and remember: Test first, execute second, sleep peacefully third!
-- ============================================================================
