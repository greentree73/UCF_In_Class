# Activity: Insert Records into the `realms` Table

## Objective
Students will use their existing `knights_realm` database and `realms` table to insert sample realm records. This activity reinforces fundamental SQL INSERT operations and data manipulation skills using both DBeaver and psql.

**Learning Outcomes:**
- Execute INSERT statements to add records to a table
- Understand the structure of INSERT statements
- Practice data entry in both terminal and GUI environments
- Verify inserted data using SELECT queries

**Estimated time:** 15 minutes

## Prerequisites
- PostgreSQL installed and running
- The `knights_realm` database and `realms` table already created (from previous lab)
- Access to either psql terminal or DBeaver GUI
- Basic understanding of SQL syntax
- Table structure reminder:
  - `id` — SERIAL PRIMARY KEY (auto-generated)
  - `name` — VARCHAR(120)
  - `ruler` — VARCHAR(100)
  - `description` — TEXT

## Steps

### Part 1: Connect to Your Database

#### Option A: Using psql (Terminal)

1) Open your terminal and connect to PostgreSQL:

```bash
psql -U postgres -h localhost
```

2) Connect to your `knights_realm` database:

```sql
\c knights_realm
```

You should see the prompt change to show: `knights_realm=>`

3) Verify your `realms` table exists:

```sql
\dt
```

You should see `realms` listed in the output.

#### Option B: Using DBeaver (GUI)

1) Open DBeaver
2) Navigate to your `knights_realm` database in the left panel
3) Expand the `Tables` folder to see your `realms` table
4) Right-click on the `realms` table and select "Open SQL Script" or create a new SQL Editor tab
5) You're ready to execute INSERT statements!

---

### Part 2: Understanding the INSERT Statement Structure

Before inserting data, let's understand what happens:

```sql
INSERT INTO realms (name, ruler, description)
              ↑               ↑
         TABLE NAME      COLUMN NAMES
VALUES ('Knights Realm', 'Queen Isolde', 'A misty realm...');
        ↑                                           ↑
     VALUES (data goes here, in same order as columns)
```

**Key Points:**
- `INSERT INTO realms` — Specifies the table where data will be added
- `(name, ruler, description)` — Lists the COLUMNS you want to populate
- We DO NOT include `id` because it's SERIAL (auto-generated)
- `VALUES (...)` — Contains the actual data being inserted
- String values MUST be wrapped in single quotes: `'value'`
- The order of values MUST match the order of columns

---

### Part 3: Insert Sample Realm Records

Choose your method below and execute these INSERT statements:

#### Method 1: Insert Records One at a Time (Recommended for Learning)

Execute each statement individually to see the results:

```sql
-- Record 1: The Northern Realm
INSERT INTO realms (name, ruler, description)
VALUES (
  'Northern Realm',
  'King Aldric the Bold',
  'A cold, mountainous kingdom known for brave warriors and legendary dragon slayers.'
);
```

After executing, you should see: `INSERT 0 1` (meaning 1 record was inserted)

```sql
-- Record 2: The Enchanted Forest
INSERT INTO realms (name, ruler, description)
VALUES (
  'Enchanted Forest',
  'Queen Sylphia',
  'A mystical woodland realm where ancient magic flows through the ancient trees and magical creatures roam freely.'
);
```

```sql
-- Record 3: The Desert Kingdom
INSERT INTO realms (name, ruler, description)
VALUES (
  'Desert Kingdom',
  'Sultan Rashid the Wise',
  'A sprawling desert empire built on trade routes. Home to master merchants and sand-sailors.'
);
```

```sql
-- Record 4: The Coastal Dominion
INSERT INTO realms (name, ruler, description)
VALUES (
  'Coastal Dominion',
  'Admiral Lady Coretta',
  'A maritime realm of skilled sailors, pirates, and fishing villages. The wealth flows from the seas.'
);
```

```sql
-- Record 5: The Dwarven Hold
INSERT INTO realms (name, ruler, description)
VALUES (
  'Dwarven Hold',
  'Thane Gordin Ironbeard',
  'Underground kingdom carved deep beneath the mountains. Renowned for craftsmanship and mining riches.'
);
```

#### Method 2: Insert Multiple Records at Once (Advanced)

If you prefer, you can insert all records in a single statement:

```sql
-- Insert all realms in one statement
INSERT INTO realms (name, ruler, description) VALUES
('Northern Realm', 'King Aldric the Bold', 'A cold, mountainous kingdom known for brave warriors and legendary dragon slayers.'),
('Enchanted Forest', 'Queen Sylphia', 'A mystical woodland realm where ancient magic flows through the ancient trees and magical creatures roam freely.'),
('Desert Kingdom', 'Sultan Rashid the Wise', 'A sprawling desert empire built on trade routes. Home to master merchants and sand-sailors.'),
('Coastal Dominion', 'Admiral Lady Coretta', 'A maritime realm of skilled sailors, pirates, and fishing villages. The wealth flows from the seas.'),
('Dwarven Hold', 'Thane Gordin Ironbeard', 'Underground kingdom carved deep beneath the mountains. Renowned for craftsmanship and mining riches.');
```

After executing, you should see: `INSERT 0 5` (meaning 5 records were inserted)

---

### Part 4: Verify Your Data

After inserting records, verify they were stored correctly:

```sql
-- View all realms
SELECT * FROM realms;
```

