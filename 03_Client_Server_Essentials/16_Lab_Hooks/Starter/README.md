# Lab: Implement Password Hashing with Lifecycle Hooks

## Goal

Move password hashing logic from the route layer into the model using Sequelize lifecycle hooks. This demonstrates a more automated approach where password hashing happens automatically whenever a user is created or updated.

## Background

In the previous lab (14_Lab_Encryption), you implemented password hashing in the **route layer**:

```typescript
// In the route
const hashedPassword = await bcrypt.hash(password, saltRounds)
const user = await User.create({ username, email, password: hashedPassword })
```

This works, but you have to remember to hash the password in every route that creates or updates users. If you forget, plain-text passwords get stored!

**In this lab**, you'll implement hashing using **lifecycle hooks** in the model:

```typescript
// In the model
hooks: {
  beforeCreate: async (user) => {
    user.password = await bcrypt.hash(user.password, saltRounds)
  }
}

// In the route - no manual hashing needed!
const user = await User.create({ username, email, password }) // Automatically hashed!
```

## Why Use Hooks for Password Hashing?

### Advantages ✅
- **Automatic** - Hashing happens automatically, no need to remember
- **Consistent** - Every create/update operation hashes passwords
- **DRY** - Write hashing logic once in the model
- **Less error-prone** - Can't forget to hash in a route
- **Centralized** - All password logic is in one place

### Trade-offs ⚖️
- **Less visible** - Hashing happens "behind the scenes"
- **Harder to debug** - Need to check model hooks
- **Can be surprising** - Data changes during save operations

Both approaches are valid! Many frameworks and ORMs use hooks for password hashing by default.

## Your Task

You need to implement **two hooks** in the User model:

1. **`beforeCreate`** - Hash the password when a new user is created
2. **`beforeUpdate`** - Hash the password when a user's password is changed

You'll also add a **helper method** to compare passwords during login:
- **`comparePassword()`** - Instance method to verify passwords

## Instructions

### Step 1: Import bcrypt in the Model

Open `src/models/user.ts` and find the TODO comment at the top:

```typescript
// TODO: Import bcrypt library here
```

Add the import:

```typescript
import bcrypt from 'bcrypt'
```

### Step 2: Implement the beforeCreate Hook

Find the `beforeCreate` hook section (around line 120). You'll see:

```typescript
beforeCreate: async (user: User) => {
  // TODO: Hash the password before creating the user
  // 1. Get salt rounds from environment (or default to 10)
  // 2. Hash the user.password using bcrypt
  // 3. Replace user.password with the hashed version
},
```

Implement the password hashing logic:

```typescript
beforeCreate: async (user: User) => {
  // Get salt rounds from environment or use default
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
  
  // Hash the password
  const hashedPassword = await bcrypt.hash(user.password, saltRounds)
  
  // Replace the plain password with the hash
  user.password = hashedPassword
  
  console.log(`🔒 Password hashed in beforeCreate hook`)
},
```

### Step 3: Implement the beforeUpdate Hook

Find the `beforeUpdate` hook section. You'll see:

```typescript
beforeUpdate: async (user: User) => {
  // TODO: Hash the password if it was changed
  // 1. Check if password field was modified using user.changed('password')
  // 2. If changed, hash the new password
  // 3. Replace user.password with the hashed version
},
```

Implement the conditional password hashing:

```typescript
beforeUpdate: async (user: User) => {
  // Only hash if the password was actually changed
  if (user.changed('password')) {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    user.password = hashedPassword
    
    console.log(`🔒 Password hashed in beforeUpdate hook`)
  }
},
```

**Why check if password changed?**
- Without the check, you'd be hashing an already-hashed password!
- `user.changed('password')` returns `true` only if the password field was modified

### Step 4: Implement the comparePassword Method

Find the `comparePassword` method (around line 60). You'll see:

```typescript
async comparePassword(plainPassword: string): Promise<boolean> {
  // TODO: Compare the plain password with the hashed password
  // Use bcrypt.compare() to check if they match
  // Return true if they match, false otherwise
}
```

