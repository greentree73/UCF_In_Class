-- ============================================================================
-- File: types.sql
-- Purpose: Demonstrate PostgreSQL data types with CREATE TABLE and ALTER TABLE
-- Description: This file drops and recreates the locations table with expanded
--              columns representing different data types, includes ALTER TABLE
--              examples, and inserts 30 sample records
-- Usage: psql -U postgres -d adventure -f types.sql
-- ============================================================================

-- Connect to the adventure database
\c adventure

-- ============================================================================
-- PART 1: DROP EXISTING TABLE (if exists)
-- ============================================================================
-- This safely removes the old locations table before creating a new version
-- The CASCADE keyword removes any dependent objects (constraints, indexes)
DROP TABLE IF EXISTS locations CASCADE;

-- ============================================================================
-- PART 2: CREATE ENHANCED LOCATIONS TABLE WITH DATA TYPES
-- ============================================================================
-- This CREATE TABLE statement demonstrates multiple PostgreSQL data types
-- Comments explain the purpose and type of each column

CREATE TABLE locations (
  -- ========== Identifiers ==========
  -- SERIAL: Auto-incrementing integer (1, 2, 3, ...)
  id SERIAL PRIMARY KEY,
  
  -- UUID: Globally unique identifier (rarely needs to be indexed separately)
  unique_code UUID NOT NULL DEFAULT gen_random_uuid(),
  
  -- ========== Text Information ==========
  -- VARCHAR(n): Variable-length text up to n characters (most common)
  name VARCHAR(120) NOT NULL,
  
  -- TEXT: Unlimited variable-length text (good for descriptions)
  description TEXT,
  
  -- VARCHAR: Another text field for region/location grouping
  region VARCHAR(100),
  
  -- TEXT[]: Array of text values (for keywords/tags)
  keywords TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- ========== Numeric Information ==========
  -- INTEGER: Whole numbers for counts and populations
  visitor_count INTEGER DEFAULT 0,
  
  -- INTEGER: Another numeric field for measurements
  elevation_meters INTEGER,
  
  -- SMALLINT: Small whole numbers (1-5 for ratings)
  difficulty_rating SMALLINT DEFAULT 3 CHECK (difficulty_rating BETWEEN 1 AND 5),
  
  -- DECIMAL(precision, scale): Exact decimals for money/currency
  -- precision=8 (total digits), scale=2 (digits after decimal)
  entrance_fee DECIMAL(8, 2) DEFAULT 0.00,
  
  -- REAL: Approximate floating-point for scientific data
  average_temperature REAL,
  
  -- ========== Boolean Flags ==========
  -- BOOLEAN: True/False values for features and attributes
  is_accessible BOOLEAN DEFAULT TRUE,
  
  -- Another boolean for facilities
  has_facilities BOOLEAN DEFAULT FALSE,
  
  -- Boolean for permit requirement
  requires_permit BOOLEAN DEFAULT FALSE,
  
  -- Boolean for magical properties
  is_magical BOOLEAN DEFAULT FALSE,
  
  -- ========== Date and Time ==========
  -- DATE: Calendar date (year, month, day) without time
  discovered_date DATE,
  
  -- TIME: Time of day (hours, minutes, seconds) without date
  opening_time TIME DEFAULT '09:00:00',
  
  -- Another TIME field for closing
  closing_time TIME DEFAULT '18:00:00',
  
  -- TIMESTAMP: Date and time together with automatic current timestamp
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- Another timestamp for tracking updates
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  -- ========== Complex Data ==========
  -- JSONB: JSON Binary (structured data as JSON)
  metadata JSONB DEFAULT '{}'::JSONB,
  
  -- Another JSONB for seasonal variations
  seasonal_hours JSONB DEFAULT '{}'::JSONB
);

-- ============================================================================
-- PART 3: CREATE INDEXES FOR BETTER QUERY PERFORMANCE
-- ============================================================================
-- Indexes speed up searches on frequently queried columns

-- Index on name for fast lookups by location name
CREATE INDEX idx_locations_name ON locations (name);

-- Index on region for filtering by region
CREATE INDEX idx_locations_region ON locations (region);

