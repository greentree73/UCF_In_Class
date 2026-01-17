
-- Sample data for Knights Realm Join Activity Solution

-- Insert realms
INSERT INTO realms (name, ruler, description) VALUES
	('Knights Realm', 'Queen Isolde', 'A misty realm of valiant knights and deep forests.'),
	('Ironmarch', 'Lord Varr', 'A harsh northern territory with iron mines.');

-- Insert knights
INSERT INTO knights (name, title, realm_id, sworn) VALUES
	('Sir Aelwyn', 'Shieldbearer', 1, true),
	('Dame Rowena', 'Blade of the East', 1, false),
	('Sir Thoren', 'Iron Fist', 2, true);

-- Insert quests
INSERT INTO quests (name, description, realm_id, reward) VALUES
	('Rescue the Villagers', 'Clear bandits from the southern pass and escort villagers to safety.', 2, 200),
	('Retrieve the Iron Crown', 'Recover the lost crown from the ruins beneath Ironmarch.', 2, 500);

-- Insert armory items
INSERT INTO armory (name, type, power) VALUES
	('Longsword of Dawn', 'weapon', 45),
	('Shield of Resolute', 'armor', 20),
	('Boots of Swiftness', 'accessory', 5);

-- Assign knights to quests (many-to-many)
INSERT INTO knight_quests (knight_id, quest_id) VALUES (1, 1), (3, 2);

-- =====================
-- Example JOIN Queries
-- =====================

-- 1. INNER JOIN: List all knights with their realm name
-- This join returns only knights who have a valid realm (matching realm_id).
SELECT k.name AS knight, k.title, r.name AS realm
FROM knights k
INNER JOIN realms r ON k.realm_id = r.id;

-- 2. LEFT JOIN: List all quests and any assigned knights (if any)
-- This join shows all quests, even if no knight is assigned (knight will be NULL).
SELECT q.name AS quest, k.name AS knight
FROM quests q
LEFT JOIN knight_quests kq ON q.id = kq.quest_id
LEFT JOIN knights k ON kq.knight_id = k.id;

-- 3. RIGHT JOIN: List all knights and their assigned quests (if any)
-- This join shows all knights, even if they are not assigned to a quest (quest will be NULL).
SELECT k.name AS knight, q.name AS quest
FROM knights k
RIGHT JOIN knight_quests kq ON k.id = kq.knight_id
RIGHT JOIN quests q ON kq.quest_id = q.id;

-- 4. FULL OUTER JOIN: List all knights and all quests, showing assignments where they exist
-- This join returns all knights and all quests, matching where possible, NULL where not assigned.
SELECT k.name AS knight, q.name AS quest
FROM knights k
FULL OUTER JOIN knight_quests kq ON k.id = kq.knight_id
FULL OUTER JOIN quests q ON kq.quest_id = q.id;

-- 5. JOIN with armory: List all knights and all items in the armory (CROSS JOIN)
-- This join pairs every knight with every item (cartesian product).
SELECT k.name AS knight, a.name AS item
FROM knights k
CROSS JOIN armory a;
