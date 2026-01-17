# Lab Activity: Securing Database Credentials with Environment Variables

## Objective
In this 5-minute exercise, you'll learn how to securely manage database credentials using environment variables and the `dotenv` package. You'll update an existing Node.js application to read database configuration from a `.env` file instead of hardcoding sensitive information.

## What You'll Learn
- Installing and configuring the `dotenv` package
- Creating and using a `.env` file
- Best practices for securing database credentials

## Starting Point
You've been provided with an `index.js` file that connects to PostgreSQL using a connection pool and queries all users. However, the database password is currently hardcoded in the file. Your job is to move it to environment variables!

## Instructions

### Step 1: Install the dotenv Package

Open your terminal in this directory and run:

```bash
npm install dotenv
```

The `dotenv` package loads environment variables from a `.env` file into `process.env`.

### Step 2: Create a .env File

Create a new file called `.env` in this directory (same level as `index.js`).

Add the following variables to your `.env` file:

```
DB_USER=postgres
DB_HOST=localhost
DB_NAME=node_pg_demo
DB_PASSWORD=your_actual_password_here
DB_PORT=5432
```

**Important:** Replace `your_actual_password_here` with your actual PostgreSQL password!

### Step 3: Update index.js

At the **top** of `index.js`, add this line to load the environment variables:

```javascript
require('dotenv').config();
```

### Step 4: Update the Pool Configuration

Find the pool configuration in `index.js` and update it to use environment variables:

```javascript
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
```

### Step 5: Test Your Application

Run your application:

```bash
node index.js
```

You should see all users from the database logged to the console!

## ✅ Success Criteria

Your application should:
- Load environment variables from the `.env` file
- Successfully connect to the database using those variables
- Query and display all users from the `users` table

## 🎯 Bonus Challenge

Add a `.gitignore` file to prevent accidentally committing your `.env` file to version control:

```bash
echo "node_modules/" > .gitignore
echo ".env" >> .gitignore
```

## 🔒 Security Best Practice

**Never commit your `.env` file to Git!** It contains sensitive credentials. Always add it to your `.gitignore` file.

## Troubleshooting

- **"Cannot find module 'dotenv'"**: Make sure you ran `npm install dotenv`
- **"password authentication failed"**: Double-check the password in your `.env` file
- **"database does not exist"**: Make sure you created the `node_pg_demo` database in the previous exercise
