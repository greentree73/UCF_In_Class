-- ============================================================================
-- File: locations.sql
-- Purpose: Create 30 location records in the adventure database
-- Description: This file demonstrates how to populate the locations table
--              with diverse records for filtering and sorting practice
-- Usage: psql -U postgres -d adventure -f locations.sql
-- ============================================================================

-- Connect to the adventure database
\c adventure

-- ============================================================================
-- PART 1: VERIFY TABLE STRUCTURE
-- ============================================================================
-- Display the locations table structure to verify columns
\d locations

-- ============================================================================
-- PART 2: INSERT 30 LOCATION RECORDS
-- ============================================================================
-- These records represent various locations across different regions
-- with varied descriptions for practicing filtering and sorting queries

INSERT INTO locations (name, description, region) VALUES
  ('Crystal Falls', 'A breathtaking waterfall with crystal-clear water cascading down rocky cliffs. Home to rare water sprites and magical fish. Perfect for meditation and water magic studies.', 'Northern Mountains'),
  ('Shadowbrook Forest', 'A dense, ancient forest shrouded in perpetual twilight. The canopy is so thick that sunlight rarely touches the forest floor. Known for its mysterious inhabitants and hidden pathways.', 'Eastern Territories'),
  ('Golden Desert Oasis', 'A verdant oasis nestled in the heart of the golden desert. Palm trees circle a pristine freshwater spring. Safe haven for travelers crossing the harsh desert terrain.', 'Southern Desert'),
  ('Misty Marshlands', 'A vast wetland filled with fog and murky water. Treacherous terrain home to bog creatures and swamp druids. Unique flora that glows faintly at night.', 'Western Swamps'),
  ('Starlight Observatory', 'An ancient structure perched on the highest peak, used by wizards to study celestial phenomena. The night sky is clearer here than anywhere else in the realm.', 'Northern Mountains'),
  ('Dragon''s Rest Cave', 'A massive cavern within a dormant volcano. Still warm from the dragon''s previous occupancy. Contains rare magical crystals and ancient treasure.', 'Eastern Territories'),
  ('Sunlit Meadows', 'Rolling grasslands with wildflowers that bloom year-round. Gentle, peaceful atmosphere perfect for picnics and outdoor gatherings. Home to grazing unicorns.', 'Central Plains'),
  ('Midnight Harbor', 'A coastal town built into a natural harbor. Active port for merchant ships and fishing vessels. Known for its vibrant nightlife and fresh seafood markets.', 'Coastal Regions'),
  ('Forgotten Ruins', 'Ancient stone structures half-buried in earth and overgrown with vines. Archaeological treasure trove with inscriptions in forgotten languages. Danger: magical traps may still be active.', 'Eastern Territories'),
  ('Windpeak Valley', 'A narrow valley between two massive mountains where winds howl constantly. Home to wind elementals and air mages. Extreme weather conditions present challenges.', 'Northern Mountains'),
  ('Crimson Canyon', 'A spectacular gorge with red and orange rock formations. Natural bridge formation spans the main canyon. Popular hiking destination with breathtaking views.', 'Southern Desert'),
  ('Luminous Caverns', 'Underground caves filled with bioluminescent organisms creating natural light. Beautiful crystal formations cover the walls and ceiling. Underground river system.', 'Central Plains'),
  ('Moonlight Lake', 'A pristine alpine lake that reflects the moon and stars with remarkable clarity. Surrounded by pine forests and snow-capped peaks. Home to silver trout.', 'Northern Mountains'),
  ('Emerald Jungle', 'A tropical rainforest with incredibly dense vegetation. Canopy so thick it blocks most sunlight. Home to exotic wildlife and undiscovered plant species.', 'Southern Desert'),
  ('Pearlescent Shore', 'A beautiful beach with white sand and clear turquoise waters. Seashells with natural iridescent properties wash up on shore. Popular resort destination.', 'Coastal Regions'),
  ('Obsidian Mines', 'Active mining operation extracting valuable obsidian and volcanic glass. Tunnels go deep into the earth. Dangerous but profitable venture.', 'Eastern Territories'),
  ('Twilight Grove', 'A sacred forest where time seems to move differently. Trees are impossibly tall with silver bark. Magical artifacts naturally appear in this location.', 'Western Swamps'),
  ('Serpent''s Den', 'A rocky area filled with caves inhabited by intelligent reptiles. Ancient symbol markings on rocks suggest old civilization. Difficult terrain to navigate.', 'Western Swamps'),
  ('Cloudtop Fortress', 'A military stronghold built on a plateau surrounded by clouds. Impregnable defensive position with strategic view of surrounding lands. Military academy headquarters.', 'Northern Mountains'),
  ('Sunken Temple', 'An underwater archaeological site partially submerged in a large freshwater lake. Beautiful ancient architecture still visible underwater. Requires special diving equipment to explore.', 'Central Plains'),
  ('Whispering Pines', 'An old-growth forest where the wind through pine branches creates haunting melodies. Calm and peaceful despite the eerie sounds. Meditation retreat popular with monks.', 'Eastern Territories'),
  ('Golden Citadel', 'A grand city with walls and buildings constructed from golden stone. Capital of the realm with bustling markets and government buildings. Cultural center of learning and arts.', 'Central Plains'),
  ('Phantom Peak', 'A mysterious mountain that appears and disappears in the mist. Legends say it shifts its location periodically. Home to mountain spirits and ethereal beings.', 'Northern Mountains'),
  ('Azure Grotto', 'A seaside cave with brilliant blue water reflecting off mineral-rich rocks. Accessible only during low tide. Contains naturally forming saltwater pools.', 'Coastal Regions'),
  ('Scorched Badlands', 'A barren, rocky terrain with little vegetation due to extreme heat. Dramatic rock formations eroded by wind over millennia. Harsh conditions but mineral-rich soil.', 'Southern Desert'),
  ('Enchanted Glade', 'A magical clearing deep within an ancient forest. Flowers bloom in impossible colors. Time stands still here, creating a pocket of calm in the chaotic world.', 'Western Swamps'),
  ('Starfall Plains', 'Vast open grasslands where meteorite fragments have created impact craters. Pieces of meteoric stone still scatter the ground. Used as natural compass points.', 'Central Plains'),
  ('Frost Peak', 'The coldest mountain in the realm with eternal snow and ice. Base for ice mages and winter scholars. Dangerous avalanche conditions present challenges.', 'Northern Mountains'),
  ('Sapphire Springs', 'A natural hot spring area with mineral-rich waters believed to have healing properties. Resort town developed around the springs. Therapeutic bathing pools.', 'Western Swamps'),
  ('Storm''s Eye', 'A coastal area where extreme weather patterns converge creating constant storms. Lightning strikes frequently. Dangerous but fascinating natural phenomenon.', 'Coastal Regions');

-- ============================================================================
-- PART 3: VERIFY INSERTS
-- ============================================================================
-- Count total locations inserted
SELECT COUNT(*) as total_locations FROM locations;

-- Display all 30 locations ordered by name
SELECT id, name, region, description FROM locations ORDER BY name;

-- ============================================================================
-- PART 4: COUNT LOCATIONS BY REGION
-- ============================================================================
-- Summary: See how many locations we have in each region
SELECT region, COUNT(*) as location_count 
FROM locations 
GROUP BY region 
ORDER BY location_count DESC, region;

-- ============================================================================
-- NOTES FOR INSTRUCTORS:
-- ============================================================================
-- This dataset provides:
-- - 30 unique location records with varied descriptions
-- - Locations spread across 6 different regions
-- - Mix of short and long descriptions (good for DISTINCT and filtering)
-- - Diverse location types: caves, mountains, forests, coastal, cities, etc.
-- - Opportunities to practice:
--   * Filtering by region (WHERE clause)
--   * Searching by keywords in description (LIKE operator)
--   * Sorting by name and region (ORDER BY)
--   * Pagination (LIMIT and OFFSET)
--   * Counting records by region (GROUP BY)
-- ============================================================================
