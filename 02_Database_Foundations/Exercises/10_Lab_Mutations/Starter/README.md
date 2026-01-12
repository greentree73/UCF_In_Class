
# Activity: Practice Safe Mutations with UPDATE and DELETE

## Objective

Students will practice using the `UPDATE` and `DELETE` commands safely by following the three-step verification process (SELECT → UPDATE/DELETE → VERIFY) using the `knights_realm` database and `realms` table from previous lessons.

**Learning Outcomes:**
- Execute UPDATE statements with proper WHERE clauses
- Execute DELETE statements with proper WHERE clauses
- Test WHERE clauses before running mutations
- Understand the importance of data safety
- Recognize and prevent "The Great Erasure"



## Prerequisites

- PostgreSQL installed and running
- The `knights_realm` database exists with the `realms` table from previous lessons
- At least 5 sample realm records in the table (name, ruler, description columns)
- Familiarity with SELECT statements
- Understanding of WHERE clause syntax

---

## Before You Start: Important Safety Reminder

⚠️ **ALWAYS follow the three-step process:**

1. **SELECT** — Verify which rows you'll affect
2. **UPDATE/DELETE** — Execute the mutation
3. **VERIFY** — Confirm the change was successful

**NEVER run UPDATE or DELETE without a WHERE clause!**

---

## Part 1: Connect and Verify Your Data

### Step 1: Connect to PostgreSQL

Open your terminal and connect to PostgreSQL:

```bash
psql -U postgres -h localhost
```

### Step 2: Connect to the `knights_realm` Database

```sql
\c knights_realm
```

You should see the prompt change to: `knights_realm=>`

### Step 3: View Your Current Data

```sql
-- See all realms in your table
SELECT * FROM realms;

-- Count how many records you have
SELECT COUNT(*) as total_realms FROM realms;

-- View specific columns
SELECT id, name, ruler FROM realms;
```

**Take note of:**
- How many realms you have
- Which realms exist
- Which rulers govern them
- What descriptions they have

---

## Part 2: Basic UPDATE Practice (Single Row)

### Activity 2.1: Update a Realm Name

**Step 1: Select the row you want to change**

First, pick one realm by ID (e.g., id = 1). View it:

```sql
SELECT * FROM realms WHERE id = 1;
```

Take note of the current values:
- Name: _______________
- Ruler: _______________
- Description: _______________

**Step 2: Write and execute your UPDATE statement**

Update the name of that realm:

```sql
UPDATE realms
SET name = 'The Crystalline Kingdom'
WHERE id = 1;
```

**Step 3: Verify the change worked**

```sql
SELECT * FROM realms WHERE id = 1;
```

**Questions to answer:**
- Did the name change to 'The Crystalline Kingdom'?
- Are all other values the same?
- Is ONLY this one realm affected?

---

### Activity 2.2: Update Multiple Columns

**Step 1: Select a realm to update**

```sql
SELECT * FROM realms WHERE id = 2;
```

**Step 2: Update BOTH the name and ruler**

```sql
UPDATE realms
SET 
    name = 'Twilight Realm',
    ruler = 'King Shadowmere the Wise'
WHERE id = 2;
```

**Step 3: Verify the changes**

```sql
SELECT * FROM realms WHERE id = 2;
```

**Questions to answer:**
- Did both the name and ruler change?
- Did other columns remain unchanged?

---

### Activity 2.3: Update All Records for a Specific Ruler

**Step 1: First, identify which realms share a similar ruler name**

```sql
SELECT * FROM realms WHERE ruler LIKE '%King%';
```

Count how many there are:

```sql
SELECT COUNT(*) as king_count FROM realms WHERE ruler LIKE '%King%';
```

How many did you find? ___________

**Step 2: Update all of them to add a title prefix to their names**

```sql
UPDATE realms
SET name = 'Realm of ' || name
WHERE ruler LIKE '%King%';
```

(The `||` operator concatenates strings in PostgreSQL)

**Step 3: Verify all were updated**

```sql
SELECT * FROM realms WHERE ruler LIKE '%King%';
```

**Questions to answer:**
- How many realms were updated?
- Did all of them get the 'Realm of ' prefix?
- Are all other columns unchanged?

---

## Part 3: DELETE Practice (Single Row)

### Activity 3.1: Delete a Single Realm

**Step 1: Select the realm you want to delete**

Let's delete the realm with the highest ID:

