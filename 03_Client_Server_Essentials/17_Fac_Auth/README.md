# JSON Web Tokens (JWT) with Express and Sequelize

## Introduction to JWT Authentication

**JSON Web Tokens (JWT)** are a compact, URL-safe method of representing claims between two parties. In web applications, JWTs are commonly used for **authentication** and **authorization**, allowing servers to verify user identity without maintaining session state.

### What is a JWT?

A JWT is a string consisting of three parts separated by dots (`.`):

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjIzOTAyMn0.2z8V9X1y2Q3p4R5T6U7W8X9Y0Z1A2B3C4D5E6F7G8H9
```

This token has three parts:
1. **Header**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
2. **Payload**: `eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjIzOTAyMn0`
3. **Signature**: `2z8V9X1y2Q3p4R5T6U7W8X9Y0Z1A2B3C4D5E6F7G8H9`

#### 1. Header

The header typically consists of two parts:
- **alg**: The algorithm used to sign the token (e.g., HS256, RS256)
- **typ**: The type of token (JWT)

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

This JSON is then **Base64Url encoded** to form the first part of the JWT.

#### 2. Payload

The payload contains the **claims** - statements about an entity (typically, the user) and additional data. There are three types of claims:

- **Registered claims**: Predefined claims like `iss` (issuer), `exp` (expiration), `sub` (subject), `aud` (audience)
- **Public claims**: Custom claims that should be collision-resistant
- **Private claims**: Custom claims agreed upon between parties

Example payload:

```json
{
  "userId": 1,
  "email": "test@example.com",
  "iat": 1616239022,
  "exp": 1616325422
}
```

Common claims:
- `iat`: Issued at (timestamp)
- `exp`: Expiration time (timestamp)
- `sub`: Subject (usually user ID)

The payload is also **Base64Url encoded** to form the second part of the JWT.

#### 3. Signature

The signature ensures the token hasn't been tampered with. It's created by:

1. Taking the encoded header
2. Taking the encoded payload
3. Concatenating them with a `.`
4. Signing the result with a **secret key** using the algorithm specified in the header

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

The signature is the third part of the JWT.

### How JWT Authentication Works

```
┌─────────────┐                                      ┌─────────────┐
│   Client    │                                      │   Server    │
│  (Browser)  │                                      │  (Express)  │
└─────────────┘                                      └─────────────┘
       │                                                      │
       │  1. POST /api/login                                 │
       │     { email, password }                             │
       │─────────────────────────────────────────────────────>│
       │                                                      │
       │                                  2. Verify password  │
       │                                     (bcrypt.compare) │
       │                                                      │
       │                                  3. Generate JWT     │
       │                                     jwt.sign()       │
       │                                                      │
       │  4. Return JWT                                      │
       │     { token: "eyJhbGc..." }                         │
       │<─────────────────────────────────────────────────────│
       │                                                      │
       │  5. Store token                                     │
       │     (localStorage/sessionStorage)                   │
       │                                                      │
       │  6. Request protected resource                      │
       │     GET /api/profile                                │
       │     Header: Authorization: Bearer eyJhbGc...        │
       │─────────────────────────────────────────────────────>│
       │                                                      │
       │                                  7. Verify JWT       │
       │                                     jwt.verify()     │
       │                                                      │
       │                                  8. Extract user info│
       │                                     from token       │
       │                                                      │
       │  9. Return protected data                           │
       │     { user: {...} }                                 │
       │<─────────────────────────────────────────────────────│
       │                                                      │
