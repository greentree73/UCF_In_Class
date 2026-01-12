# Install PostgreSQL and DBeaver — Student Instructions


1) Install PostgreSQL
---------------------

- Windows / macOS / Linux installers are available from the official site. Download the installer for your OS and follow the prompts.

- Official download page: https://www.postgresql.org/download/

- Notes while installing:
	- Choose a password for the `postgres` superuser when prompted. Remember it — you'll need it to connect.
	- The default port is `5432`.
	- On Windows the installer typically includes pgAdmin; you may still prefer DBeaver for a uniform GUI experience.

2) Install DBeaver (GUI client)
-------------------------------

- DBeaver is an open-source database GUI that supports PostgreSQL and many other engines.
- Download: https://dbeaver.io/download/

- Install the Community Edition and run it after installation.

3) Create a new connection in DBeaver
------------------------------------

- Open DBeaver → Database → New Database Connection → Choose "PostgreSQL".
- Enter the connection details:
	- Host: `localhost`
	- Port: `5432`
	- Database: `postgres` (or the default database created by the installer)
	- User name: `postgres` (or another user you created)
	- Password: the password you set during installation
- Test the connection and save it. You should be able to connect and see the server/browser tree.

4) Starter SQL commands — create a test database and table
---------------------------------------------------------

Open a SQL editor in DBeaver (right-click the connection → SQL Editor) and run the following commands step-by-step.
```
-- Create a new database for practice
CREATE DATABASE splitstack_test;

-- Connect to the new database (in psql or in DBeaver choose the database in the navigator)
\c splitstack_test;



-- Create a sample table
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL UNIQUE,
	email VARCHAR(255) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert some sample rows
INSERT INTO users (username, email) VALUES
('alice', 'alice@example.com'),
('bob', 'bob@example.com'),
('carol', 'carol@example.com');

-- Basic queries
SELECT * FROM users;
SELECT username, email FROM users WHERE username = 'alice';

-- Update and delete examples
UPDATE users SET email = 'alice@newdomain.com' WHERE username = 'alice';
DELETE FROM users WHERE username = 'carol';
```
5) Helpful psql (command-line) commands
--------------------------------------

- If you prefer the terminal, use `psql` (shipped with PostgreSQL):

	```bash
	# connect as postgres user (you will be prompted for password)
	psql -U postgres -h localhost

	# then inside psql switch to your test db
	\c splitstack_test

	# run queries directly
	SELECT * FROM users;
	```

6) Troubleshooting
------------------

- PostgreSQL service not running:
	- Windows: open Services and start the PostgreSQL service
	- macOS (homebrew): brew services start postgresql
	- Linux (systemd): sudo systemctl start postgresql
- Authentication failed: check username/password and that the server is running on the expected port (5432).
- Port conflict: another process might be using 5432. If so, pick a different port during install or change `postgresql.conf`.

7) Additional resources
-----------------------

- PostgreSQL documentation: https://www.postgresql.org/docs/
- DBeaver docs: https://dbeaver.io/docs/
- A quick SQL reference: https://www.postgresqltutorial.com/

Verification checklist
----------------------

- [ ] PostgreSQL installed and service running
- [ ] DBeaver installed and connected to `localhost` Postgres
- [ ] `splitstack_test` database created
- [ ] `users` table created and sample rows inserted
- [ ] Able to run SELECT/UPDATE/DELETE queries

If you want, I can also provide a `.sql` file with the starter commands that students can run as a script. Would you like me to add that file to the workbook folder?

