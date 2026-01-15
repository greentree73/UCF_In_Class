-- knights_realm.sql

-- This script is written so it can be executed in two ways:
--  1) Run the CREATE/DROP statements from the 'postgres' maintenance DB (psql or GUI):
--       DROP DATABASE IF EXISTS knights_realm;
--       CREATE DATABASE knights_realm;
--    Then connect to knights_realm and run the rest of this file (or open a new SQL editor targeting knights_realm).
--  2) In GUIs like DBeaver you can run the `CREATE DATABASE` statements in the default DB, then switch connection to knights_realm and run the remainder.

-- ---- DROP & CREATE the database (run as a superuser)
DROP DATABASE IF EXISTS knights_realm;
CREATE DATABASE knights_realm;

-- After creating the DB, connect to it before running the schema below.
-- In psql:  \c knights_realm
-- In DBeaver: open a new SQL Editor connected to knights_realm

-- ---- Schema: knights, realms, quests, armory

-- Realms table
CREATE TABLE realms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL UNIQUE,
  ruler VARCHAR(100),
  description TEXT
);

-- Knights table
CREATE TABLE knights (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100),
  realm_id INTEGER REFERENCES realms(id),
  sworn BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quests table
CREATE TABLE quests (
  id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  reward INTEGER,
  realm_id INTEGER REFERENCES realms(id),
  is_complete BOOLEAN DEFAULT FALSE
);

-- Armory / items table
CREATE TABLE armory (
  id SERIAL PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  type VARCHAR(60),
  power INTEGER DEFAULT 0
);

-- Association table: knight_quests (many-to-many)
CREATE TABLE knight_quests (
  knight_id INTEGER REFERENCES knights(id) ON DELETE CASCADE,
  quest_id INTEGER REFERENCES quests(id) ON DELETE CASCADE,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (knight_id, quest_id)
);

-- ---- Insert sample data
INSERT INTO realms (name, ruler, description) VALUES
('Knights Realm', 'Queen Isolde', 'A misty realm of valiant knights and deep forests.'),
('Ironmarch', 'Lord Varr', 'A harsh northern territory with iron mines.');

INSERT INTO knights (name, title, realm_id, sworn) VALUES
('Sir Aelwyn', 'Shieldbearer', 1, true),
('Dame Rowena', 'Blade of the East', 1, false),
('Sir Thoren', 'Iron Fist', 2, true);

INSERT INTO quests (name, description,realm_id, reward) VALUES
('Rescue the Villagers', 'Clear bandits from the southern pass and escort villagers to safety.', 2, 200),
('Retrieve the Iron Crown', 'Recover the lost crown from the ruins beneath Ironmarch.', 2, 500);


INSERT INTO armory (name, type, power) VALUES
('Longsword of Dawn', 'weapon', 45),
('Shield of Resolute', 'armor', 20),
('Boots of Swiftness', 'accessory', 5);

-- Assign a quest to a knight
INSERT INTO knight_quests (knight_id, quest_id) VALUES (1, 1), (3, 2);

-- ---- Example queries students should run after connecting to knights_realm
-- List all realms
SELECT * FROM realms;

-- List knights with their realm name


-- Show quests and assigned knights


-- Give a reward: update a quest to complete