-- Index on difficulty_rating for sorting/filtering by difficulty
CREATE INDEX idx_locations_difficulty ON locations (difficulty_rating);

-- ============================================================================
-- PART 4: ALTER TABLE EXAMPLES
-- ============================================================================
-- ALTER TABLE allows you to modify table structure AFTER creation
-- This is useful for making changes without dropping and recreating the table

-- EXAMPLE 1: Add a new column
-- Syntax: ALTER TABLE table_name ADD COLUMN column_name data_type;
-- Adding a column for visitor reviews/comments
ALTER TABLE locations ADD COLUMN avg_review_score DECIMAL(3, 2) DEFAULT 4.00;

-- EXAMPLE 2: Add a column with constraint
-- This column tracks the number of reviews/ratings the average is based on
ALTER TABLE locations ADD COLUMN review_count INTEGER DEFAULT 0;

-- EXAMPLE 3: Add a column with a DEFAULT value
-- This column stores the best season to visit
ALTER TABLE locations ADD COLUMN best_season VARCHAR(20) DEFAULT 'Summer';

-- EXAMPLE 4: Modify column type (if possible)
-- This changes the region column to allow longer text
-- ALTER TABLE locations ALTER COLUMN region TYPE VARCHAR(150);

-- EXAMPLE 5: Rename a column
-- ALTER TABLE locations RENAME COLUMN old_column_name TO new_column_name;

-- EXAMPLE 6: Drop a column (uncomment if you want to remove)
-- ALTER TABLE locations DROP COLUMN column_to_remove;

-- EXAMPLE 7: Add a UNIQUE constraint
-- This ensures no two locations have the same unique_code
ALTER TABLE locations ADD CONSTRAINT unique_code_unique UNIQUE (unique_code);

-- EXAMPLE 8: Add a CHECK constraint (additional validation)
-- This ensures entrance_fee is never negative
ALTER TABLE locations ADD CONSTRAINT fee_positive CHECK (entrance_fee >= 0);

-- EXAMPLE 9: Add a FOREIGN KEY constraint (if other tables exist)
-- Uncomment when you have a regions table:
-- ALTER TABLE locations ADD CONSTRAINT fk_region 
--   FOREIGN KEY (region) REFERENCES regions(name);

-- ============================================================================
-- PART 5: INSERT 30 SAMPLE RECORDS WITH ALL DATA TYPES
-- ============================================================================
-- These inserts demonstrate how to use each data type when adding records

