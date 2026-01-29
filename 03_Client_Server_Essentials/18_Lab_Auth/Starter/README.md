# Lab 18: JWT Authentication - Code Review and Testing

## Lab Overview

In this lab, you will:
1. **Review** a complete JWT authentication implementation
2. **Discuss** how the code works with your team
3. **Create** a Postman collection to test all routes
4. **Test** the authentication flow end-to-end

This is a **code review and testing lab** - the code is already complete. Your goal is to understand how all the pieces work together and create comprehensive tests.

## Learning Objectives

By the end of this lab, you will be able to:
- Explain how JWT authentication works in Express
- Identify the purpose of each file in an authentication system
- Create and use Postman collections for API testing
- Test protected routes with Bearer tokens
- Understand the middleware pattern for authentication

## Project Structure

```
18_Lab_Auth/Starter/
├── src/
│   ├── index.ts                    # Main server file
│   ├── config/
│   │   └── database.ts             # Database configuration
│   ├── models/
│   │   ├── index.ts                # Model exports
│   │   └── user.ts                 # User model with password hashing
│   ├── middleware/
│   │   └── auth.ts                 # JWT verification middleware
│   └── routes/
│       ├── auth.ts                 # Public authentication routes
│       └── protected.ts            # Protected routes requiring JWT
├── package.json
├── tsconfig.json
├── .env.example
└── README.md (this file)
```

## Part 1: Setup (10 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Configure Environment

Create a `.env` file from the example:

```bash
cp .env.example .env
```

The `.env` file should contain:
```env
DATABASE_URL=postgres://postgres:root@localhost:5432/adventure
PORT=4000
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10
```

**Important:** Make sure your PostgreSQL server is running and the database exists!

### Step 3: Create Database

```bash
psql -U postgres -f db_setup/adventure.sql
```

### Step 4: Start the Server

```bash
npm run dev
```

You should see:
```
✓ Database connection established successfully.
✓ Database synchronized.
🚀 Server running on http://localhost:4000
```

## Part 2: Code Review (5 minutes)

Work through each file and answer the discussion questions with your team.

### File 1: `src/models/user.ts`

**Review the User model and answer:**

1. What Sequelize hooks are used for password hashing?
2. Why do we hash passwords in the `beforeCreate` hook instead of in the route?
3. What does the `comparePassword` instance method do?
4. Why is the password validation set to `len: [8, 100]` instead of 60 (bcrypt hash length)?

**Key Code to Discuss:**
```typescript
hooks: {
  beforeCreate: async (user: User) => {
    user.password = await bcrypt.hash(user.password, saltRounds)
  },
  beforeUpdate: async (user: User) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, saltRounds)
    }
  }
}
```

### File 2: `src/middleware/auth.ts`

**Review the authentication middleware and answer:**

1. How does the middleware extract the JWT token from the request?
2. What does `jwt.verify()` do?
3. What information is stored in `req.user` after successful verification?
4. What are the different error types that can be thrown by `jwt.verify()`?
5. Why do we return different error messages for expired vs invalid tokens?

**Key Code to Discuss:**
```typescript
const token = authHeader?.split(' ')[1]
const decoded = jwt.verify(token, secret) as JwtPayload
req.user = {
  userId: decoded.userId,
  email: decoded.email
}
```

### File 3: `src/routes/auth.ts`

**Review the authentication routes and answer:**

1. What does `jwt.sign()` do in the login route?
2. What data is included in the JWT payload?
3. Why don't we return passwords in any responses?
4. Why do we return the same error message for non-existent users and wrong passwords?
5. What would happen if `JWT_SECRET` is not set in environment variables?

**Key Code to Discuss:**
```typescript
const token = jwt.sign(
  { userId: user.id, email: user.email },
  secret,
  { expiresIn }
)
```

### File 4: `src/routes/protected.ts`

**Review the protected routes and answer:**

1. How does `authenticateToken` protect these routes?
2. How do we access the authenticated user's information in route handlers?
3. Why don't we need to verify the token again in each route handler?
4. What happens if someone tries to access these routes without a token?

**Key Code to Discuss:**
```typescript
router.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user!.userId)
  // ...
})
```

### File 5: `src/index.ts`

**Review the main server file and answer:**

1. What's the difference between `/api/auth` routes and `/api` routes?
2. Why are authentication routes separate from protected routes?
3. What does `sequelize.sync({ force: true })` do? Is this safe for production?

## Part 3: Create Postman Collection (5 minutes)

