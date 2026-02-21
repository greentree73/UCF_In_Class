# 🔐 28_Fac_Server_Auth

## 🎯 Overview

This Exercise introduces server-side authentication with **JWT**, Apollo Server **context**, and resolver-level authorization.

Students see how a user can register/login, receive a token, send it in request headers, and then access protected mutations.

## 🧠 Authentication Process

### 1) Register / Login

- `register` hashes the password, creates the user, and returns a signed JWT.
- `login` validates credentials and returns a signed JWT.

Both resolvers return an `AuthPayload` with:

- `token`
- `user`

### 2) Send Token from Client

Clients send the token in the HTTP header:

- `Authorization: Bearer <token>`

### 3) Apollo Context Validates JWT

For each GraphQL request, `context` reads `Authorization`, verifies the token with `JWT_SECRET`, and attaches a user object to `context.user`.

### 4) Protected Resolvers Use Context

Mutations such as `createQuestion` and `createAnswer` check `context.user` and throw `Unauthorized` when no authenticated user is present.

## 🧩 How Context Is Used

- Context acts as request-scoped shared data for resolvers.
- After JWT verification in server middleware, resolvers use `context.user` without re-parsing the header.
- This keeps auth logic centralized and resolver code consistent.

## 🔎 Where to Find This in the Production

- JWT verification + context creation:
  - `src/index.ts`
- Register/Login/Protected resolver logic:
  - `src/resolvers.ts`
- Auth-related GraphQL schema (`AuthPayload`, auth mutations):
  - `src/schema.ts`
- User and related models used by auth flow:
  - `src/models.ts`

## 📚 Documentation

- Apollo Server authentication and context:
  - https://www.apollographql.com/docs/apollo-server/security/authentication
- Apollo Server + Express integration:
  - https://www.apollographql.com/docs/apollo-server/api/express-middleware
- JWT (`jsonwebtoken`) package:
  - https://github.com/auth0/node-jsonwebtoken
- Password hashing with bcryptjs:
  - https://github.com/dcodeIO/bcrypt.js/
- GraphQL schema basics:
  - https://graphql.org/learn/schema/
