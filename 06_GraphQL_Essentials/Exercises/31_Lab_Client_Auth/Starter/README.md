# 🎯 Facilitator: Apollo Client Authentication

This Exercise demonstrates a full-stack **Apollo Splashdown** authentication flow using JWT.

## 🎯 Targets

- Explain how Apollo Client sends JWT in every GraphQL request
- Show how server context verifies JWT and provides `context.user`
- Demonstrate register/login mutations and authenticated `me` query
- Identify where authentication responsibilities live in frontend vs backend

## 🔐 Authentication Process

1. Client runs `register` or `login` mutation.
2. Server returns `AuthPayload` with `token` and `user`.
3. Frontend stores token in `localStorage` as `authToken`.
4. Apollo Client `authLink` adds `Authorization: Bearer <token>`.
5. Apollo Server context verifies token and sets `context.user`.
6. `me` query returns the current authenticated user.

## 🧠 Context + JWT

- **Client side**
	- `frontend/src/apollo/client.ts`: auth middleware + header injection
	- `frontend/src/components/GreetingForm.tsx`: save token and refetch `me`
- **Server side**
	- `backend/src/server.ts`: verify bearer token and populate context
	- `backend/src/schema/resolvers.ts`: return `context.user` in `me`

## 📂 File Map

- Client auth link:
	- `frontend/src/apollo/client.ts`
- GraphQL operations (`register`, `login`, `me`):
	- `frontend/src/graphql/queries.ts`
- Auth UI flow (register/login/logout/current user):
	- `frontend/src/components/GreetingForm.tsx`
- Server JWT context setup:
	- `backend/src/server.ts`
- Auth schema + resolvers:
	- `backend/src/schema/typeDefs.ts`
	- `backend/src/schema/resolvers.ts`

## 🔗 Docs

- Apollo Client authentication:
	- https://www.apollographql.com/docs/react/networking/authentication
- Apollo context link:
	- https://www.apollographql.com/docs/react/api/link/apollo-link-context
- Apollo Server authentication/context:
	- https://www.apollographql.com/docs/apollo-server/security/authentication
- JSON Web Token docs:
	- https://github.com/auth0/node-jsonwebtoken

## 🚀 Run

```bash
npm run install:all
npm run dev
```