```sql
-- First, find the highest ID
SELECT MAX(id) as highest_id FROM realms;
```

Now view that realm:

```sql
SELECT * FROM realms WHERE id = [highest_id];
```

(Replace [highest_id] with the actual number)

Record the realm details:
- ID: ___________
- Name: _______________
- Ruler: _______________

**Step 2: Delete it**

```sql
DELETE FROM realms
WHERE id = [highest_id];
```

**Step 3: Verify it's gone**

```sql
SELECT * FROM realms WHERE id = [highest_id];
```

(Should return no results)

Also verify you still have other realms:

```sql
SELECT COUNT(*) as remaining_realms FROM realms;
```

**Questions to answer:**
- Is the realm gone?
- Do you still have other realms?
- How many remain? ___________

---

## Part 4: DELETE Practice (Multiple Rows)

### Activity 4.1: Delete All Realms with a Specific Ruler Type

**Step 1: Identify realms by a ruler criteria**

Choose a ruler type to delete (e.g., realms with rulers containing 'Sultan'):

```sql
SELECT * FROM realms WHERE ruler LIKE '%Sultan%';
```

Count them:

```sql
SELECT COUNT(*) as sultan_count FROM realms WHERE ruler LIKE '%Sultan%';
```

How many did you find? ___________

**Step 2: Delete them**

```sql
DELETE FROM realms WHERE ruler LIKE '%Sultan%';
```

**Step 3: Verify they're gone**

```sql
SELECT COUNT(*) as sultan_count FROM realms WHERE ruler LIKE '%Sultan%';
```

(Should be 0)

Also check your total remaining realms:

```sql
SELECT COUNT(*) as total_realms FROM realms;
```

How many total realms remain? ___________

---

## Part 5: Complex WHERE Clauses

### Activity 5.1: Update with Multiple Conditions

**Step 1: Find realms matching multiple criteria**

```sql
SELECT * FROM realms 
WHERE ruler LIKE '%Queen%' AND description IS NOT NULL;
```

**Step 2: Update only those realms**

```sql
UPDATE realms
SET ruler = 'High ' || ruler
WHERE ruler LIKE '%Queen%' AND description IS NOT NULL;
```

**Step 3: Verify**

```sql
SELECT * FROM realms WHERE ruler LIKE 'High%';
```

---

### Activity 5.2: Delete with Complex Conditions

**Step 1: Find realms to delete**

```sql
SELECT * FROM realms 
WHERE (ruler LIKE '%Thane%' OR ruler LIKE '%Dwarven%') AND description LIKE '%mountain%';
```

**Step 2: If any exist, delete them**

```sql
DELETE FROM realms 
WHERE (ruler LIKE '%Thane%' OR ruler LIKE '%Dwarven%') AND description LIKE '%mountain%';
```

**Step 3: Verify**

```sql
SELECT COUNT(*) as remaining FROM realms 
WHERE (ruler LIKE '%Thane%' OR ruler LIKE '%Dwarven%') AND description LIKE '%mountain%';
```

---

## Part 6: Working with NULL Values

### Activity 6.1: Update Realms with Missing Descriptions

**Step 1: Find realms with no description**

```sql
SELECT * FROM realms WHERE description IS NULL;
```

**Step 2: Add a description to them**

```sql
UPDATE realms
SET description = 'A kingdom waiting for its story to be written'
WHERE description IS NULL;
```

**Step 3: Verify**

```sql
SELECT * FROM realms WHERE description IS NULL;
```

(Should return no results)

---

## Part 7: Transaction-Based Testing

### Activity 7.1: Test a Mutation Before Committing

**Step 1: Start a transaction**

```sql
BEGIN TRANSACTION;
```

**Step 2: Make a change**

```sql
UPDATE realms
SET ruler = 'TEST RULER'
WHERE id = 1;
```

**Step 3: Verify the change**

```sql
SELECT * FROM realms WHERE id = 1;
```

**Step 4: Choose to keep or discard**

Option A: Keep the changes (saves permanently)
```sql
COMMIT;
```

Option B: Discard the changes (undo)
```sql
ROLLBACK;
```

**Questions to answer:**
- Did you see the change in Step 3?
- After COMMIT or ROLLBACK, did the change persist or undo?

---

## Part 8: Final Data Verification

### Review Your Final State

After completing all activities, run these queries:

