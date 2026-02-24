# Lab: Project Initialization Verification (Express + Apollo + Mongoose)

## 🎯 Objective
Install, run, and inspect a backend project, then evaluate whether it is actually working.

## ⏱️ Estimated Time
15-20 minutes

## 🚀 Step 1: Install and Run
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your environment file:
   ```bash
   cp .env.example .env
   ```
3. Make sure MongoDB is running locally.
4. Start the project:
   ```bash
   npm run dev
   ```

## 🧪 Step 2: Verify Basic Behavior

### Check the health route
Open or call:
- `http://localhost:4000/health`

Expected: a successful response indicating the server is alive.

### Check GraphQL endpoint
Open `/graphql` and run this mutation:
```graphql
mutation {
  createBook(input: { title: "Testing 101", author: "Student" }) {
    id
    title
    author
  }
}
```

Then run this query:
```graphql
query {
  books {
    id
    title
    author
  }
}
```

Expected: the created book appears in the query results.

## 🔍 Step 3: Ask Yourself These Questions
- Does this project work?
- Does it have bugs?
- How do we know if it is working?

## 📝 Reflection Prompts
Write short answers (1-2 sentences each):
- What evidence shows the app is working?
- What would count as a bug in this project?
- What behaviors are still unverified?
- Why are automated tests better than manual checks alone?

## ✅ Success Criteria
- [ ] Project installs and runs.
- [ ] Health endpoint responds successfully.
- [ ] GraphQL mutation and query both return expected data.
- [ ] You completed all reflection questions.

## ▶️ Useful Commands
- Start once: `npm start`
- Start with watch mode: `npm run dev`
- Run tests: `npm test`
- Type-check: `npm run typecheck`

## 📚 Resources
- [Express Documentation](https://expressjs.com/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server)
- [GraphQL Learn](https://graphql.org/learn/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Node.js Test Runner](https://nodejs.org/api/test.html)