INSERT INTO locations (
  name, description, region, keywords, visitor_count, elevation_meters,
  difficulty_rating, entrance_fee, average_temperature, is_accessible,
  has_facilities, requires_permit, is_magical, discovered_date, opening_time,
  closing_time, metadata, seasonal_hours, avg_review_score, review_count, best_season
) VALUES
  ('Crystal Falls', 'A breathtaking waterfall with crystal-clear water cascading down rocky cliffs. Home to rare water sprites and magical fish. Perfect for meditation and water magic studies.', 'Northern Mountains', ARRAY['magical', 'waterfall', 'scenic'], 150000, 2500, 3, 15.99, 18.5, TRUE, TRUE, FALSE, TRUE, '1542-06-20', '09:00:00', '18:00:00', '{"tours_available": true, "guides": 5}', '{"summer": "9:00-20:00", "winter": "10:00-18:00"}', 4.7, 1240, 'Summer'),
  
  ('Shadowbrook Forest', 'A dense, ancient forest shrouded in perpetual twilight. The canopy is so thick that sunlight rarely touches the forest floor. Known for mysterious inhabitants and hidden pathways.', 'Eastern Territories', ARRAY['forest', 'dark', 'mysterious'], 75000, 1200, 4, 0.00, 12.0, TRUE, FALSE, TRUE, TRUE, '1823-03-15', '08:00:00', '19:00:00', '{"warning": "permit required", "guides": 3}', '{"summer": "8:00-20:00", "winter": "9:00-17:00"}', 4.2, 856, 'Spring'),
  
  ('Golden Desert Oasis', 'A verdant oasis nestled in the heart of the golden desert. Palm trees circle a pristine freshwater spring. Safe haven for travelers crossing the harsh desert terrain.', 'Southern Desert', ARRAY['oasis', 'peaceful', 'water'], 200000, 50, 1, 8.99, 38.5, TRUE, TRUE, FALSE, FALSE, '1701-07-22', '07:00:00', '19:00:00', '{"water_quality": "pristine", "shade_available": true}', '{"summer": "7:00-19:00", "winter": "8:00-18:00"}', 4.8, 2100, 'Winter'),
  
  ('Misty Marshlands', 'A vast wetland filled with fog and murky water. Treacherous terrain home to bog creatures and swamp druids. Unique flora that glows faintly at night.', 'Western Swamps', ARRAY['swamp', 'mysterious', 'dangerous'], 50000, 10, 5, 0.00, 14.0, FALSE, FALSE, TRUE, TRUE, '1900-05-10', '10:00:00', '16:00:00', '{"dangerous": true, "guides_required": true}', '{"summer": "10:00-16:00", "winter": "11:00-15:00"}', 3.5, 324, 'Never'),
  
  ('Starlight Observatory', 'An ancient structure perched on the highest peak, used by wizards to study celestial phenomena. The night sky is clearer here than anywhere else in the realm.', 'Northern Mountains', ARRAY['magical', 'astronomy', 'research'], 120000, 4200, 2, 12.50, 8.0, TRUE, TRUE, TRUE, TRUE, '1200-01-01', '18:00:00', '06:00:00', '{"research_center": true, "telescope": true}', '{"summer": "18:00-06:00", "winter": "17:00-07:00"}', 4.9, 1876, 'Winter'),
  
  ('Dragon''s Rest Cave', 'A massive cavern within a dormant volcano. Still warm from the dragon''s previous occupancy. Contains rare magical crystals and ancient treasure.', 'Eastern Territories', ARRAY['cave', 'dragon', 'treasure', 'dangerous'], 300000, 1800, 4, 20.00, 45.0, FALSE, FALSE, TRUE, TRUE, '1150-12-03', '06:00:00', '20:00:00', '{"dragon_asleep": true, "treasure": true, "dangerous": true}', '{"summer": "6:00-20:00", "winter": "7:00-19:00"}', 4.6, 2340, 'Always'),
  
  ('Sunlit Meadows', 'Rolling grasslands with wildflowers that bloom year-round. Gentle, peaceful atmosphere perfect for picnics and outdoor gatherings. Home to grazing unicorns.', 'Central Plains', ARRAY['peaceful', 'beautiful', 'flowers'], 180000, 400, 1, 0.00, 22.0, TRUE, TRUE, FALSE, FALSE, '1650-04-12', '08:00:00', '20:00:00', '{"picnic_areas": true, "unicorns": true}', '{"summer": "8:00-21:00", "winter": "9:00-18:00"}', 4.8, 1654, 'Spring'),
  
  ('Midnight Harbor', 'A coastal town built into a natural harbor. Active port for merchant ships and fishing vessels. Known for its vibrant nightlife and fresh seafood markets.', 'Coastal Regions', ARRAY['port', 'trading', 'vibrant'], 450000, 0, 2, 5.00, 16.0, TRUE, TRUE, FALSE, FALSE, '1400-09-14', '00:00:00', '23:59:59', '{"trade_hub": true, "restaurants": 30}', '{"summer": "6:00-23:59", "winter": "7:00-23:00"}', 4.5, 3200, 'Summer'),
  
  ('Forgotten Ruins', 'Ancient stone structures half-buried in earth and overgrown with vines. Archaeological treasure trove with inscriptions in forgotten languages. Danger: magical traps may still be active.', 'Eastern Territories', ARRAY['archaeological', 'ancient', 'dangerous'], 95000, 800, 3, 10.00, 15.0, FALSE, FALSE, TRUE, TRUE, '1200-01-01', '09:00:00', '17:00:00', '{"traps": true, "artifacts": true, "scholars": 8}', '{"summer": "9:00-18:00", "winter": "10:00-16:00"}', 4.1, 642, 'Spring'),
  
  ('Windpeak Valley', 'A narrow valley between two massive mountains where winds howl constantly. Home to wind elementals and air mages. Extreme weather conditions present challenges.', 'Northern Mountains', ARRAY['magical', 'dangerous', 'weather'], 65000, 3600, 4, 0.00, 5.0, TRUE, FALSE, FALSE, TRUE, '1100-02-20', '06:00:00', '18:00:00', '{"wind_elementals": true, "extreme_weather": true}', '{"summer": "6:00-20:00", "winter": "8:00-16:00"}', 3.8, 456, 'Winter'),
  
  ('Crimson Canyon', 'A spectacular gorge with red and orange rock formations. Natural bridge formation spans the main canyon. Popular hiking destination with breathtaking views.', 'Southern Desert', ARRAY['scenic', 'hiking', 'photography'], 220000, 1500, 2, 7.50, 32.0, TRUE, TRUE, FALSE, FALSE, '1875-11-05', '07:00:00', '19:00:00', '{"hiking_trails": 5, "viewpoints": 12}', '{"summer": "7:00-20:00", "winter": "8:00-18:00"}', 4.7, 1980, 'Fall'),
  
  ('Luminous Caverns', 'Underground caves filled with bioluminescent organisms creating natural light. Beautiful crystal formations cover the walls and ceiling. Underground river system.', 'Central Plains', ARRAY['cave', 'magical', 'beautiful'], 140000, -200, 2, 14.99, 20.0, FALSE, FALSE, TRUE, TRUE, '1750-08-30', '09:00:00', '17:00:00', '{"bioluminescent": true, "river": true, "crystals": true}', '{"summer": "9:00-18:00", "winter": "9:00-17:00"}', 4.6, 1245, 'Always'),
  
  ('Moonlight Lake', 'A pristine alpine lake that reflects the moon and stars with remarkable clarity. Surrounded by pine forests and snow-capped peaks. Home to silver trout.', 'Northern Mountains', ARRAY['lake', 'peaceful', 'scenic'], 110000, 2800, 1, 9.99, 7.0, TRUE, TRUE, FALSE, FALSE, '1680-06-11', '06:00:00', '21:00:00', '{"fishing": true, "camping": true, "fish": "silver_trout"}', '{"summer": "6:00-22:00", "winter": "8:00-18:00"}', 4.7, 1123, 'Summer'),
  
  ('Emerald Jungle', 'A tropical rainforest with incredibly dense vegetation. Canopy so thick it blocks most sunlight. Home to exotic wildlife and undiscovered plant species.', 'Southern Desert', ARRAY['jungle', 'exotic', 'dangerous'], 175000, 400, 3, 13.00, 28.0, FALSE, FALSE, TRUE, TRUE, '1920-03-22', '06:00:00', '18:00:00', '{"wildlife": true, "discoveries": true, "undiscovered_species": true}', '{"summer": "6:00-19:00", "winter": "7:00-17:00"}', 4.3, 987, 'Dry'),
  
  ('Pearlescent Shore', 'A beautiful beach with white sand and clear turquoise waters. Seashells with natural iridescent properties wash up on shore. Popular resort destination.', 'Coastal Regions', ARRAY['beach', 'beautiful', 'resort'], 380000, 0, 1, 6.00, 24.0, TRUE, TRUE, FALSE, FALSE, '1800-05-01', '07:00:00', '20:00:00', '{"resort": true, "shells": true, "restaurants": 15}', '{"summer": "7:00-21:00", "winter": "8:00-19:00"}', 4.8, 2876, 'Summer'),
  
  ('Obsidian Mines', 'Active mining operation extracting valuable obsidian and volcanic glass. Tunnels go deep into the earth. Dangerous but profitable venture.', 'Eastern Territories', ARRAY['mining', 'dangerous', 'profitable'], 45000, 800, 4, 25.00, 22.0, FALSE, FALSE, TRUE, FALSE, '1550-07-18', '06:00:00', '18:00:00', '{"mining_active": true, "tunnels_deep": true, "dangerous": true}', '{"summer": "6:00-18:00", "winter": "7:00-17:00"}', 3.9, 534, 'Never'),
  
  ('Twilight Grove', 'A sacred forest where time seems to move differently. Trees are impossibly tall with silver bark. Magical artifacts naturally appear in this location.', 'Western Swamps', ARRAY['magical', 'sacred', 'artifacts'], 85000, 600, 2, 18.00, 16.0, TRUE, FALSE, FALSE, TRUE, '1100-01-01', '12:00:00', '12:00:00', '{"time_magic": true, "artifacts": true, "sacred": true}', '{"summer": "12:00-12:00", "winter": "12:00-12:00"}', 4.4, 721, 'Always'),
  
  ('Serpent''s Den', 'A rocky area filled with caves inhabited by intelligent reptiles. Ancient symbol markings on rocks suggest old civilization. Difficult terrain to navigate.', 'Western Swamps', ARRAY['dangerous', 'reptiles', 'ancient'], 60000, 200, 4, 0.00, 26.0, FALSE, FALSE, TRUE, FALSE, '2000-01-01', '10:00:00', '16:00:00', '{"reptiles": true, "ancient_symbols": true, "dangerous": true}', '{"summer": "10:00-17:00", "winter": "11:00-15:00"}', 3.2, 289, 'Never'),
  
  ('Cloudtop Fortress', 'A military stronghold built on a plateau surrounded by clouds. Impregnable defensive position with strategic view of surrounding lands. Military academy headquarters.', 'Northern Mountains', ARRAY['military', 'fortress', 'strategic'], 80000, 4000, 3, 16.50, 10.0, TRUE, TRUE, TRUE, FALSE, '1300-04-25', '08:00:00', '17:00:00', '{"military": true, "academy": true, "impregnable": true}', '{"summer": "8:00-18:00", "winter": "8:00-16:00"}', 4.2, 698, 'Spring'),
  
  ('Sunken Temple', 'An underwater archaeological site partially submerged in a large freshwater lake. Beautiful ancient architecture still visible underwater. Requires special diving equipment to explore.', 'Central Plains', ARRAY['underwater', 'archaeological', 'ancient'], 125000, -50, 4, 22.00, 18.0, FALSE, FALSE, TRUE, TRUE, '1100-11-11', '10:00:00', '16:00:00', '{"underwater": true, "archaeological": true, "diving_required": true}', '{"summer": "10:00-17:00", "winter": "11:00-15:00"}', 4.5, 934, 'Spring'),
  
  ('Whispering Pines', 'An old-growth forest where the wind through pine branches creates haunting melodies. Calm and peaceful despite the eerie sounds. Meditation retreat popular with monks.', 'Eastern Territories', ARRAY['peaceful', 'meditation', 'spiritual'], 70000, 1000, 1, 11.00, 14.0, TRUE, FALSE, FALSE, FALSE, '1500-09-09', '06:00:00', '20:00:00', '{"meditation_retreat": true, "monks": 12, "peaceful": true}', '{"summer": "6:00-21:00", "winter": "8:00-18:00"}', 4.6, 856, 'Fall'),
  
  ('Golden Citadel', 'A grand city with walls and buildings constructed from golden stone. Capital of the realm with bustling markets and government buildings. Cultural center of learning and arts.', 'Central Plains', ARRAY['city', 'cultural', 'learning'], 950000, 500, 1, 3.50, 20.0, TRUE, TRUE, FALSE, FALSE, '0500-01-01', '06:00:00', '23:59:59', '{"capital": true, "markets": 50, "libraries": 8}', '{"summer": "6:00-24:00", "winter": "7:00-23:00"}', 4.9, 5600, 'Spring'),
  
  ('Phantom Peak', 'A mysterious mountain that appears and disappears in the mist. Legends say it shifts its location periodically. Home to mountain spirits and ethereal beings.', 'Northern Mountains', ARRAY['mysterious', 'magical', 'spirits'], 40000, 3500, 3, 0.00, 2.0, TRUE, FALSE, FALSE, TRUE, '1000-01-01', '06:00:00', '18:00:00', '{"phantom": true, "spirits": true, "magical": true}', '{"summer": "6:00-20:00", "winter": "8:00-16:00"}', 3.7, 234, 'Mist'),
  
  ('Azure Grotto', 'A seaside cave with brilliant blue water reflecting off mineral-rich rocks. Accessible only during low tide. Contains naturally forming saltwater pools.', 'Coastal Regions', ARRAY['cave', 'beautiful', 'tide_dependent'], 190000, 10, 2, 8.50, 18.0, FALSE, FALSE, FALSE, FALSE, '1750-12-20', '10:00:00', '14:00:00', '{"tide_dependent": true, "mineral_water": true, "blue": true}', '{"summer": "10:00-15:00", "winter": "11:00-13:00"}', 4.5, 1234, 'Summer'),
  
  ('Scorched Badlands', 'A barren, rocky terrain with little vegetation due to extreme heat. Dramatic rock formations eroded by wind over millennia. Harsh conditions but mineral-rich soil.', 'Southern Desert', ARRAY['barren', 'harsh', 'mineral_rich'], 85000, 600, 3, 6.00, 42.0, TRUE, FALSE, FALSE, FALSE, '1950-08-08', '06:00:00', '18:00:00', '{"barren": true, "mineral_rich": true, "extreme_heat": true}', '{"summer": "6:00-18:00", "winter": "7:00-17:00"}', 4.0, 567, 'Winter'),
  
  ('Enchanted Glade', 'A magical clearing deep within an ancient forest. Flowers bloom in impossible colors. Time stands still here, creating a pocket of calm in the chaotic world.', 'Western Swamps', ARRAY['magical', 'beautiful', 'rare_flowers'], 110000, 300, 1, 0.00, 19.0, TRUE, FALSE, FALSE, TRUE, '1100-05-05', '00:00:00', '23:59:59', '{"time_magic": true, "flowers": true, "pocket_dimension": true}', '{"summer": "0:00-24:00", "winter": "0:00-24:00"}', 4.8, 1432, 'Always'),
  
  ('Starfall Plains', 'Vast open grasslands where meteorite fragments have created impact craters. Pieces of meteoric stone still scatter the ground. Used as natural compass points.', 'Central Plains', ARRAY['plains', 'meteorites', 'scenic'], 130000, 300, 1, 4.50, 20.0, TRUE, FALSE, FALSE, FALSE, '1200-01-01', '06:00:00', '20:00:00', '{"meteorites": true, "compass_points": true, "vast": true}', '{"summer": "6:00-21:00", "winter": "7:00-19:00"}', 4.4, 987, 'Night'),
  
  ('Frost Peak', 'The coldest mountain in the realm with eternal snow and ice. Base for ice mages and winter scholars. Dangerous avalanche conditions present challenges.', 'Northern Mountains', ARRAY['dangerous', 'magical', 'cold'], 75000, 5200, 4, 17.50, -15.0, FALSE, FALSE, TRUE, TRUE, '1000-01-01', '08:00:00', '16:00:00', '{"avalanche_danger": true, "ice_mages": true, "eternal_winter": true}', '{"summer": "8:00-16:00", "winter": "8:00-16:00"}', 4.1, 645, 'Winter'),
  
  ('Sapphire Springs', 'A natural hot spring area with mineral-rich waters believed to have healing properties. Resort town developed around the springs. Therapeutic bathing pools.', 'Western Swamps', ARRAY['healing', 'resort', 'luxury'], 320000, 100, 1, 19.99, 35.0, TRUE, TRUE, FALSE, FALSE, '1600-02-14', '06:00:00', '22:00:00', '{"healing": true, "resort": true, "pools": 20}', '{"summer": "6:00-23:00", "winter": "7:00-22:00"}', 4.9, 3456, 'Winter'),
  
  ('Storm''s Eye', 'A coastal area where extreme weather patterns converge creating constant storms. Lightning strikes frequently. Dangerous but fascinating natural phenomenon.', 'Coastal Regions', ARRAY['dangerous', 'weather', 'phenomenon'], 55000, 50, 5, 0.00, 12.0, FALSE, FALSE, TRUE, FALSE, '1850-10-15', '00:00:00', '23:59:59', '{"storms": true, "lightning": true, "extreme": true}', '{"summer": "0:00-24:00", "winter": "0:00-24:00"}', 2.8, 156, 'Never');

