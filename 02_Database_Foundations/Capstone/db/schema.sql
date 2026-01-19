-- Realms
CREATE TABLE realms (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  ruler VARCHAR(100),
  description TEXT
);

-- Characters
CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50), -- e.g., Knight, Mage, Rogue
  realm_id INTEGER REFERENCES realms(id)
);

-- Items
CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50), -- e.g., Weapon, Potion
  power INTEGER
);

-- Quests
CREATE TABLE quests (
  id SERIAL PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  realm_id INTEGER REFERENCES realms(id),
  created_at TIMESTAMP DEFAULT now()
);

-- Quest participants / assignments (optional, recommended)
CREATE TABLE quest_assignments (
  id SERIAL PRIMARY KEY,
  quest_id INTEGER REFERENCES quests(id) ON DELETE CASCADE,
  character_id INTEGER REFERENCES characters(id),
  item_id INTEGER REFERENCES items(id)
);