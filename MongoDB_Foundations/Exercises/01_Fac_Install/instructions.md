(#) MongoDB — Installation & Quick Start

This document introduces students to MongoDB and provides step-by-step installation instructions for macOS and Windows. It also shows how to install MongoDB Compass (the official GUI) and how to verify the installation.

Why MongoDB?
- MongoDB is a popular document database (NoSQL) used in many full-stack apps. It stores JSON-like documents (BSON) and is easy to get started with for local development.

Prerequisites
- A development machine (macOS or Windows).
- 2 GB free disk space and administrative privileges to install software.
- Optional: Homebrew (macOS) or WSL (Windows) if you prefer Linux-style tooling.

Overview of steps
1. Install MongoDB Community Server (macOS or Windows instructions below).
2. Install MongoDB Compass (GUI client).
3. Start MongoDB and verify the server is running.
4. Connect with Compass and the mongo shell (mongosh).

---

macOS (Homebrew) — recommended

1. Install Homebrew (if you don't already have it)

	Open Terminal and run:

	```bash
	/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
	```

2. Tap the MongoDB Homebrew tap and install the latest community release

	```bash
	brew tap mongodb/brew
	brew install mongodb-community@6.0
	```

	Note: replace `6.0` with the latest supported major version if needed. The tap provides the official community formula.

3. Start MongoDB as a background service

	```bash
	brew services start mongodb/brew/mongodb-community
	```

	Or to run it in the foreground for a single terminal session:

	```bash
	mongod --config /opt/homebrew/etc/mongod.conf
	```

4. Verify mongod is running

	```bash
	mongosh --eval "db.adminCommand({ ping: 1 })"
	```

	You should receive a small JSON reply with { ok: 1 } indicating the server is responding.

macOS (manual/zip install)

- If you prefer manual installs, download the macOS TGZ from https://www.mongodb.com/try/download/community, extract it, and follow the included README to run `mongod` and `mongosh`.

---

Windows (MSI installer) — recommended for Windows users

1. Download the MongoDB Community Server MSI

	- Visit https://www.mongodb.com/try/download/community
	- Select "Windows" and the latest release (recommended) and download the MSI installer.

2. Run the MSI installer

	- Double-click the downloaded MSI and follow the setup wizard.
	- Choose "Complete" install for the simplest setup.
	- On the "Service Configuration" step select "Run service as Network Service user" (default) so mongod runs as a Windows service.

3. Verify the service is running

	- Open PowerShell or Command Prompt and run:

	```powershell
	sc query MongoDB
	# or
	net start MongoDB
	```

	- You can also open Windows Services (services.msc) and look for the `MongoDB` service.

4. Use mongosh (MongoDB Shell)

	The MSI installer bundles `mongosh`. Open a new PowerShell window and run:

	```powershell
	mongosh --eval "db.adminCommand({ ping: 1 })"
	```

	Expect { ok: 1 } on success.

Windows (WSL) alternative

- If you use WSL (Windows Subsystem for Linux) you may follow the Linux install instructions inside your WSL distro (Ubuntu, etc.). WSL installs are useful if your workflow is Linux-based. Remember to open/forward ports if running mongod in WSL and connecting from Windows apps.

---

Install MongoDB Compass (GUI)

Compass provides a visual interface to explore data, run queries, and manage indices.

1. Download Compass

	- Go to https://www.mongodb.com/try/download/compass
	- Choose the platform (macOS or Windows) and download the installer.

2. Install and run Compass

	- macOS: open the downloaded .dmg and drag Compass to Applications.
	- Windows: run the downloaded .exe and follow the installer.

3. Connect to the local server

	- Open Compass and use the default connection string: `mongodb://localhost:27017` and click Connect.
	- If you started mongod on a different port or host, update the connection string accordingly.

---

Quick verification (both platforms)

1. Confirm `mongosh` is available and the server responds:

	```bash
	mongosh --eval "db.adminCommand({ ping: 1 })"
	```

2. In Compass, connect to `mongodb://localhost:27017` and confirm you can see the `admin` database and run a simple query in the Collections tab.


Troubleshooting
---------------
- Port in use: If mongod fails to start because port 27017 is in use, either stop the other service or run mongod with `--port <other>`.
- Permissions: On macOS you may need to run Homebrew commands with appropriate user privileges. Avoid running mongod as root.
- PATH: If `mongosh` or `mongod` commands are not found, ensure the installation binaries are on your PATH or use the full path from the installation directory.
- Firewall: Ensure local firewall rules allow access to port 27017 if connecting from another machine.

References
----------
- Official MongoDB docs: https://www.mongodb.com/docs/
- MongoDB Community Server downloads: https://www.mongodb.com/try/download/community
- Compass downloads: https://www.mongodb.com/try/download/compass

---

Lab: Create & Query a Sample Collection (Compass)
-----------------------------------------------
This short lab walks students through using MongoDB Compass to create a database and collection, insert documents, and run queries.

1) Start Compass and connect to your local server

- Open MongoDB Compass and connect using `mongodb://localhost:27017`.
- If the connection succeeds you'll see the left-hand sidebar with databases (admin, local, etc.).

2) Create a new database and collection

- Click "Create Database" in the sidebar.
- Database name: hackhaven
- Collection name: posts
- Click Create Database.

3) Insert sample documents

- Select the new `hackhaven.posts` collection and click "Insert Document".
- Paste the following JSON into the editor and click "Insert":

```json
{
	"title": "How to seed my database?",
	"body": "I'm learning MongoDB and want to add seed data for my app. Any tips?",
	"author": "alice",
	"tags": ["mongodb", "seeding", "nodejs"],
	"createdAt": { "$date": { "$numberLong": "1633046400000" } }
}
```

- Insert two more documents (use different titles/authors):

```json
{
	"title": "Best practices for indexing",
	"body": "How should I index fields for fast lookups on a questions list?",
	"author": "bob",
	"tags": ["indexing", "performance"],
	"createdAt": { "$date": { "$numberLong": "1633132800000" } }
}

{
	"title": "React + MongoDB setup",
	"body": "Can someone show a minimal example of a React frontend fetching from a MongoDB-backed API?",
	"author": "carol",
	"tags": ["react", "mongodb", "api"],
	"createdAt": { "$date": { "$numberLong": "1633219200000" } }
}
```

4) Explore and query

- In the `Documents` tab you'll now see the saved documents. Use the filter bar at the top to run queries. Examples:

	- Find by author `alice`:

		```json
		{ "author": "alice" }
		```

	- Find posts with tag `mongodb`:

		```json
		{ "tags": "mongodb" }
		```

	- Find posts created after 2021-10-01 (use the stored date fields):

		```json
		{ "createdAt": { "$gt": { "$date": "2021-10-01T00:00:00Z" } } }
		```

5) Update a document

- Click the three-dot menu next to a document and choose "Edit Document".
- Modify the `body` or add a new field, then click "Update".

6) Delete a document

- Select a document using the checkbox and click "Delete Documents" (confirm when prompted).

7) Use the Aggregation tab (optional)

- Click the `Aggregation` tab to build pipeline queries. Example pipeline to count posts per author:

```json
[
	{ "$group": { "_id": "$author", "count": { "$sum": 1 } } },
	{ "$sort": { "count": -1 } }
]
```

8) Wrap-up

- Ask students to create one additional collection (e.g., `users` or `comments`) and insert sample documents.
- Encourage exploration of Compass features: schema analysis, index management, explain plans for aggregation queries.

Instructor tip: You can export the collection to JSON in Compass (Collection -> Export Collection) and provide the JSON file to students as a seed file they can import locally using `mongorestore` or via a simple Node script.