-- ============================================================================
-- PART 6: VERIFY INSERTS AND DISPLAY SAMPLE DATA
-- ============================================================================
-- Count total locations inserted
SELECT COUNT(*) as total_locations FROM locations;

-- Display all 30 locations with key columns
SELECT 
  id,
  name,
  region,
  difficulty_rating,
  entrance_fee,
  is_magical,
  created_at
FROM locations
ORDER BY name;

-- ============================================================================
-- PART 7: EXAMPLES OF QUERYING WITH DIFFERENT DATA TYPES
-- ============================================================================

-- Query TEXT[]: Find locations with 'magical' keyword
-- EXAMPLE: SELECT locations where array contains specific keyword
SELECT name, keywords FROM locations 
WHERE keywords @> ARRAY['magical']::TEXT[]
ORDER BY name;

-- Query BOOLEAN: Find accessible locations
SELECT name, region, is_accessible FROM locations
WHERE is_accessible = TRUE
ORDER BY name;

-- Query DECIMAL: Find affordable locations (under $10)
SELECT name, entrance_fee FROM locations
WHERE entrance_fee > 0 AND entrance_fee < 10.00
ORDER BY entrance_fee ASC;

-- Query SMALLINT: Find easy locations (difficulty 1-2)
SELECT name, difficulty_rating FROM locations
WHERE difficulty_rating <= 2
ORDER BY difficulty_rating;

