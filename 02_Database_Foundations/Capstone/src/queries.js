// List realms
const listRealms = "SELECT id, name FROM realms ORDER BY name";

// Fetch characters for a realm
const charactersByRealm =
  "SELECT id, name, role FROM characters WHERE realm_id = $1 ORDER BY name";

// List items
const listItems = "SELECT id, name, type, power FROM items ORDER BY name";

// Add quest
const addQuest =
  "INSERT INTO quests (title, realm_id) VALUES ($1, $2) RETURNING *";

// Add quest Assignment
const addQuestAssignment =
  "INSERT INTO quest_assignments (quest_id, character_id, item_id) VALUES ($1, $2, $3) RETURNING *";

export default {
  listRealms,
  charactersByRealm,
  listItems,
  addQuest,
  addQuestAssignment,
};
