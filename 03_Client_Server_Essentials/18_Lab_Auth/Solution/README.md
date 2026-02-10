# Lab 18: JWT Authentication - Solution

## Overview

This solution folder contains the complete, working JWT authentication system along with explanations of how everything works together.

## What Was Accomplished

Students reviewed and tested a complete JWT authentication implementation including:

1. ✅ User registration with password hashing
2. ✅ User login with JWT token generation
3. ✅ Protected routes requiring authentication
4. ✅ Middleware-based token verification
5. ✅ Comprehensive Postman test collection

## Architecture Overview

```
Authentication Flow:
┌─────────────┐                                      ┌─────────────┐
│   Client    │                                      │   Server    │
└─────────────┘                                      └─────────────┘
       │                                                      │
       │  1. POST /api/auth/register                         │
       │     { username, email, password }                   │
       │─────────────────────────────────────────────────────>│
       │                                 2. Hash password     │
       │                                    (bcrypt hook)     │
       │                                 3. Save to database  │
       │  4. Return user (no password)                       │
       │<─────────────────────────────────────────────────────│
       │                                                      │
       │  5. POST /api/auth/login                            │
       │     { email, password }                             │
       │─────────────────────────────────────────────────────>│
       │                                 6. Find user         │
       │                                 7. Verify password   │
       │                                    (bcrypt.compare)  │
       │                                 8. Generate JWT      │
       │                                    (jwt.sign)        │
       │  9. Return { token, user }                          │
       │<─────────────────────────────────────────────────────│
       │                                                      │
       │  10. Store token (localStorage/memory)              │
       │                                                      │
       │  11. GET /api/profile                               │
       │      Header: Authorization: Bearer <token>          │
       │─────────────────────────────────────────────────────>│
       │                                 12. Extract token    │
       │                                 13. Verify signature │
       │                                     (jwt.verify)     │
       │                                 14. Get user data    │
       │  15. Return user profile                            │
       │<─────────────────────────────────────────────────────│
```

## Key Implementation Details

### 1. Password Hashing (User Model)

**File:** `src/models/user.ts`

```typescript
hooks: {
  beforeCreate: async (user: User) => {
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
    user.password = await bcrypt.hash(user.password, saltRounds)
  },
  beforeUpdate: async (user: User) => {
    if (user.changed('password')) {
      const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10')
      user.password = await bcrypt.hash(user.password, saltRounds)
    }
  }
}
```

**Why this works:**
- `beforeCreate` runs automatically when `User.create()` is called
- `beforeUpdate` only hashes if password field was modified (prevents double-hashing)
- Plain-text password is never stored in the database
- Validation runs on plain-text before hashing

### 2. JWT Token Generation (Login Route)

**File:** `src/routes/auth.ts`

```typescript
const token = jwt.sign(
  {
    userId: user.id,
    email: user.email
  },
  process.env.JWT_SECRET!,
  { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
)
```

**What happens:**
1. `jwt.sign()` creates three parts: header, payload, signature
2. Header specifies algorithm (HS256 by default)
3. Payload contains userId and email (plus iat and exp)
4. Signature is created using `HMACSHA256(header + payload, secret)`
5. All three parts are Base64Url encoded and joined with dots

**Token structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9          <- Header
.
eyJ1c2VySWQiOjEsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSJ9  <- Payload
.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c    <- Signature
```

### 3. JWT Token Verification (Middleware)

**File:** `src/middleware/auth.ts`

```typescript
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader?.split(' ')[1]
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }
  
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  req.user = {
    userId: decoded.userId,
    email: decoded.email
  }
  
  next()
}
```

**How it works:**
1. Extracts token from `Authorization: Bearer <token>` header
2. `jwt.verify()` checks signature and expiration
3. If valid, decodes payload and attaches to `req.user`
4. Calls `next()` to proceed to route handler
5. If invalid, throws error and returns 401

### 4. Protected Routes Pattern

**File:** `src/routes/protected.ts`

```typescript
router.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user!.userId)
  res.json({ user })
})
```

**Middleware chain:**
```
Request → authenticateToken → Route Handler → Response
            ↓
        Verifies JWT
        Sets req.user
