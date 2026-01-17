-- ============================================
-- Pokemon Card Collection Manager - Database Schema
-- ============================================
-- This schema creates the database structure for managing
-- users and their Pokemon card collections
-- Run: psql -U postgres -d pokemon_collection -f schema.sql

-- Drop existing tables if they exist
-- CASCADE ensures dependent objects are also dropped
DROP TABLE IF EXISTS user_collection CASCADE;
DROP TABLE IF EXISTS pokemon_cards CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- ============================================
-- Users Table
-- ============================================
-- Stores user accounts for the application
CREATE TABLE users (
  id SERIAL PRIMARY KEY,                    -- Auto-incrementing user ID
  username VARCHAR(50) UNIQUE NOT NULL,     -- Unique username for login
  password VARCHAR(100) NOT NULL,           -- User password (in production, use hashing!)
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Account creation timestamp
);

-- Create index on username for faster lookups during login
CREATE INDEX idx_users_username ON users(username);

-- ============================================
-- Pokemon Cards Table
-- ============================================
-- Master list of all available Pokemon cards
CREATE TABLE pokemon_cards (
  id SERIAL PRIMARY KEY,                    -- Auto-incrementing card ID
  name VARCHAR(100) NOT NULL,               -- Pokemon name
  type VARCHAR(50) NOT NULL,                -- Pokemon type (Fire, Water, Grass, etc.)
  rarity VARCHAR(50) NOT NULL,              -- Card rarity (Common, Uncommon, Rare, etc.)
  hp INTEGER NOT NULL,                      -- Hit points (health)
  CHECK (hp > 0)                            -- Ensure HP is positive
);

-- Create index on name for faster searching
CREATE INDEX idx_pokemon_name ON pokemon_cards(name);

-- ============================================
-- User Collection Table (Junction Table)
-- ============================================
-- Many-to-many relationship between users and cards
-- Each user can collect multiple cards
-- Each card can be collected by multiple users
CREATE TABLE user_collection (
  id SERIAL PRIMARY KEY,                    -- Auto-incrementing collection entry ID
  user_id INTEGER NOT NULL,                 -- Reference to the user
  card_id INTEGER NOT NULL,                 -- Reference to the Pokemon card
  collected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When card was collected
  
  -- Foreign key constraints
  -- ON DELETE CASCADE means if user/card is deleted, collection entries are too
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (card_id) REFERENCES pokemon_cards(id) ON DELETE CASCADE,
  
  -- Prevent duplicate cards in a user's collection
  -- Each user can only have one copy of each card
  UNIQUE(user_id, card_id)
);

-- Create indexes for faster JOIN operations
CREATE INDEX idx_user_collection_user_id ON user_collection(user_id);
CREATE INDEX idx_user_collection_card_id ON user_collection(card_id);

-- ============================================
-- Display table information
-- ============================================
\echo '✅ Schema created successfully!'
\echo ''
\echo 'Tables created:'
\dt

\echo ''
\echo 'Users table structure:'
\d users

\echo ''
\echo 'Pokemon Cards table structure:'
\d pokemon_cards

\echo ''
\echo 'User Collection table structure:'
\d user_collection
