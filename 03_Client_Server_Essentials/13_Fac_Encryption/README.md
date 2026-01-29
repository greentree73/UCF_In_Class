# Introduction to Password Encryption with bcrypt

## What is Password Hashing?

**Password hashing** is the process of converting a plain-text password into a scrambled, unreadable string of characters. Unlike encryption (which can be reversed), hashing is a one-way process - once a password is hashed, it cannot be converted back to its original form.

Think of it like grinding coffee beans - you can turn whole beans into grounds, but you can't turn the grounds back into whole beans. Similarly, you can hash a password, but you can't "unhash" it.

## Why Do We Need Password Hashing?

Storing passwords in plain text is one of the biggest security mistakes you can make. Here's why:

1. **Database Breaches**: If someone gains access to your database, they have all user passwords
2. **Insider Threats**: Even trusted employees shouldn't have access to user passwords
3. **Password Reuse**: Many users reuse passwords across sites - exposing one means exposing many
4. **Legal Requirements**: Many regulations (GDPR, CCPA) require proper password protection
5. **Trust**: Users trust you to protect their sensitive information

### Example: The Danger of Plain-Text Passwords

```typescript
// NEVER DO THIS - Storing plain-text passwords
await User.create({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'MySecretPassword123'  // ❌ Anyone with database access can see this!
})

// ALWAYS DO THIS - Storing hashed passwords
await User.create({
  username: 'john_doe',
  email: 'john@example.com',
  password: '$2b$10$XZTjE...'  // ✅ Hashed - unreadable and secure
})
```

## What is bcrypt?

**bcrypt** is a password hashing library specifically designed for securing passwords. It's been trusted by developers for over 20 years and is considered the industry standard for password security.

### Why bcrypt Over Other Options?

1. **Slow by Design**: bcrypt is intentionally slow, making it difficult for attackers to crack passwords through brute force
2. **Salt Included**: Automatically generates unique "salt" for each password, preventing rainbow table attacks
3. **Adaptive**: You can increase security over time by adjusting the "work factor"
4. **Battle-Tested**: Used by major companies and proven secure through decades of use

### How bcrypt Works

When you hash a password with bcrypt:

```
Plain password: "MyPassword123"
         ↓
    bcrypt hashing
         ↓
Hashed: "$2b$10$XZTjE.../abcdefghijklmnopqrstuvwxyz..."
```

The hash contains:
- **`$2b$`**: The bcrypt algorithm identifier
- **`10`**: The cost factor (higher = more secure but slower)
- **Salt**: Random data to ensure identical passwords have different hashes
- **Hash**: The actual hashed password

## Comparing Plain Passwords to Hashed Passwords

You might wonder: "If I can't reverse a hash, how do I check if a password is correct?"

The answer: You hash the password attempt and compare it to the stored hash.

```typescript
// User tries to log in with: "MyPassword123"
const passwordAttempt = "MyPassword123"
const storedHash = "$2b$10$XZTjE.../abcdefghijklmnopqrstuvwxyz..."

// bcrypt hashes the attempt and compares
const isMatch = await bcrypt.compare(passwordAttempt, storedHash)
// Returns true if passwords match!
```

## Implementing bcrypt in Our Project

In this exercise, we'll integrate bcrypt into our existing Express + TypeScript + Sequelize project. You'll learn how to:

1. **Install and configure bcrypt** with TypeScript support
2. **Hash passwords** before saving users to the database
3. **Use lifecycle hooks** to automatically hash passwords
4. **Compare passwords** during user authentication
5. **Handle hashing errors** gracefully

### The Flow of Password Hashing

```
User Registration:
  User submits password → bcrypt hashes it → Hashed password saved to database

User Login:
  User submits password → bcrypt compares to stored hash → Login success/failure
```

## Best Practices for Password Security

As we implement bcrypt, keep these principles in mind:

- **Never log passwords**: Don't write passwords to console or log files
- **Use appropriate cost factors**: Balance security with performance (10-12 is standard)
- **Hash on the server**: Never trust client-side hashing alone
- **Don't limit password length**: Let users create long, complex passwords
- **Use HTTPS**: Encrypt data in transit to prevent interception

## Getting Started

We'll continue building on the project structure you've been using, adding bcrypt to handle password hashing for our User model. By the end of this exercise, your application will securely store passwords using industry-standard encryption techniques.

Let's dive in and make our application more secure!
