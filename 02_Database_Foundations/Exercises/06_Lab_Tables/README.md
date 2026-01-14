(#) Activity: Create the `realms` table in `knights_realm` database

Objective
---------
Students will create a `knights_realm` database (if it does not already exist), connect to it, and create a `realms` table with the following columns:

- `id` — SERIAL PRIMARY KEY
- `name` — VARCHAR(120)
- `ruler` — VARCHAR(100)
- `description` — TEXT

Estimated time: 10–20 minutes

Prerequisites
-------------
- PostgreSQL installed and running
- Access to a SQL client (psql or DBeaver)

Steps
-----

1) Connect to your Postgres server (using psql as postgres superuser):

```bash
psql -U postgres -h localhost
```

2) Create the database (if needed) and connect to it:

```sql
-- create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS knights_realm; -- Note: some Postgres versions don't accept IF NOT EXISTS here, use DROP/CREATE if needed

-- connect to the database (psql only)
\c knights_realm
```

3) Create the `realms` table

```sql
CREATE TABLE realms (
	id SERIAL PRIMARY KEY,
	name VARCHAR(120) NOT NULL,
	ruler VARCHAR(100),
	description TEXT
);
```

4) Verify the table was created and insert a sample row

```sql
-- list tables
\dt

-- insert a sample realm
INSERT INTO realms (name, ruler, description) VALUES
('Knights Realm', 'Queen Isolde', 'A misty realm of valiant knights and deep forests.');

-- select the rows
SELECT * FROM realms;
```

Notes and troubleshooting
-------------------------
- The `CREATE DATABASE IF NOT EXISTS` syntax is not supported in all Postgres versions. If you see a syntax error, use a safe pattern instead:

```sql
-- drop if exists, then create
DROP DATABASE IF EXISTS knights_realm;
CREATE DATABASE knights_realm;
\c knights_realm
```

- In DBeaver, run the `CREATE DATABASE` command from the default `postgres` connection, then open a new SQL editor connected to `knights_realm` and run the `CREATE TABLE` statements.
- If you get permission errors, ensure you're using a user with CREATEDB privileges, or ask an instructor to create the DB for you.

Helpful resources
-----------------
- PostgreSQL official docs: https://www.postgresql.org/docs/current/
- psql reference: https://www.postgresql.org/docs/current/app-psql.html
- Beginner-friendly tutorial: https://www.postgresqltutorial.com/

Verification checklist
----------------------

- [ ] `knights_realm` database exists
- [ ] `realms` table exists with the correct columns and types
- [ ] Able to insert and select rows from the `realms` table

