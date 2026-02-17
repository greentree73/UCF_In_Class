# Lab: REST vs GraphQL Code Review

## 🎯 Goal
Compare two APIs that return the same HackHaven post data and discuss how REST and GraphQL differ in request/response behavior.

## 🔧 What You'll Do
- Run the REST API and test its route.
- Run the GraphQL API and test its query.
- Review both `app.ts` files.
- Discuss differences as a group and record observations.

## ⏱️ Estimated Time
7-10 minutes

## 🚀 Getting Started

### 1) Run the REST API
1. Open a terminal in `Starter/REST`.
2. Run:

```bash
npm install
npm run dev
```

3. In a second terminal, test:

```bash
curl http://localhost:3001/api/post
```

### 2) Run the GraphQL API
1. Open a terminal in `Starter/GraphQL`.
2. Run:

```bash
npm install
npm run dev
```

3. In a second terminal, test:

```bash
curl -X POST http://localhost:4001/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"query { post { id title author } }"}'
```

## 📝 Activity Instructions

### Step 1: Inspect both responses
Use the two curl commands and compare what comes back.

- [ ] REST: note that the route returns a fixed payload.
- [ ] GraphQL: note that the response matches requested fields.

### Step 2: Review the code
Open these files side by side:
- `Starter/REST/app.ts`
- `Starter/GraphQL/app.ts`

Look for:
- [ ] Where the HackHaven post data is defined.
- [ ] How each API exposes data (`GET /api/post` vs `Query.post`).
- [ ] How GraphQL defines data shape (`type Post`) and selected fields.

### Step 3: Team discussion
Discuss with your group and write short answers:

1. Which API gives the client more control over returned fields?
2. In this Exercise, where do you see over-fetching in REST?
3. What is one tradeoff of GraphQL compared to REST?
4. If a page only needs `title` and `author`, which API call is more efficient and why?

## ✅ Quick Check

Before moving on, confirm:
- [ ] Both APIs run without errors.
- [ ] You can call both endpoints successfully.
- [ ] Your group can explain one key difference in payload control.

## 🏁 Results

After this Lab, you should be able to explain:
- How REST returns endpoint-defined payloads.
- How GraphQL returns client-defined payloads.
- Why this matters for over-fetching and API design choices.