```

### Key Concepts

#### Stateless Authentication

Unlike session-based authentication (which requires server-side storage), JWT authentication is **stateless**:

- **Session-based**: Server stores session ID in database/memory, client sends session ID in cookie
- **JWT-based**: Server doesn't store anything, client sends entire token with each request

**Benefits:**
- Scalable: No server-side session storage needed
- Microservices-friendly: Any service can verify the token
- Mobile-friendly: No cookie dependency

**Trade-offs:**
- Token size: JWTs are larger than session IDs
- Revocation: Can't immediately revoke tokens (must wait for expiration or use blacklist)

#### Token Expiration

JWTs should have an expiration time (`exp` claim) for security:

```javascript
const token = jwt.sign(
  { userId: user.id },
  process.env.JWT_SECRET!,
  { expiresIn: '24h' } // Token expires in 24 hours
)
```

Common expiration times:
- **Access tokens**: Short-lived (15 minutes - 1 hour)
- **Refresh tokens**: Long-lived (7 days - 30 days)

#### Refresh Tokens (Advanced Pattern)

For better security, use two tokens:

1. **Access Token**: Short-lived JWT for API requests
2. **Refresh Token**: Long-lived token to get new access tokens

This pattern allows you to:
- Keep access tokens short-lived (limiting damage if stolen)
- Avoid forcing users to login frequently

### Security Best Practices

1. **Use strong secrets**: Store JWT_SECRET in environment variables, use long random strings
   ```bash
   JWT_SECRET=your-super-secret-key-minimum-32-characters-long
   ```

2. **Use HTTPS**: Always transmit JWTs over HTTPS to prevent interception

3. **Set expiration times**: Never create tokens that don't expire

4. **Validate tokens**: Always verify tokens on protected routes

5. **Don't store sensitive data**: JWTs are encoded, not encrypted - anyone can decode and read the payload

6. **Use appropriate algorithms**: HS256 is common, RS256 provides better security for public/private key scenarios

7. **Handle token storage carefully**:
   - localStorage: Vulnerable to XSS attacks
   - sessionStorage: Clears on tab close
   - httpOnly cookies: More secure but requires CORS configuration

### JWT vs Session-Based Authentication

| Aspect | JWT | Session |
|--------|-----|---------|
| **Storage** | Client-side (token) | Server-side (session ID) |
| **Scalability** | Excellent (stateless) | Requires session store |
| **Mobile apps** | Perfect fit | Requires cookie support |
| **Revocation** | Difficult (needs blacklist) | Easy (delete session) |
| **Size** | Larger (entire payload) | Smaller (just ID) |
| **Security** | Vulnerable if exposed | More control on server |

## Project Overview

This project demonstrates:

1. **User Registration**: Create users with hashed passwords
2. **User Login**: Authenticate and receive JWT
3. **Protected Routes**: Access resources that require authentication
4. **JWT Middleware**: Verify tokens and extract user information
5. **Authorization**: Check user roles/permissions

### Project Structure

```
17_Fac_Auth/
├── package.json
├── tsconfig.json
├── .env.example
├── .gitignore
├── README.md
├── db_setup/
│   └── adventure.sql
└── src/
    ├── index.ts                    # Application entry point
    ├── config/
    │   └── database.ts             # Database configuration
    ├── models/
    │   ├── index.ts                # Model exports
    │   └── user.ts                 # User model with password hashing
    ├── middleware/
    │   └── auth.ts                 # JWT verification middleware
    └── routes/
        ├── auth.ts                 # Authentication routes (register/login)
        └── protected.ts            # Protected routes (require JWT)
```

### Key Files Explained

#### `src/models/user.ts`

Defines the User model with:
- Password hashing using bcrypt (from previous labs)
- Password comparison method
- User attributes (id, username, email, password)

#### `src/middleware/auth.ts`

JWT verification middleware that:
- Extracts token from Authorization header
- Verifies token signature and expiration
- Attaches user info to request object
- Returns 401 if token is invalid

#### `src/routes/auth.ts`

Authentication routes:
- `POST /api/auth/register`: Create new user
- `POST /api/auth/login`: Authenticate and receive JWT

#### `src/routes/protected.ts`

Protected routes that require JWT:
- `GET /api/profile`: Get current user's profile
- `GET /api/users`: List all users (admin only)

## Installation and Setup

### 1. Install Dependencies

```bash
npm install
```

Key packages:
- `jsonwebtoken`: Create and verify JWTs
- `@types/jsonwebtoken`: TypeScript definitions
- `bcrypt`: Password hashing
- `express`: Web framework
- `sequelize`: ORM
- `pg`: PostgreSQL driver

### 2. Configure Environment

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Update with your values:

```env
DATABASE_URL=postgres://postgres:root@localhost:5432/adventure
PORT=4000
JWT_SECRET=your-super-secret-key-minimum-32-characters-long
JWT_EXPIRES_IN=24h
BCRYPT_SALT_ROUNDS=10
```

**Important**: Use a strong, random JWT_SECRET in production!

### 3. Create Database

```bash
psql -U postgres -f db_setup/adventure.sql
```

### 4. Run the Server

```bash
npm run dev
```

Server will start on `http://localhost:4000`

## Testing the Application

### 1. Register a New User

```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

### 2. Login and Receive JWT

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjIzOTAyMiwiZXhwIjoxNjE2MzI1NDIyfQ.xyz123...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com"
  }
}
```

**Save the token** - you'll need it for protected routes!

### 3. Access Protected Route (Without Token)

```bash
curl http://localhost:4000/api/profile
```

**Response:**
```json
{
  "error": "No token provided"
}
```

**Status**: 401 Unauthorized

### 4. Access Protected Route (With Token)

