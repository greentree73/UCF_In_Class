-- adventure.sql
-- Starter SQL script for the Split Stack "Adventure" schema exercises.
-- This file creates a database named `adventure`, creates several tables,


-- NOTE: Run these commands as a superuser (or a user with CREATE DATABASE privileges).
DROP database if exists adventure;
-- 1) Create the database (run this in the 'postgres' maintenance DB or via psql)
CREATE DATABASE adventure;

-- 2) Connect to the adventure database (in psql use: \c adventure)
-- If running via a single psql script, include the meta-command below (psql only):
\c adventure


-- Select the adventure database to confirm connection
select current_database();


-- --- IGNORE ---   
-- 3) Create schema objects (tables)
-- Locations table: places in the game world
CREATE TABLE locations (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	description TEXT,
	region VARCHAR(100)
);

-- Items table: items that characters can carry
CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	type VARCHAR(50),
	value INTEGER DEFAULT 0
);

-- Characters table: playable or NPC characters
CREATE TABLE characters (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	level INTEGER DEFAULT 1,
	location_id INTEGER REFERENCES locations(id)
);

-- Quests table: simple quests that reference locations and reward items
CREATE TABLE quests (
	id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	description TEXT,
	location_id INTEGER REFERENCES locations(id),
	reward_item_id INTEGER REFERENCES items(id)
);

-- 4) Insert sample data
INSERT INTO locations (name, description, region) VALUES
('Black Marsh', 'A sprawling swamp with black water and twisted trees.', 'The South'),
('Obsidian Keep', 'An ancient fortress carved from black stone.', 'The North'),
('Sunfall Village', 'A small village known for its fishermen.', 'The East');

INSERT INTO items (name, type, value) VALUES
('Ancient Rune', 'artifact', 1000),
('Healing Potion', 'consumable', 25),
('Rusty Sword', 'weapon', 5),
('Dragon Scale', 'material', 500);

-- Link characters to locations using the ids that were just created
INSERT INTO characters (name, level, location_id) VALUES
('Aella', 3, 3),
('Boran', 6, 2),
('Cora', 2, 1);

-- Create quests — reward a Dragon Scale for an example quest
INSERT INTO quests (title, description, location_id, reward_item_id) VALUES
('The Obsidian Menace', 'Investigate the rumblings beneath Obsidian Keep.', 2, 4),
('Swamp Recovery', 'Recover lost supplies from the Black Marsh.', 1, 2);

-- 5) Example SELECT queries for exploration
-- List all locations
SELECT * FROM locations;

-- Join characters and their locations
SELECT c.id, c.name AS character, c.level, l.name AS location
FROM characters c
LEFT JOIN locations l ON c.location_id = l.id
ORDER BY c.level DESC;

-- Show quests with their reward item names
SELECT q.id, q.title, l.name AS location, i.name AS reward_item
FROM quests q
LEFT JOIN locations l ON q.location_id = l.id
LEFT JOIN items i ON q.reward_item_id = i.id;

-- Find all items worth more than 100
SELECT * FROM items WHERE value > 100 ORDER BY value DESC;

-- Update a character's level (example)
UPDATE characters SET level = level + 1 WHERE name = 'Aella';

-- Delete a sample row (example)
DELETE FROM items WHERE name = 'Rusty Sword';

-- 6) Cleanup (drop tables) - run only when you want to reset the schema
-- DROP TABLE IF EXISTS quests;
-- DROP TABLE IF EXISTS characters;
-- DROP TABLE IF EXISTS items;
-- DROP TABLE IF EXISTS locations;

-- End of adventure.sql