Implement the comparison:

```typescript
async comparePassword(plainPassword: string): Promise<boolean> {
  // Use bcrypt to compare the plain password with the stored hash
  return await bcrypt.compare(plainPassword, this.password)
}
```

## Testing Your Implementation

### 1. Setup

```bash
# Create the database
psql -U postgres -f db_setup/adventure.sql

# Create .env file
cp .env.example .env

# Install dependencies
npm install

# Start the server
npm run dev
```

### 2. Test User Creation (beforeCreate hook)

```bash
curl -X POST http://localhost:4000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"SecurePass123"}'
```

**Check the console output:**
- You should see: `🔒 Password hashed in beforeCreate hook`
- The response should NOT include the password

### 3. Test Login (comparePassword method)

```bash
# Login with correct password
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"SecurePass123"}'
```

**Expected:** Success! You should get user data back.

```bash
# Login with wrong password
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"WrongPassword"}'
```

**Expected:** Error! Should return "Invalid email or password"

### 4. Test Password Update (beforeUpdate hook)

```bash
curl -X PUT http://localhost:4000/api/users/1/password \
  -H "Content-Type: application/json" \
  -d '{"currentPassword":"SecurePass123","newPassword":"NewSecurePass456"}'
```

**Check the console output:**
- You should see: `🔒 Password hashed in beforeUpdate hook`

### 5. Verify the New Password Works

```bash
curl -X POST http://localhost:4000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"NewSecurePass456"}'
```

**Expected:** Success! The new password works.

### 6. Verify Database (Optional)

```bash
psql -U postgres -d adventure
SELECT username, email, LEFT(password, 30) as password_hash FROM users;
```

You should see hashes like `$2b$10$...` instead of plain text passwords.

## Common Issues

### "Cannot find module 'bcrypt'"
- Make sure you ran `npm install`
- Check that bcrypt is in `package.json` dependencies

### "Password hashed in beforeCreate hook" not appearing
- Make sure you added the `console.log` in the hook
- Check that you're actually calling `User.create()` in the route

### Login always fails
- Make sure you implemented `comparePassword()` correctly
- Verify the hook is actually hashing the password
- Check the database to confirm passwords are hashed

### Password update doesn't work
- Make sure you're checking `user.changed('password')` in beforeUpdate
- Without this check, you'll hash an already-hashed password

### Hooks not firing
- Make sure hooks are inside the second argument to `User.init()`
- Check for syntax errors in your hooks object

## What You're Learning

- ✅ How to use lifecycle hooks for automatic data transformations
- ✅ The difference between beforeCreate and beforeUpdate hooks
- ✅ How to conditionally process data based on what changed
- ✅ When to use hooks vs route-layer logic
- ✅ How to implement instance methods on Sequelize models

## Reflection Questions

After completing the lab, consider:

1. **When would you prefer hooks over route-layer hashing?**
   - Small projects with few routes?
   - Large projects with many developers?

2. **What are the downsides of using hooks?**
   - Is it harder to see what's happening?
   - How would you debug if passwords aren't being hashed?

3. **What other use cases could benefit from hooks?**
   - Timestamps?
   - Generating unique IDs?
   - Formatting phone numbers?

## Bonus Challenge

Once the basic implementation works:

1. **Add logging to track when passwords are hashed**
   - Log the username and timestamp
   - Don't log the actual password!

2. **Prevent rehashing already-hashed passwords**
   - Check if password starts with `$2b$` before hashing
   - This prevents accidentally double-hashing

3. **Add a beforeValidate hook**
   - Trim whitespace from the password
   - Runs before validation, so validation rules still apply

## Need Help?

- Review the facilitator exercise (15_Fac_Hooks) for hook examples
- Check the previous encryption lab (14_Lab_Encryption) for bcrypt usage
- Remember: Hooks go in the second argument to `Model.init()`
- The TODO comments in the code guide you step-by-step!