-- \i : This file can be run from psql with: \i path/to/schema.sql
-- Or from the command line: psql postgres -d knights_realm -f schema.sql

-- Schema for Knights Realm Join Activity Solution

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
