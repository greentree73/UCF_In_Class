# Knights Quest
This is a Node.js command-line application called Knights Quest that helps a player build quests by querying a PostgreSQL database. The application uses inquirer for interactive prompts and pg to run SQL queries.

# Project Purpose
The project creates a simple quest-building experience where a player:

- selects a realm,
- chooses characters within that realm,
- assigns items to the selected characters
- saves the quest to the database

# Database Structure
The application uses five normalized tables:

- realms — stores realm names, rulers, and descriptions
- characters — stores characters linked to realms
- items — stores items with types and power levels
- quests — stores created quests
- quest_assignments — links quests, characters, and items

# CLI Flow
The CLI follows this sequence:

- List all realms and prompt the user to select one
- Display characters from the selected realm and allow selection of 1–3
- Display available items and assign items to each character
- Prompt for a quest title
- Show a summary of the quest
- Confirm creation
- Insert a new row into the quests table
- Insert related rows into quest_assignments

# Project Structure 
capstone/
  db/
    schema.sql
    seeds.sql
  src/
    db.js
    queries.js
    cli.js
  package.json
  README - Vandana.md

# Run Instructions
1. Create the database
- createdb knights_quest

2. Run schema and seed scripts
- psql -d knights_quest -f db/schema.sql
- psql -d knights_quest -f db/seeds.sql

3. Set up environment variables
- Create a .env file:
- DATABASE_URL=postgressql://postgres:root@localhost:5432/knights_quest

4. Install dependencies
- npm install

5. Run the CLI
- node src/cli.js

# Sample Run
✔ Choose a realm for your quest: Iron Peaks
✔ Select 1-3 characters for your quest: Bilbo, Gandalf
✔ Assign an item to Bilbo, Gandalf: Dragon Heart
✔ Enter a title for your quest: The Wise Knight
✔ Create this Quest? Yes
Quest created with ID: 10

# Test Cases 
# Test Case 1 — Successful Quest Creation

Steps
- Run the CLI
- Select realm: Iron Peaks
- Select characters: Bilbo, Gandalf
- Assign item: Dragon Heart
- Enter title: The Wise Knight
- Confirm creation

Expected Results

- A new row is added to quests with title The Wise Knight and the correct realm_id.
- Two rows are added to quest_assignments, one for each selected character with the assigned item.

# Test Case 2 — Quest Creation Cancelled

Steps
- Run the CLI
- Select realm, characters, and items
- Enter title
- When asked “Create this Quest?”, choose No

Expected Results
- No new rows are created in quests or quest_assignments.