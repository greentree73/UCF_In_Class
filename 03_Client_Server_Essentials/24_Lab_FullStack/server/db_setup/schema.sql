-- Database setup for Full-Stack Intro
-- Run this file to create the database

-- Drop database if exists (optional - for clean slate)
-- DROP DATABASE IF EXISTS fullstack_db;

-- Create database
CREATE DATABASE fullstack_db;

-- Connect to the database
\c fullstack_db;

-- The messages table will be created automatically by Sequelize
-- when the server starts. This file is here for reference
-- and manual database creation if needed.

-- You can also manually create the table:
-- CREATE TABLE messages (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(50) NOT NULL,
--   content TEXT NOT NULL,
--   "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
--   "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW()
-- );

-- Insert some sample data (optional)
-- INSERT INTO messages (username, content, "createdAt", "updatedAt") VALUES
--   ('Alice', 'Hello, this is my first message!', NOW(), NOW()),
--   ('Bob', 'Welcome to the message board!', NOW(), NOW()),
--   ('Charlie', 'This is a great example of full-stack development!', NOW(), NOW());