You will create a comprehensive Postman collection to test all the authentication endpoints.

### Step 1: Create a New Collection

1. Open Postman
2. Click **New** → **Collection**
3. Name it: `JWT Authentication Lab`
4. Add a description:
   ```
   Testing JWT authentication flow including:
   - User registration
   - User login (receive JWT)
   - Protected routes with token
   - Error handling
   ```

### Step 2: Set Collection Variables

1. Click on your collection → **Variables** tab
2. Add these variables:

| Variable | Initial Value | Current Value |
|----------|--------------|---------------|
| `baseUrl` | `http://localhost:4000` | `http://localhost:4000` |
| `token` | (leave empty) | (leave empty) |
| `userId` | (leave empty) | (leave empty) |

These variables will be used across all requests.

### Step 3: Create Requests

Create the following requests in your collection. For each request:
- Set the method (GET, POST, PUT, DELETE)
- Set the URL
- Configure headers
- Configure body (for POST/PUT)
- Add tests (explained below)

---

#### Request 1: Register User

- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/auth/register`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 201", function () {
      pm.response.to.have.status(201);
  });
  
  pm.test("Response has user object", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('user');
      pm.expect(jsonData.user).to.have.property('id');
      pm.expect(jsonData.user).to.have.property('email');
  });
  
  pm.test("Password not in response", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData.user).to.not.have.property('password');
  });
  
  // Save user ID for later requests
  if (pm.response.code === 201) {
      var jsonData = pm.response.json();
      pm.collectionVariables.set("userId", jsonData.user.id);
  }
  ```

---

#### Request 2: Login

- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/auth/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "password123"
  }
  ```
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });
  
  pm.test("Response has token", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('token');
      pm.expect(jsonData.token).to.be.a('string');
      pm.expect(jsonData.token.length).to.be.above(20);
  });
  
  pm.test("Token has three parts (header.payload.signature)", function () {
      var jsonData = pm.response.json();
      var parts = jsonData.token.split('.');
      pm.expect(parts.length).to.equal(3);
  });
  
  // Save token for authenticated requests
  if (pm.response.code === 200) {
      var jsonData = pm.response.json();
      pm.collectionVariables.set("token", jsonData.token);
  }
  ```

---

#### Request 3: Login with Wrong Password

- **Method:** `POST`
- **URL:** `{{baseUrl}}/api/auth/login`
- **Headers:**
  ```
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "email": "test@example.com",
    "password": "wrongpassword"
  }
  ```
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 401", function () {
      pm.response.to.have.status(401);
  });
  
  pm.test("Error message returned", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('error');
  });
  
  pm.test("No token returned", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData).to.not.have.property('token');
  });
  ```

---

#### Request 4: Get Profile (With Token)

- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/profile`
- **Headers:**
  ```
  Authorization: Bearer {{token}}
  ```
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });
  
  pm.test("User profile returned", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('user');
      pm.expect(jsonData.user).to.have.property('email');
  });
  
  pm.test("Password not in response", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData.user).to.not.have.property('password');
  });
  ```

---

#### Request 5: Get Profile (Without Token)

- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/profile`
- **Headers:** (None - no Authorization header)
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 401", function () {
      pm.response.to.have.status(401);
  });
  
  pm.test("Error indicates no token", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData.error).to.include('token');
  });
  ```

---

#### Request 6: Get All Users (With Token)

- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/users`
- **Headers:**
  ```
  Authorization: Bearer {{token}}
  ```
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });
  
  pm.test("Users array returned", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData).to.have.property('users');
      pm.expect(jsonData.users).to.be.an('array');
  });
  
  pm.test("Count matches array length", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData.count).to.equal(jsonData.users.length);
  });
  ```

---

#### Request 7: Update Profile (With Token)

- **Method:** `PUT`
- **URL:** `{{baseUrl}}/api/profile`
- **Headers:**
  ```
  Authorization: Bearer {{token}}
  Content-Type: application/json
  ```
- **Body (JSON):**
  ```json
  {
    "username": "updateduser"
  }
  ```
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });
  
  pm.test("User updated successfully", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData.message).to.include('updated');
      pm.expect(jsonData.user.username).to.equal('updateduser');
  });
  ```

---

#### Request 8: Get User by ID (With Token)

- **Method:** `GET`
- **URL:** `{{baseUrl}}/api/users/{{userId}}`
- **Headers:**
  ```
  Authorization: Bearer {{token}}
  ```
