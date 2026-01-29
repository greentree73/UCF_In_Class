# Lab: Implement Password Encryption with bcrypt

## Goal

Secure user passwords by implementing bcrypt hashing in the user registration route. Currently, the application creates users with plain-text passwords, which is a major security vulnerability. Your task is to hash passwords before storing them in the database.

## Background

Right now, when a user registers, their password is stored in plain text in the database. This means:
- ❌ Anyone with database access can see all user passwords
- ❌ If the database is compromised, all passwords are exposed
- ❌ Users who reuse passwords across sites are at risk

**Your mission**: Use the bcrypt library to hash passwords before saving them to the database.

## Instructions

### Step 1: Import bcrypt

Open `src/routes/index.ts` and import the bcrypt library at the top of the file:

```typescript
import bcrypt from 'bcrypt'
```

The bcrypt library is already installed in `package.json`, so you just need to import it.

### Step 2: Get the Salt Rounds

In the `POST /api/users` route, you'll notice there's a comment about getting salt rounds. Add this line:

```typescript
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
```

**What are salt rounds?**
- Salt rounds determine how many times the password is hashed
- Higher numbers = more secure but slower
- 10-12 is recommended for production
- The value is stored in your `.env` file

### Step 3: Hash the Password

Below the salt rounds line, you'll see a comment about hashing the password. Add this code:

```typescript
const hashedPassword = await bcrypt.hash(password, saltRounds)
```

**What does `bcrypt.hash()` do?**
1. Generates a random "salt" (random data added to the password)
2. Combines the password with the salt
3. Hashes the result multiple times (based on saltRounds)
4. Returns a string like: `$2b$10$XZTjE.../abcdefghijklmnopqrst...`

### Step 4: Use the Hashed Password

Find where the user is created with `User.create()`. Currently it passes the plain `password`. Change it to pass `hashedPassword` instead:

```typescript
const user = await User.create({
  username,
  email,
  password: hashedPassword, // ← Change 'password' to 'hashedPassword'
})
```

This ensures the **hashed** password is saved to the database, not the plain text.

### Step 5: Test Your Implementation

1. **Setup the database**:
   ```bash
   # Create the adventure database
   psql -U postgres -f db_setup/adventure.sql
   ```

2. **Create a .env file**:
   ```bash
   cp .env.example .env
   # Edit .env if needed (default values should work)
   ```

3. **Install dependencies and run**:
   ```bash
   npm install
   npm run dev
   ```

4. **Create a user**:
   ```bash
   curl -X POST http://localhost:4000/api/users \
     -H "Content-Type: application/json" \
     -d '{"username":"alice","email":"alice@example.com","password":"SecurePass123"}'
   ```

5. **Check the console output**:
   - You should see the plain text password
   - You should see a hashed version starting with `$2b$10$...`
   - You should see "Password hashed in route layer"

6. **Try to login**:
   ```bash
   curl -X POST http://localhost:4000/api/login \
     -H "Content-Type: application/json" \
     -d '{"email":"alice@example.com","password":"SecurePass123"}'
   ```

7. **Verify in the database** (optional):
   ```bash
   psql -U postgres -d adventure
   SELECT * FROM users;
   ```
   
   The password column should show a hash like `$2b$10$XZTjE...` instead of plain text!

## What You're Learning

- ✅ How to use bcrypt to hash passwords
- ✅ Understanding salt rounds and their importance
- ✅ Implementing security in the route/controller layer
- ✅ Best practices for password storage
- ✅ The difference between plain text and hashed passwords

## Common Issues

**Error: "hashedPassword is not defined"**
- Make sure you added the `bcrypt.hash()` line
- Check that you're using `await` before `bcrypt.hash()`

**Error: "Cannot find module 'bcrypt'"**
- Run `npm install` to ensure bcrypt is installed

**Login doesn't work after creating a user**
- The login route already uses `bcrypt.compare()` to verify passwords
- Make sure you passed `hashedPassword` to `User.create()`, not `password`

## Bonus Challenge

Once you have the basic implementation working, try to:
1. Look at the `POST /api/login` route to understand how password comparison works
2. Examine the `PUT /api/users/:id/password` route to see password updating with hashing

## Need Help?

- Review the comments in `src/routes/index.ts` - they guide you through each step
- Look at the facilitator exercise (13_Fac_Encryption) for a working example
- Remember: Never store plain-text passwords in a database!