```sql
-- See all remaining realms
SELECT * FROM realms;

-- Count total realms
SELECT COUNT(*) as total FROM realms;

-- Get realm count by ruler type
SELECT ruler, COUNT(*) as count FROM realms GROUP BY ruler;

-- Find any with NULL descriptions
SELECT * FROM realms WHERE description IS NULL;
```

---

## Challenges (Optional Extensions)

If you finish early, try these advanced tasks:

### Challenge 1: Conditional Updates

```sql
-- Update description based on ruler type
UPDATE realms
SET description = 'A powerful kingdom'
WHERE ruler LIKE '%King%' AND description IS NULL;
```

### Challenge 2: Using CASE in Updates

```sql
-- Update realm names based on ruler type
UPDATE realms
SET name = CASE
    WHEN ruler LIKE '%King%' THEN 'Royal ' || name
    WHEN ruler LIKE '%Queen%' THEN 'Imperial ' || name
    WHEN ruler LIKE '%Sultan%' THEN 'Desert ' || name
    ELSE name
END;
```

### Challenge 3: Bulk Operations with Safety

Create a backup before making large changes:

```sql
-- Create a backup table
CREATE TABLE realms_backup AS SELECT * FROM realms;

-- Now you can safely experiment
UPDATE realms SET ruler = 'New Ruler' WHERE ruler = 'Old Ruler';

-- If something goes wrong, restore:
DELETE FROM realms;
INSERT INTO realms SELECT * FROM realms_backup;
```

### Challenge 4: Finding and Fixing Data

```sql
-- Find realms with incomplete data
SELECT * FROM realms 
WHERE description IS NULL OR ruler IS NULL OR name IS NULL;

-- Update all incomplete records
UPDATE realms
SET description = 'A realm to be discovered'
WHERE description IS NULL;
```

---

## Troubleshooting

### Issue: "ERROR: syntax error at or near WHERE"
- **Solution:** Make sure your WHERE clause syntax is correct
- Check that column names are spelled correctly
- Verify you're using the correct operators (=, !=, LIKE, etc.)

### Issue: "0 rows affected" after UPDATE
- **Solution:** Your WHERE clause didn't match any rows
- Run `SELECT * FROM locations WHERE ...` to verify rows exist
- Double-check your condition syntax

### Issue: Changed the wrong rows
- **Solution:** If you haven't closed psql, you can ROLLBACK the transaction
- Always use transactions when unsure: `BEGIN; UPDATE...; ROLLBACK;`

### Issue: Accidentally deleted rows
- **Solution:** Recover from backup (if available)
- Lesson learned: Always verify with SELECT first!

---

## ✓ Completion Checklist

After completing this activity, verify:

- [ ] Connected to `knights_realm` database
- [ ] Viewed all current realms
- [ ] Updated a single realm's name
- [ ] Updated multiple columns in one statement
- [ ] Updated multiple realms based on ruler criteria
- [ ] Deleted a single realm by ID
- [ ] Verified deletion with SELECT
- [ ] Deleted multiple realms based on criteria
- [ ] Used complex WHERE clauses with AND/OR
- [ ] Updated records with NULL values
- [ ] Used a transaction to test changes
- [ ] Ran final verification queries
- [ ] Understood the three-step safety process (SELECT → UPDATE/DELETE → VERIFY)
- [ ] Explained why WHERE clauses are critical

---

## 🔑 Key Takeaways

1. **Always follow the three-step process:**
   - Step 1: SELECT to verify rows
   - Step 2: UPDATE or DELETE
   - Step 3: VERIFY the results

2. **The WHERE clause is your safety net** — Use it EVERY TIME

3. **Test before you execute** — Run SELECT first to see what you'll affect

4. **Use transactions for testing** — BEGIN/COMMIT/ROLLBACK are your friends

5. **Be specific with conditions** — The more precise, the safer

6. **Never rush mutations** — Take your time and think through the impact

7. **Data is precious** — Treat every UPDATE and DELETE with respect

---

## Related Lessons

- **Facilitator Lesson:** [Mutations and Data Safety](../../09_Fac_Mutations/)
- **Previous:** [Inserting Data - INSERT Statements](../../08_Lab_Table_Data/)
- **Next:** [Advanced Queries and Joins](../../TODO/)

---

**Remember: Test first, execute second, sleep peacefully third!** ✅

Always verify your WHERE clause. Always use the three-step process. Always respect your data.

Good luck! 🏰