You should see output similar to:

```
 id |      name       |         ruler         |                                   description
----+-----------------+-----------------------+------------------------------------------------------
  1 | Northern Realm  | King Aldric the Bold  | A cold, mountainous kingdom known for brave warriors...
  2 | Enchanted Forest| Queen Sylphia         | A mystical woodland realm where ancient magic flows...
  3 | Desert Kingdom  | Sultan Rashid the Wise| A sprawling desert empire built on trade routes...
  4 | Coastal Dominion| Admiral Lady Coretta  | A maritime realm of skilled sailors, pirates, and...
  5 | Dwarven Hold    | Thane Gordin Ironbeard| Underground kingdom carved deep beneath the mountains...
```

### Part 5: Additional Queries to Explore

Try these SELECT queries to practice retrieving data:

```sql
-- View only the name and ruler columns
SELECT name, ruler FROM realms;

-- View realms with a specific ruler name
SELECT * FROM realms WHERE ruler LIKE '%King%';

-- Count how many realms exist
SELECT COUNT(*) as total_realms FROM realms;

-- Order realms by name alphabetically
SELECT * FROM realms ORDER BY name ASC;
```

## Notes and Troubleshooting

### Common Issues and Solutions

**Issue 1: "ERROR: syntax error at or near 'VALUES'"**
- **Cause:** Missing comma between statements or incorrect quote usage
- **Solution:** Make sure each statement ends with a semicolon `;` and use single quotes `'` for string values

**Issue 2: "ERROR: relation 'realms' does not exist"**
- **Cause:** You're not connected to the right database or the table wasn't created
- **Solution:** 
  - In psql: Run `\c knights_realm` to connect to the database
  - Run `\dt` to verify the table exists
  - If it doesn't exist, create it (refer to previous lab activity)

**Issue 3: "ERROR: duplicate key value violates unique constraint"**
- **Cause:** Trying to insert a record with an ID that already exists
- **Solution:** Let PostgreSQL auto-generate IDs by not specifying the `id` column in your INSERT statement

**Issue 4: INSERT statement ran but no feedback**
- **Cause:** Normal behavior - PostgreSQL just doesn't always print results
- **Solution:** Run `SELECT * FROM realms;` to verify your data was inserted

### DBeaver Tips

1. **Executing Statements:**
   - Highlight the SQL statement you want to run
   - Press `Ctrl+Enter` (or `Cmd+Enter` on Mac) to execute
   - Or use the Execute button in the toolbar

2. **Viewing Results:**
   - Results appear in a table below your SQL editor
   - Click column headers to sort
   - Right-click on the results to copy data

3. **Formatting:**
   - Use `Ctrl+Shift+F` to auto-format your SQL code
   - Makes it easier to read and spot errors

### psql Tips

1. **Copy-Paste Multiple Statements:**
   - You can paste multiple statements at once
   - Each must end with a semicolon `;`
   - Press Enter after the last semicolon to execute

2. **Useful Commands:**
   - `\dt` — List all tables
   - `\d realms` — Show the structure of the realms table
   - `\q` — Quit psql
   - `UP Arrow` — Recall previous commands

3. **Fixing Typos:**
   - If you make a mistake, press `Ctrl+C` to cancel
   - Or complete the statement correctly and try again

## Helpful Resources

- **PostgreSQL INSERT Documentation:** https://www.postgresql.org/docs/current/sql-insert.html
- **PostgreSQL SELECT Documentation:** https://www.postgresql.org/docs/current/sql-select.html
- **DBeaver Tutorial:** https://dbeaver.io/docs/
- **PostgreSQL Tutorial:** https://www.postgresqltutorial.com/postgresql-tutorial/postgresql-insert/
- **Interactive SQL Learning:** https://sqlzoo.net/

## Verification Checklist

After completing this activity, verify you have accomplished:

- [ ] Connected to the `knights_realm` database successfully
- [ ] Inserted at least 5 realm records into the `realms` table
- [ ] Each realm has a name, ruler, and description
- [ ] Running `SELECT * FROM realms;` shows all your inserted records
- [ ] The `id` column shows auto-generated values (1, 2, 3, etc.)
- [ ] You understand the structure of an INSERT statement
- [ ] You can explain which parts are column names vs. values
- [ ] You can run SELECT queries to filter and view specific data
- [ ] You successfully tested both Method 1 (individual inserts) and/or Method 2 (batch insert)

## Challenge Extension (Optional)

If you finish early, try these advanced tasks:

1. **Add More Realms:**
   ```sql
   INSERT INTO realms (name, ruler, description)
   VALUES ('Your Custom Realm', 'Your Custom Ruler', 'Your custom description');
   ```

2. **Update a Realm:**
   ```sql
   UPDATE realms SET ruler = 'New Ruler Name' WHERE name = 'Northern Realm';
   ```

3. **Delete a Realm:**
   ```sql
   DELETE FROM realms WHERE id = 1;
   ```

4. **Complex Queries:**
   ```sql
   -- Find realms where the ruler name contains a specific word
   SELECT * FROM realms WHERE ruler LIKE '%King%';
   
   -- Count realms
   SELECT COUNT(*) as total_realms FROM realms;
   
   -- Order realms by name
   SELECT name, ruler FROM realms ORDER BY name;
   ```

---

**Good luck, and happy database building!** 🏰