-- Query DATE: Find recently discovered locations (after 1800)
SELECT name, discovered_date FROM locations
WHERE discovered_date > '1800-01-01'
ORDER BY discovered_date DESC;

-- Query TIMESTAMP: Show locations created today
SELECT name, created_at FROM locations
WHERE created_at >= CURRENT_DATE;

-- Query JSONB: Find locations with specific metadata
SELECT name, metadata FROM locations
WHERE metadata @> '{"magical": true}'::jsonb;

-- ============================================================================
-- PART 8: ADDITIONAL ALTER TABLE EXAMPLES (Educational)
-- ============================================================================
-- These are examples of things you could do with ALTER TABLE
-- They are commented out to avoid breaking the data, but show the syntax

-- Example: Add a CHECK constraint for visitor count
-- ALTER TABLE locations ADD CONSTRAINT visitor_count_positive 
--   CHECK (visitor_count >= 0);

-- Example: Add a DEFAULT value to an existing column
-- ALTER TABLE locations ALTER COLUMN best_season SET DEFAULT 'Spring';

-- Example: Change column nullability
-- ALTER TABLE locations ALTER COLUMN region SET NOT NULL;

-- Example: Create an index on multiple columns
-- CREATE INDEX idx_locations_region_difficulty 
--   ON locations (region, difficulty_rating);

