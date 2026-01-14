-- NOTE: Run these commands as a superuser (or a user with CREATE DATABASE privileges).
DROP database if exists adventure;
-- 1) Create the database (run this in the 'postgres' maintenance DB or via psql)
CREATE DATABASE adventure;

-- 2) Connect to the adventure database (in psql use: \c adventure)
-- If running via a single psql script, include the meta-command below (psql only):
\c adventure


-- Select the adventure database to confirm connection
select current_database();


-- 3) Create schema objects (tables)
-- Locations table: places in the game world
CREATE TABLE locations (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	region VARCHAR(100)
);


-- ============================================================================
-- INSERTING DATA INTO THE LOCATIONS TABLE
-- ============================================================================

-- Instructions:
-- 1. Ensure you are connected to the 'adventure' database
--    (You should see 'adventure' in the prompt)
-- 2. Copy and paste the INSERT statements below to add sample locations
-- 3. Use SELECT * FROM locations; to view all inserted locations
-- 4. You can modify the values to create custom locations

-- ============================================================================
-- UNDERSTANDING THE INSERT STATEMENT STRUCTURE
-- ============================================================================

-- Basic PostgreSQL INSERT Syntax:
-- INSERT INTO table_name (column1, column2, column3)
-- VALUES (value1, value2, value3);

-- Breaking down the structure:
-- 
-- 1. INSERT INTO          - The command that tells PostgreSQL to insert data
-- 
-- 2. table_name           - The name of the table where data will be inserted
--                           In our case: 'locations'
-- 
-- 3. (column1, column2...)- The COLUMN NAMES in parentheses
--                           Specifies WHICH columns will receive data
--                           Our example columns: name, description, region
--                           NOTE: We DON'T include 'id' because it's auto-generated
-- 
-- 4. VALUES               - The keyword indicating the data section
-- 
-- 5. (value1, value2...)  - The actual DATA VALUES in parentheses
--                           The order MUST match the column order
--                           String values must be wrapped in single quotes: 'text'
--                           Example: 'Silverwood Forest'
-- 
-- Example with annotations:
-- INSERT INTO locations (name,           description,                          region)
--                        ^^^^^           ^^^^^^^^^^^                           ^^^^^^
--                      COLUMN 1        COLUMN 2                             COLUMN 3
-- VALUES ('Silverwood', 'A dense forest', 'Northern Forests');
--         ^^^^^^^^^^^^^  ^^^^^^^^^^^^^^^   ^^^^^^^^^^^^^^^^^^
--         VALUE 1        VALUE 2          VALUE 3

-- ============================================================================
-- Sample INSERT Statements
-- ============================================================================

-- EXAMPLE 1: Detailed breakdown of an INSERT statement
-- 
-- The statement below demonstrates the full structure:
--
-- INSERT INTO locations     <- Command + Table name (WHERE the data goes)
-- (name, description, region)  <- COLUMN NAMES (WHICH columns to populate)
-- VALUES (
--   'Silverwood Forest',    <- VALUE for 'name' column (text in quotes)
--   'A dense forest...',    <- VALUE for 'description' column (text in quotes)
--   'Northern Forests'      <- VALUE for 'region' column (text in quotes)
-- );

-- Insert a location in the Northern Forest region
INSERT INTO locations (name, description, region)
VALUES (
	'Silverwood Forest',
	'A dense forest with ancient silver birch trees. Sunlight filters through the canopy, and the air smells of pine and earth. Home to various woodland creatures.',
	'Northern Forests'
);

-- Insert a location in the Mountain region
INSERT INTO locations (name, description, region)
VALUES (
	'Eagle Peak',
	'The highest mountain in the realm with snow-capped peaks. The air is thin and cold. From the summit, you can see for miles in every direction.',
	'Mountains'
);

-- Insert a location in the Coastal region
INSERT INTO locations (name, description, region)
VALUES (
	'Crescent Bay',
	'A beautiful sandy beach with calm turquoise waters. Seagulls soar overhead, and the smell of salt fills the air. Perfect for adventurers seeking rest.',
	'Coastal Areas'
);