```

## Discussion Question Answers

### Security Questions

**Q: Why is JWT stateless?**
A: The server doesn't store any session data. All information needed to verify the user is contained in the token itself. The server only needs to verify the signature using its secret key.

**Benefits:**
- Scales horizontally (any server can verify any token)
- No database lookup for every request
- Works across different services/domains

**Drawbacks:**
- Can't immediately revoke tokens
- Token size larger than session ID
- If secret is compromised, all tokens are invalid

---

**Q: Can a JWT be revoked immediately?**
A: No, not with basic JWT. The token is valid until it expires. 

**Solutions:**
- Keep expiration times short (15-60 minutes)
- Implement a token blacklist (defeats stateless purpose)
- Use refresh tokens pattern
- Rotate secrets on compromise

---

**Q: What happens if someone steals a JWT token?**
A: They can impersonate the user until the token expires.

**Mitigation strategies:**
- Use HTTPS to prevent interception
- Short expiration times
- Secure storage (httpOnly cookies, not localStorage)
- Monitor for unusual activity
- IP address validation (optional)

---

**Q: Why should JWTs have an expiration time?**
A: To limit the damage if a token is stolen. Without expiration, a stolen token works forever.

**Good expiration times:**
- **Access tokens:** 15 minutes - 1 hour
- **Refresh tokens:** 7-30 days
- **Remember me tokens:** 30-90 days

---

**Q: Is the JWT payload encrypted?**
A: No! It's only **Base64 encoded**, not encrypted. Anyone can decode and read it.

**What NOT to put in payload:**
- ❌ Passwords
- ❌ Credit card numbers
- ❌ Social security numbers
- ❌ Any sensitive personal data

**What's safe to include:**
- ✅ User ID
- ✅ Email
- ✅ Username
- ✅ Roles/permissions
- ✅ Non-sensitive metadata

---

### Implementation Questions

**Q: Why check `user.changed('password')` in beforeUpdate?**
A: Without this check, updating any field would re-hash the already-hashed password, making it invalid.

```typescript
// WITHOUT check:
user.username = "newname"
user.save()
// Password gets hashed AGAIN: bcrypt(bcrypt(original)) ❌

// WITH check:
if (user.changed('password')) {
  // Only hash if password was actually modified ✅
}
```

---

**Q: What's the difference between `bcrypt.hash()` and `bcrypt.compare()`?**

**bcrypt.hash():**
- Creates a hash from plain-text password
- Generates a random salt
- Returns a string like `$2b$10$abc123...` (60 chars)
- Used when creating/updating passwords

**bcrypt.compare():**
- Compares plain-text with hashed password
- Extracts salt from hash
- Hashes plain-text with same salt
- Returns true if hashes match
- Used during login

---

**Q: Why use middleware instead of checking token in every route?**

**Without middleware (repetitive):**
```typescript
router.get('/profile', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]
  const decoded = jwt.verify(token, secret)
  const user = await User.findByPk(decoded.userId)
  res.json({ user })
})

router.get('/settings', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]  // Repeated!
  const decoded = jwt.verify(token, secret)              // Repeated!
  // ...
})
```

**With middleware (DRY):**
```typescript
router.get('/profile', authenticateToken, async (req, res) => {
  const user = await User.findByPk(req.user.userId)
  res.json({ user })
})

router.get('/settings', authenticateToken, async (req, res) => {
  // req.user already populated!
})
```

---

**Q: How does `req.user` get populated?**

1. Middleware extracts token from header
2. `jwt.verify()` decodes the token
3. Middleware sets `req.user = decoded`
4. Express passes `req` to next middleware/route
5. Route handler accesses `req.user`

The TypeScript declaration extends Express's Request interface:
```typescript
declare global {
  namespace Express {
    interface Request {
      user?: { userId: number; email: string }
    }
  }
}
```

---

**Q: What if we forget `authenticateToken` on a protected route?**

The route would be **unprotected** and accessible to anyone:

```typescript
// DANGEROUS - No authentication!
router.get('/admin/users', async (req, res) => {
  const users = await User.findAll()
  res.json({ users })
})

