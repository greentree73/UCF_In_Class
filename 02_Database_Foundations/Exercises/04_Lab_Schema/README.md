(#) Activity: Create `knights_realm` database in PostgreSQL

Objective
---------
Students will write SQL commands to safely drop a database if it exists, create a new database called `knights_realm`, connect to (use) that database, and verify the current database selection. This exercise reinforces basic Postgres database lifecycle commands and the use of the psql client.

Estimated time: 10–20 minutes

Prerequisites
-------------
- PostgreSQL installed and running (local or remote)
- Access to `psql` (command-line client) or a GUI like DBeaver

Commands to run
---------------

Open your terminal and start the `psql` client as a user with permissions to create/drop databases (often the `postgres` superuser):

```bash
psql -U postgres -h localhost
```

Then run the following SQL commands in `psql`:

```sql
-- 1) Drop the database if it exists (safe to run multiple times)
DROP DATABASE IF EXISTS knights_realm;

-- 2) Create the new database
CREATE DATABASE knights_realm;

-- 3) Connect to the new database (in psql use \c)
\c knights_realm

-- 4) Verify current database
SELECT current_database();

-- 5) (Optional) List databases to confirm
\l
```

Notes and tips
--------------
- `DROP DATABASE` cannot be run while users are connected to the database; `IF EXISTS` avoids an error if it doesn't exist.
- In DBeaver or other GUI clients, you can usually create and drop databases via the UI or run the same commands in the SQL editor (omit the `\c` meta-command and instead open a connection to the new DB).
- If you see permission errors, make sure you are using a superuser (or a user with CREATEDB privileges).

Resources for learning PostgreSQL
--------------------------------

- Official documentation (start here): https://www.postgresql.org/docs/current/
- A friendly SQL/Postgres tutorial: https://www.postgresqltutorial.com/
- psql interactive terminal reference: https://www.postgresql.org/docs/current/app-psql.html
- DBeaver download and docs: https://dbeaver.io/

Verification checklist
----------------------

- [ ] I can connect to Postgres using `psql` or DBeaver
- [ ] I can run `DROP DATABASE IF EXISTS knights_realm;` without an error
- [ ] I can create `knights_realm` and connect to it
- [ ] `SELECT current_database();` returns `knights_realm`

Optional extension
------------------
- After creating the database, create a simple table (`knights`) and insert a few rows. Use `SELECT` to query the rows.

Example:

```sql
CREATE TABLE knights (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100),
	title VARCHAR(100),
	sworn BOOLEAN DEFAULT false
);

INSERT INTO knights (name, title, sworn) VALUES
('Sir Lancel', 'Knight of the Lake', true),
('Dame Meriel', 'Guardian of the Gate', false);

SELECT * FROM knights;
```

***

Save your commands in a text file or copy them into your notes — you'll use similar commands for other schemas in this course.

