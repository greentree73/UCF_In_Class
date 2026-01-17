-- ============================================
-- Pokemon Card Collection Manager - Seed Data
-- ============================================
-- This file populates the database with 30 Pokemon cards
-- Run: psql -U postgres -d pokemon_collection -f seeds.sql

-- ============================================
-- Insert Sample Pokemon Cards
-- ============================================
-- Including a variety of types and rarities
-- Format: (name, type, rarity, hp)

INSERT INTO pokemon_cards (name, type, rarity, hp) VALUES
  -- Fire Type Pokemon
  ('Charizard', 'Fire', 'Rare', 120),
  ('Charmander', 'Fire', 'Common', 50),
  ('Charmeleon', 'Fire', 'Uncommon', 80),
  ('Arcanine', 'Fire', 'Uncommon', 100),
  ('Flareon', 'Fire', 'Rare', 90),
  ('Moltres', 'Fire', 'Ultra Rare', 100),
  
  -- Water Type Pokemon
  ('Blastoise', 'Water', 'Rare', 120),
  ('Squirtle', 'Water', 'Common', 50),
  ('Wartortle', 'Water', 'Uncommon', 80),
  ('Lapras', 'Water', 'Rare', 110),
  ('Vaporeon', 'Water', 'Rare', 90),
  ('Gyarados', 'Water', 'Rare', 130),
  
  -- Grass Type Pokemon
  ('Venusaur', 'Grass', 'Rare', 120),
  ('Bulbasaur', 'Grass', 'Common', 50),
  ('Ivysaur', 'Grass', 'Uncommon', 80),
  ('Vileplume', 'Grass', 'Uncommon', 85),
  ('Tangela', 'Grass', 'Common', 60),
  
  -- Electric Type Pokemon
  ('Pikachu', 'Electric', 'Common', 60),
  ('Raichu', 'Electric', 'Uncommon', 90),
  ('Zapdos', 'Electric', 'Ultra Rare', 100),
  ('Jolteon', 'Electric', 'Rare', 90),
  ('Magneton', 'Electric', 'Uncommon', 80),
  
  -- Psychic Type Pokemon
  ('Mewtwo', 'Psychic', 'Ultra Rare', 120),
  ('Alakazam', 'Psychic', 'Rare', 80),
  ('Gengar', 'Psychic', 'Rare', 80),
  ('Hypno', 'Psychic', 'Uncommon', 90),
  
  -- Normal Type Pokemon
  ('Snorlax', 'Normal', 'Rare', 140),
  ('Eevee', 'Normal', 'Common', 50),
  ('Chansey', 'Normal', 'Uncommon', 120),
  ('Ditto', 'Normal', 'Rare', 50);

-- ============================================
-- Create a test user (optional)
-- ============================================
-- Password is 'password123' (in production, this should be hashed!)
INSERT INTO users (username, password) VALUES
  ('ash', 'password123'),
  ('misty', 'staryu456'),
  ('brock', 'onix789');

-- ============================================
-- Add some sample collection data (optional)
-- ============================================
-- Give 'ash' a few starter cards
INSERT INTO user_collection (user_id, card_id) VALUES
  (1, 18),  -- Pikachu
  (1, 1),   -- Charizard
  (1, 7);   -- Blastoise

-- Give 'misty' some water-type cards
INSERT INTO user_collection (user_id, card_id) VALUES
  (2, 7),   -- Blastoise
  (2, 10),  -- Lapras
  (2, 11);  -- Vaporeon

-- ============================================
-- Verification Queries
-- ============================================
\echo '✅ Seed data inserted successfully!'
\echo ''

-- Count Pokemon cards
SELECT 'Total Pokemon Cards:' as info, COUNT(*) as count FROM pokemon_cards;

-- Count users
SELECT 'Total Users:' as info, COUNT(*) as count FROM users;

-- Count collection entries
SELECT 'Total Collection Entries:' as info, COUNT(*) as count FROM user_collection;

\echo ''
\echo 'Pokemon Cards by Type:'
SELECT type, COUNT(*) as count 
FROM pokemon_cards 
GROUP BY type 
ORDER BY type;

\echo ''
\echo 'Pokemon Cards by Rarity:'
SELECT rarity, COUNT(*) as count 
FROM pokemon_cards 
GROUP BY rarity 
ORDER BY 
  CASE rarity
    WHEN 'Ultra Rare' THEN 1
    WHEN 'Rare' THEN 2
    WHEN 'Uncommon' THEN 3
    WHEN 'Common' THEN 4
  END;

\echo ''
\echo 'Sample: First 10 Pokemon Cards:'
SELECT id, name, type, rarity, hp 
FROM pokemon_cards 
ORDER BY id 
LIMIT 10;