// Anyone can access this, even without logging in! 🚨
```

Always remember to add middleware to routes that need protection!

---

## Postman Collection Structure

### Collection Variables
- `baseUrl`: Server URL (http://localhost:4000)
- `token`: Saved from login response
- `userId`: Saved from register response

### Request Flow
1. **Register** → Save userId
2. **Login** → Save token
3. **Protected requests** → Use saved token

### Test Examples

**Testing token structure:**
```javascript
pm.test("Token has three parts", function () {
  var token = pm.response.json().token;
  var parts = token.split('.');
  pm.expect(parts.length).to.equal(3);
});
```

**Testing authentication:**
```javascript
pm.test("Protected route requires token", function () {
  pm.response.to.have.status(401);
  pm.expect(pm.response.json().error).to.include('token');
});
```

**Saving variables:**
```javascript
if (pm.response.code === 200) {
  var jsonData = pm.response.json();
  pm.collectionVariables.set("token", jsonData.token);
}
```

## Common Issues and Solutions

### Issue: "Server configuration error"
**Cause:** Missing `JWT_SECRET` in `.env`
**Solution:** Create `.env` file from `.env.example`

### Issue: "Invalid token"
**Cause:** Token was modified or is from different secret
**Solution:** Login again to get fresh token

### Issue: "Token expired"
**Cause:** Token lifetime exceeded `JWT_EXPIRES_IN`
**Solution:** Login again; consider longer expiration for development

### Issue: "No token provided"
**Cause:** Missing or malformed Authorization header
**Solution:** Format as `Authorization: Bearer <token>` (with space)

### Issue: Double-hashed password
**Cause:** Forgot `user.changed('password')` check in beforeUpdate
**Solution:** Always check if password was modified before hashing

## Best Practices Demonstrated

1. ✅ **Environment variables** for sensitive config
2. ✅ **Password hashing** in model hooks
3. ✅ **Middleware** for reusable authentication
4. ✅ **Never return passwords** in responses
5. ✅ **Token expiration** for security
6. ✅ **Error handling** for different scenarios
7. ✅ **TypeScript** for type safety
8. ✅ **Separation of concerns** (models, routes, middleware)

## Security Checklist

- ✅ Passwords hashed with bcrypt (salt rounds: 10+)
- ✅ JWT tokens have expiration time
- ✅ JWT_SECRET stored in environment variables
- ✅ Passwords excluded from all responses
- ✅ Different errors for authentication failures
- ✅ Token verification on all protected routes
- ✅ HTTPS required in production
- ✅ Input validation on all endpoints

## Production Considerations

### What to change for production:

1. **JWT_SECRET**: Use strong random string (32+ characters)
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Token expiration**: Shorter for access tokens
   ```env
   JWT_EXPIRES_IN=15m
   ```

3. **Database sync**: Never use `force: true`
   ```typescript
   await sequelize.sync({ alter: true }) // Or use migrations
   ```

4. **HTTPS**: Always use HTTPS in production

5. **Rate limiting**: Prevent brute force attacks
   ```typescript
   import rateLimit from 'express-rate-limit'
   const limiter = rateLimit({
     windowMs: 15 * 60 * 1000,
     max: 5
   })
   app.use('/api/auth/login', limiter)
   ```

6. **CORS**: Configure properly for your frontend
   ```typescript
   app.use(cors({
     origin: 'https://yourdomain.com'
   }))
   ```

## Extension Ideas

Students could extend this project with:

1. **Refresh Tokens**: Long-lived tokens to get new access tokens
2. **Role-Based Access Control**: Add user roles (admin, user, guest)
3. **Password Reset**: Email verification and reset tokens
4. **Email Verification**: Confirm email on registration
5. **2FA**: Two-factor authentication
6. **OAuth**: Social login (Google, GitHub, etc.)
7. **Rate Limiting**: Prevent brute force attacks
8. **Audit Logging**: Track login attempts and changes

## Conclusion

This lab demonstrated a complete, production-ready JWT authentication system with:
- Secure password handling
- Stateless authentication
- Middleware-based protection
- Comprehensive testing

Students learned how all components work together to create a secure authentication flow that can be extended and deployed to production.

## Additional Resources

- [JWT.io](https://jwt.io) - Decode and debug JWTs
- [bcrypt documentation](https://github.com/kelektiv/node.bcrypt.js)
- [jsonwebtoken documentation](https://github.com/auth0/node-jsonwebtoken)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
