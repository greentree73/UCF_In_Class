-- ============================================================================
-- File: realms.sql
-- Purpose: Create 30 realm records in the knights_realm database
-- Description: This file demonstrates how to populate the realms table
--              with diverse records for filtering and sorting practice
-- Usage: psql -U postgres -d knights_realm -f realms.sql
-- ============================================================================

-- Connect to the knights_realm database
\c knights_realm

-- ============================================================================
-- PART 1: VERIFY TABLE STRUCTURE
-- ============================================================================
-- Display the realms table structure to verify columns
\d realms

-- ============================================================================
-- PART 2: INSERT 30 REALM RECORDS
-- ============================================================================
-- These records represent various kingdoms, domains, and territories
-- ruled by different types of nobility with varied descriptions

INSERT INTO realms (name, ruler, description) VALUES
  ('The Northern Kingdom', 'King Harald Ironclad', 'A powerful monarchy controlling the snowy northern territories. Known for their skilled ice mages and master craftspeople who forge legendary weapons in volcanic forges.'),
  ('The Emerald Dominion', 'Queen Aldara of the Mists', 'A matriarchal realm ruled by a wise queen. Famous for their ancient libraries and magical knowledge. The forests here glow with ethereal light at night.'),
  ('The Crimson Duchy', 'Duke Marcus Redstone', 'A wealthy duchy built on a foundation of trade and diplomacy. Known for their merchant fleets and architectural marvels. The capital city gleams with red marble towers.'),
  ('The Silver Sultanate', 'Sultan Rashid the Wise', 'An exotic desert kingdom with sophisticated culture and learning. Home to the largest library in the realm and centers of astronomical study.'),
  ('The Mountain Hold', 'Dwarven King Thorgun Stonebeard', 'An underground kingdom carved into the mountains. Legendary mines produce the finest ores and gemstones. Home to master engineers and stoneworkers.'),
  ('The Coastal Haven', 'Lady Seraphine of the Tides', 'A maritime realm dominating the coastal waters. Powerful navy and merchant marine. Known for shipbuilding and sea trade dominance.'),
  ('The Verdant Vale', 'Druid Lord Elderven', 'A mystical realm where nature and magic intertwine. Forests untouched by time and ancient temples hidden among the trees. Home to shapeshifters and nature mages.'),
  ('The Iron Principality', 'Prince Aldric the Strong', 'A militaristic realm with the strongest standing army. Training grounds for elite knights and warriors. Fortress cities dot the landscape.'),
  ('The Twilight Realm', 'Fairy Queen Lunara', 'A magical domain existing between worlds. Home to ethereal beings and ancient magic. Time flows differently here than in mortal realms.'),
  ('The Sunlit Theocracy', 'High Priest Solaris', 'A religious state dedicated to the sun god. Grand temples with golden spires reach toward the sky. Known for healing arts and holy relics.'),
  ('The Shadowed Dominion', 'Dark Queen Morwenna', 'A mysterious realm shrouded in shadow and intrigue. Home to skilled assassins and shadow mages. Politics run deep and ancient secrets hide in darkness.'),
  ('The Peaceful Republic', 'Chancellor Lucia Fair', 'A democratic society governed by elected councils. Known for their fair laws and justice system. Progressive views on magic and technology.'),
  ('The Dragon Realm', 'Dragon Lord Pyrathorax', 'A territory ruled by an ancient dragon. Volcanic landscape with dragon-sized fortifications. Treasure hoards protected by draconic magic.'),
  ('The Enchanted Forest Kingdom', 'Queen Sylvara Moonwhisper', 'A forest realm where magic naturally flows strong. Living trees form the cities and homes. Connection to all nature-based magic.'),
  ('The Nomadic Tribes', 'Chieftain Kael Windrunner', 'A mobile society of skilled hunters and warriors. No fixed capital but multiple gathering places. Deep connection to ancient traditions.'),
  ('The Crystal Sovereignty', 'Queen Isabela Sparkstone', 'A realm built within and around massive crystal formations. Crystals provide light, warmth, and magical energy. Advanced magical technology.'),
  ('The Merchant Republic', 'Governor Trade Master Valerian', 'A city-state focused entirely on commerce and trade. Neutral ground where all are welcome. Wealthy from centuries of trade routes.'),
  ('The Sacred Sanctuary', 'Abbess Eleanor of Wisdom', 'A monastic realm devoted to knowledge and spirituality. Vast archives of ancient texts and magical research. Scholars and monks from all lands come to study.'),
  ('The Rogue Confederation', 'Shadow Master Kassandra', 'A loose alliance of skilled thieves and rogues. Hidden cities known only to members. Thriving underground economy.'),
  ('The War Empire', 'Emperor Malachai the Conqueror', 'An expansionist empire constantly at war. Disciplined military legions and tactical genius. Vast conquered territories under imperial rule.'),
  ('The Mystic Circle', 'Archmage Thaddeus the Wise', 'An academic society of powerful mages. Tower cities reach toward the clouds. Cutting edge magical research and innovation.'),
  ('The Silent Citadel', 'Grandmaster Soren Blackstone', 'A monastic warrior society focused on discipline. Monks trained in martial arts and meditation. Located in an impregnable fortress.'),
  ('The Pastoral Haven', 'Shepherd King Roderick Simple', 'A simple agricultural realm focused on peaceful living. Rolling farmlands and pastoral villages. Known for their crafts and honey.'),
  ('The Sky Kingdom', 'Sky Admiral Celestine Windborn', 'A realm built in the clouds on floating islands. Advanced airship fleet. Masters of wind magic and flight.'),
  ('The Underworld Domain', 'Demon King Azureathe', 'A subterranean realm of dark magic and intrigue. Vast caverns and underground lakes. Powers derived from the depths of the earth.'),
  ('The Holy Alliance', 'Pope Clement the Blessed', 'A theocratic union of religious states. Multiple temples and religious centers. Focused on spiritual enlightenment and moral conduct.'),
  ('The Wilderness Realm', 'Beast Master Grendel', 'A wild territory dominated by nature and beasts. Minimal civilization, maximum nature. Shamans and druids hold authority.'),
  ('The Technological Kingdom', 'Inventor-King Theodore', 'A kingdom focused on innovation and advancement. Magical engines power the cities. Golems and constructs perform labor.'),
  ('The Twilight Court', 'Lady Morrigan of Shadows', 'A half-realm existing at dusk and dawn. Ruled by powerful sorcerers. Magic particularly strong at sunrise and sunset.'),
  ('The Final Kingdom', 'Lich King Mortheus', 'An undead realm ruled by ancient magic. Eternal cities that never sleep. Home to immortal souls bound by powerful spells.');

-- ============================================================================
-- PART 3: VERIFY INSERTS
-- ============================================================================
-- Count total realms inserted
SELECT COUNT(*) as total_realms FROM realms;



-- ============================================================================