-- Example: Drop an index
-- DROP INDEX idx_locations_name;

-- ============================================================================
-- SUMMARY OF DATA TYPES USED IN THIS FILE
-- ============================================================================
-- SERIAL              : Auto-incrementing integer (id)
-- UUID                : Unique identifier (unique_code)
-- VARCHAR(n)          : Variable text up to n chars (name, region, best_season)
-- TEXT                : Unlimited text (description)
-- TEXT[]              : Array of text (keywords)
-- INTEGER             : Whole numbers (visitor_count, elevation_meters, review_count)
-- SMALLINT            : Small numbers (difficulty_rating)
-- DECIMAL(p, s)       : Exact decimals (entrance_fee, avg_review_score)
-- REAL                : Floating point (average_temperature)
-- BOOLEAN             : True/False (is_accessible, has_facilities, etc.)
-- DATE                : Calendar date (discovered_date)
-- TIME                : Time of day (opening_time, closing_time)
-- TIMESTAMP           : Date + Time (created_at, updated_at)
-- JSONB               : JSON data (metadata, seasonal_hours)

-- ============================================================================
-- NOTES FOR INSTRUCTORS
-- ============================================================================
-- This SQL file demonstrates:
-- 1. CREATE TABLE with 20+ different data type examples
-- 2. ALTER TABLE statements to modify table structure after creation
-- 3. How to insert data into columns with different data types
-- 4. Indexes for query performance
-- 5. Constraints (DEFAULT, CHECK, UNIQUE, NOT NULL)
-- 6. Sample queries using different data types
-- 7. Comments explaining each data type's purpose

-- Students can learn:
-- - Why different data types exist
-- - When to use each type
-- - How to define columns with constraints
-- - How to query data with different types
-- - How to modify tables with ALTER TABLE
-- ============================================================================
