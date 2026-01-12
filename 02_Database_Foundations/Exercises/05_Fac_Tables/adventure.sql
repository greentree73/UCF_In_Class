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