```bash
curl http://localhost:4000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

Replace `YOUR_TOKEN_HERE` with the actual token from login.

**Response:**
```json
{
  "message": "Profile retrieved successfully",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "createdAt": "2025-01-28T12:00:00.000Z"
  }
}
```

### 5. List All Users (Protected)

```bash
curl http://localhost:4000/api/users \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Response:**
```json
{
  "message": "Users retrieved successfully",
  "count": 1,
  "users": [
    {
      "id": 1,
      "username": "johndoe",
      "email": "john@example.com",
      "createdAt": "2025-01-28T12:00:00.000Z"
    }
  ]
}
```

## Code Walkthrough

### Creating a JWT (Login)

```typescript
import jwt from 'jsonwebtoken'

// After verifying password
const token = jwt.sign(
  {
    userId: user.id,
    email: user.email
  },
  process.env.JWT_SECRET!,
  { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
)

res.json({ token })
```

**Parameters:**
- **Payload**: Data to encode (userId, email, etc.)
- **Secret**: Server's secret key for signing
- **Options**: Configuration like expiration time

### Verifying a JWT (Middleware)

```typescript
import jwt from 'jsonwebtoken'

const authHeader = req.headers.authorization
const token = authHeader?.split(' ')[1] // "Bearer TOKEN"

const decoded = jwt.verify(token, process.env.JWT_SECRET!)

// Token is valid, decoded contains payload
req.user = decoded
```

**What happens:**
1. Extract token from `Authorization: Bearer TOKEN` header
2. Verify signature using secret key
3. Check expiration
4. Decode payload
5. Attach user info to request

### Protecting Routes

```typescript
import { authenticateToken } from '../middleware/auth'

// Protected route - requires valid JWT
router.get('/profile', authenticateToken, async (req, res) => {
  // req.user is available here (populated by middleware)
  const user = await User.findByPk(req.user.userId)
  res.json({ user })
})
```

The middleware runs **before** the route handler, verifying the token first.

## Teaching Points

### 1. Token Flow

Emphasize the complete flow:
- Register → Create user
- Login → Verify password, generate JWT
- Store token → Client responsibility
- Send token → Include in Authorization header
- Verify token → Middleware validates

### 2. Middleware Pattern

Show how middleware creates a **reusable** authentication layer:

```typescript
// Without middleware (bad - repetitive)
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const decoded = jwt.verify(token, secret)
  // ... route logic
})

// With middleware (good - DRY)
router.get('/profile', authenticateToken, async (req, res) => {
  // Token already verified, user info in req.user
})
```

### 3. Security Mindset

Discuss security considerations:
- Never commit JWT_SECRET to version control
- Set reasonable expiration times
- Use HTTPS in production
- Don't put sensitive data in payload
- Validate token on every protected route

### 4. Error Handling

Show proper error responses:
- `401 Unauthorized`: No token or invalid token
- `403 Forbidden`: Valid token but insufficient permissions
- `400 Bad Request`: Malformed request

## Extension Ideas

Once students understand basics, you can extend this project:

1. **Refresh Tokens**: Implement token refresh mechanism
2. **Role-Based Access Control (RBAC)**: Add user roles (admin, user) and check permissions
3. **Token Blacklist**: Store revoked tokens in database
4. **Rate Limiting**: Prevent brute force attacks on login
5. **Email Verification**: Send verification token on registration
6. **Password Reset**: Generate one-time tokens for password resets
7. **Multiple Devices**: Track tokens per device
8. **Token Rotation**: Generate new tokens periodically

## Common Student Questions

**Q: Can't users just create fake tokens?**  
A: No! The signature is created using the server's secret key. Without the key, they can't create valid signatures. The server verifies the signature on every request.

**Q: What if someone steals a token?**  
A: They can use it until it expires. This is why short expiration times are important. Use HTTPS to prevent interception.

**Q: Can we revoke a token before it expires?**  
A: Not easily with basic JWT. You'd need a token blacklist in the database. This is a trade-off of stateless authentication.

**Q: Why not just use sessions?**  
A: Sessions work well but require server-side storage. JWTs are better for APIs, microservices, and mobile apps. Both are valid approaches.

**Q: Is the payload encrypted?**  
A: No, it's only **encoded** (Base64). Anyone can decode it. Don't put passwords or secrets in the payload!

**Q: How do I debug tokens?**  
A: Use [jwt.io](https://jwt.io) to decode and inspect tokens. Paste your token to see the header and payload.

## Conclusion

JWT authentication provides a scalable, stateless way to authenticate users in modern web applications. By understanding how to generate, verify, and protect routes with JWTs, students can build secure APIs that work across platforms and services.

Key takeaways:
- JWTs are self-contained tokens with header, payload, and signature
- Use jwt.sign() to create tokens, jwt.verify() to validate them
- Middleware provides reusable authentication logic
- Always use environment variables for secrets
- Combine with bcrypt for complete authentication system
