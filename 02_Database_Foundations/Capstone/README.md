# Knights Quest — Capstone Instructions

This week's capstone: build a Node.js command-line application "Knights Quest" that helps a player build quests by querying a Postgres database.

Overview
- You will create four Postgres tables: `realms`, `characters`, `items`, and `quests`.
- You will seed the tables with sample data provided by your team.
- Build a Node CLI (using `inquirer`) that queries these tables (via `pg`) and helps the user assemble a quest by selecting a realm, choosing characters, and assigning items.

Learning outcomes
- Design and create normalized tables and relationships.
- Write SQL SELECT queries with JOINs to fetch related data.
- Use Node.js to query Postgres and interact with the user via `inquirer`.
- Assemble data from multiple tables into a single composed object and optionally insert a new `quest` record.

Project structure (suggested)
- capstone/
  - db/
    - schema.sql       -- CREATE TABLE statements
    - seeds.sql        -- INSERT sample data
  - src/
    - db.js            -- pg pool and helpers
    - cli.js           -- inquirer prompts and flow
    - queries.js       -- SQL query templates
  - package.json
  - README.md

Database schema (recommended)
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

Seeding data
- Create `db/seeds.sql` with sample rows for each table. Keep data small (5–10 rows per table) but varied so queries are interesting.
- Example rows:
  - Realms: "Knights Realm", "Sapphire Coast", "Iron Peaks"
  - Characters: names and roles linked to realms
  - Items: swords, potions, scrolls with varying power

Node CLI: packages to install
```bash
npm init -y
npm install inquirer pg dotenv
```
- `inquirer` for prompts
- `pg` for Postgres queries
- `dotenv` for DATABASE_URL configuration

Database connection helper (`src/db.js`)
```js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
```

Example queries (`src/queries.js`)
```js
// List realms
const listRealms = 'SELECT id, name FROM realms ORDER BY name';

// Fetch characters for a realm
const charactersByRealm = 'SELECT id, name, role FROM characters WHERE realm_id = $1 ORDER BY name';

// List items
const listItems = 'SELECT id, name, type, power FROM items ORDER BY name';

module.exports = { listRealms, charactersByRealm, listItems };
```

CLI flow (`src/cli.js`) — high level
1. Prompt user to select a realm (use `listRealms` query).
2. Show characters in that realm and prompt to select 1–3 characters.
3. Show items and prompt to assign items to characters (optional mapping prompt).
4. Prompt for a quest title.
5. Show a summary and ask to confirm creation.
6. If confirmed, insert a new `quests` row and related `quest_assignments` rows.

Example: prompt snippets
```js
const inquirer = require('inquirer');
const db = require('./db');
const q = require('./queries');

async function start() {
  const realms = (await db.query(q.listRealms)).rows;
  const realmChoice = await inquirer.prompt([{ name: 'realm', type: 'list', choices: realms.map(r => ({ name: r.name, value: r.id })) }]);

  const characters = (await db.query(q.charactersByRealm, [realmChoice.realm])).rows;
  const charChoice = await inquirer.prompt([{ name: 'chars', type: 'checkbox', choices: characters.map(c => ({ name: `${c.name} (${c.role})`, value: c.id })), validate: (a) => a.length > 0 || 'Select at least one character' }]);

  // items, quest title, confirm, and insert logic follow similar pattern
}

start();
```

Tips for SQL and Node usage
- Use parameterized queries to avoid SQL injection (use $1, $2 placeholders).
- Keep database logic (queries) separate from CLI logic.
- Use transactions when inserting a quest and its assignments to ensure consistency.
- Log helpful messages to the user (e.g., "Quest created with id: 12").

Testing and verification
- Provide example expected outputs and test cases for the instructor. Example test: run the CLI, select realm X, pick characters A and B, assign item Y to A, confirm — then check the `quests` and `quest_assignments` tables for expected rows.

Grading rubric (suggested)
- Schema design & relationships: 25%
- Working CLI flow with inquirer prompts: 30%
- Correct SQL queries and use of `pg`: 20%
- Insert quest and assignments with transaction: 15%
- README, seed data, and polish: 10%

Deliverables
- Capstone folder with `db/schema.sql` and `db/seeds.sql`.
- `src/` with `db.js`, `queries.js`, and `cli.js` (plus any helper modules).
- `README.md` with run instructions and sample commands.

Run steps for instructors/students
1. Create DB and run schema/seeds using psql or your GUI:
```bash
createdb knights_quest
psql -d knights_quest -f db/schema.sql
psql -d knights_quest -f db/seeds.sql
```
2. Set DATABASE_URL in `.env` (example: postgres://user:pass@localhost:5432/knights_quest)
3. Install Node deps and run CLI:
```bash
npm install
node src/cli.js
```

Need help?
- If you want, I can scaffold the `capstone/` folder with `schema.sql`, a small `seeds.sql`, and a minimal `src/cli.js` implementation to get teams started. Say the word and I'll create the starter files.