- **Tests (JavaScript):**
  ```javascript
  pm.test("Status code is 200", function () {
      pm.response.to.have.status(200);
  });
  
  pm.test("Correct user returned", function () {
      var jsonData = pm.response.json();
      pm.expect(jsonData.user.id).to.equal(pm.collectionVariables.get("userId"));
  });
  ```

### Step 4: Run the Collection

1. Click **Run** on your collection
2. Select all requests
3. Click **Run JWT Authentication Lab**
4. All tests should pass! ✅

If any tests fail, debug the issue and fix it.

### Step 5: Export Your Collection

1. Click the three dots (•••) on your collection
2. Click **Export**
3. Choose **Collection v2.1**
4. Save as `JWT_Authentication_Lab.postman_collection.json`

## Part 4: Discussion Questions (20 minutes)

Discuss these questions with your team:

### Security Questions

1. **Why is JWT stateless?** What are the benefits and drawbacks?
2. **Can a JWT be revoked immediately?** If not, how could we implement revocation?
3. **What happens if someone steals a JWT token?** How can we minimize the damage?
4. **Why should JWTs have an expiration time?** What's a good expiration time?
5. **Is the JWT payload encrypted?** Can someone read what's inside? What should we NOT put in the payload?

### Implementation Questions

1. **Why do we check `user.changed('password')` in the beforeUpdate hook?**
2. **What's the difference between `bcrypt.hash()` and `bcrypt.compare()`?**
3. **Why do we use middleware instead of checking the token in every route?**
4. **How does `req.user` get populated?** Where does it come from?
5. **What would happen if we forgot to add `authenticateToken` middleware to a route that should be protected?**

### Testing Questions

1. **Why did we save the token in a collection variable?**
2. **How do Postman tests verify the response?**
3. **Why is it important to test both successful and failed requests?**
4. **What other edge cases should we test?**

## Part 5: Bonus Challenges (Optional)

If you finish early, try these challenges:

### Challenge 1: Test Token Expiration

Modify the `.env` file to set `JWT_EXPIRES_IN=10s` (10 seconds). 
- Login and save the token
- Wait 15 seconds
- Try to access a protected route
- What error do you get?

### Challenge 2: Add More Postman Tests

Add these additional requests:
- Register with duplicate email (should return 409)
- Register with weak password (should return 400)
- Login with non-existent email (should return 401)
- Get user by invalid ID (should return 404)

### Challenge 3: Decode a JWT

1. Login and copy your JWT token
2. Go to [jwt.io](https://jwt.io)
3. Paste your token in the "Encoded" section
4. What do you see in the payload?
5. Can you see your userId and email?
6. Can you see the `iat` (issued at) and `exp` (expiration) times?

### Challenge 4: Explore the Code

Try making these modifications and observe what happens:
1. Remove the `authenticateToken` middleware from a protected route - what happens?
2. Change the `JWT_SECRET` in `.env` - can old tokens still work?
3. Try to manually create a fake token - does it work?

## Deliverables

When you complete this lab, you should have:

1. ✅ A running JWT authentication server
2. ✅ A Postman collection with 8+ requests
3. ✅ All Postman tests passing
4. ✅ Answers to all discussion questions
5. ✅ Exported Postman collection JSON file

## Common Issues and Solutions

### Issue: "Server configuration error" on login

**Solution:** Make sure your `.env` file exists and contains `JWT_SECRET`.

### Issue: "No token provided" error

**Solution:** Check that your Authorization header is formatted as `Bearer <token>` (with a space).

### Issue: "Token expired" error

**Solution:** Login again to get a fresh token. Tokens expire based on `JWT_EXPIRES_IN`.

### Issue: "Invalid token" error

**Solution:** Make sure you're using the correct token from the login response. Don't modify it.

### Issue: Database connection failed

**Solution:** Make sure PostgreSQL is running and the `adventure` database exists.

## What You've Learned

After completing this lab, you now understand:

- ✅ How JWT authentication works from end to end
- ✅ The role of middleware in protecting routes
- ✅ How to hash and verify passwords securely
- ✅ How to create comprehensive API tests in Postman
- ✅ The security considerations of JWT authentication
- ✅ How stateless authentication differs from session-based auth

## Next Steps

In future labs, you might:
- Implement refresh tokens for better security
- Add role-based access control (RBAC)
- Implement password reset functionality
- Add rate limiting to prevent brute force attacks
- Deploy your authentication system to production

Great work! 🎉