-- Insert a location in the Desert region
INSERT INTO locations (name, description, region)
VALUES (
	'Scorched Sands',
	'An endless desert of golden sand dunes. The heat is oppressive during the day, but the nights are freezing. Mirages dance on the horizon.',
	'Deserts'
);

-- Insert a location in the Underground region
INSERT INTO locations (name, description, region)
VALUES (
	'Crystal Caverns',
	'A sprawling network of caves deep beneath the earth. Glowing crystals illuminate the darkness with a soft blue light. Strange echoes bounce off the walls.',
	'Underground'
);

-- ============================================================================
-- More Examples (Optional)
-- ============================================================================

-- Urban location example
INSERT INTO locations (name, description, region)
VALUES (
	'Merchant''s Quarter',
	'A bustling marketplace filled with vendors and traders. Colorful stalls line cobblestone streets. The air fills with the sounds of commerce and haggling.',
	'Civilized Lands'
);

-- Magical location example
INSERT INTO locations (name, description, region)
VALUES (
	'Arcane Tower',
	'An ancient tower crackling with magical energy. Runes glow faintly on the walls. The air tingles with raw magical power. Few dare to enter.',
	'Magical Realms'
);

-- ============================================================================
-- VIEWING YOUR DATA
-- ============================================================================

-- To view all locations you have inserted:
-- SELECT * FROM locations;

-- To view locations in a specific region:
-- SELECT * FROM locations WHERE region = 'Mountains';

-- To view location details with formatting:
-- SELECT id, name, region FROM locations ORDER BY region;

-- To count how many locations exist:
-- SELECT COUNT(*) FROM locations;

-- ============================================================================
-- IMPORTANT NOTES ABOUT INSERT STATEMENTS
-- ============================================================================

-- 1. COLUMN ORDER MATTERS:
--    The order of column names MUST match the order of values
--    CORRECT:   INSERT INTO locations (name, region) VALUES ('Forest', 'North');
--    WRONG:     INSERT INTO locations (region, name) VALUES ('Forest', 'North');
--                                      ^^^^^^  ^^^^           ^^^^^^^  ^^^^^
--                                      order 1 order 2        wrong!   wrong!

-- 2. DATA TYPES:
--    - TEXT/VARCHAR: String values MUST be wrapped in single quotes: 'value'
--    - SERIAL/INT: Numbers DO NOT need quotes: 123
--    - Our table structure:
--      id          -> SERIAL (auto-generated, don't include in INSERT)
--      name        -> VARCHAR(100) (string, needs quotes)
--      description -> TEXT (string, needs quotes)
--      region      -> VARCHAR(100) (string, needs quotes)

-- 3. SINGLE QUOTES vs DOUBLE QUOTES:
--    - Single quotes 'value' are for DATA VALUES
--    - Double quotes "column_name" are for column/table names (optional in most cases)
--    CORRECT:   INSERT INTO locations (name) VALUES ('Forest');
--    WRONG:     INSERT INTO locations (name) VALUES ("Forest");

-- 4. ESCAPING SINGLE QUOTES:
--    If your value contains a single quote, use two single quotes:
--    INSERT INTO locations (name) VALUES ('Merchant''s Quarter');
--                                                   ^^
--                                                   Two single quotes = One quote in data

-- 5. OMITTING THE ID COLUMN:
--    - The 'id' column is SERIAL (auto-incrementing)
--    - PostgreSQL automatically generates the next ID
--    - DO NOT include id in your INSERT statement
--    - The id will be created automatically (1, 2, 3, etc.)

-- 6. MULTIPLE INSERTS:
--    You can insert multiple rows at once:
--    INSERT INTO locations (name, region) VALUES
--    ('Location 1', 'Region A'),
--    ('Location 2', 'Region B'),
--    ('Location 3', 'Region C');