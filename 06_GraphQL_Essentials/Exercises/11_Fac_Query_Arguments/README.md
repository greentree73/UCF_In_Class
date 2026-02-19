# 🔧 Query Arguments (HackHaven)

This facilitator Exercise introduces **GraphQL Query Arguments** - how to pass data into queries to customize results.

**Estimated time:** 7-10 minutes

## 🎯 Targets

By the end of this Exercise, learners can:
- Explain what GraphQL Query Arguments are and why we use them.
- Define queries with required, optional, and default arguments.
- Use multiple arguments to create complex filtering logic.
- Handle different argument types (String, Int, Boolean, Arrays).

## 💡 What are Query Arguments?

Query Arguments are values passed into GraphQL queries to customize the data returned. They make queries flexible and reusable.

Think of arguments like function parameters - they let the same query return different results based on input:

```graphql
# Same query, different arguments = different results
query {
  post(id: "post-001") { title }  # Returns specific post
  post(id: "post-002") { title }  # Returns different post
}
```

## 🧠 Why we use Query Arguments

- **Flexible filtering:** Get exactly the data you need
- **Reusable queries:** One query definition supports many use cases
- **Performance:** Fetch only relevant records from the database
- **Type safety:** Arguments are validated by the GraphQL schema
- **Clear contracts:** API consumers know exactly what inputs are available

---

## 🖥️ Project in this folder

This project demonstrates different types of query arguments using HackHaven's POST model with **MongoDB and Mongoose**.

### Prerequisites

- MongoDB running locally on default port (27017)
- Or set `MONGODB_URI` environment variable for custom connection

### Run the demo

```bash
npm install
npm run dev
```

The server will automatically:
- Connect to MongoDB (`hackhaven-query-args` database)
- Seed the database with sample HackHaven posts (if not already seeded)
- Start GraphQL server at `http://localhost:4011/graphql`

### Manual Database Seeding

To manually seed or re-seed the database:

```bash
npm run seed
```

This will:
- Connect to MongoDB
- Clear existing posts (if any)
- Insert fresh sample data
- Close the connection

---

## 🧪 Example 1: Required Arguments

Required arguments MUST be provided. They use the `!` symbol:

```graphql
query {
  post(id: "post-001") {
    id
    title
    author
    views
  }
}
```

**Schema definition:**
```graphql
post(id: ID!): Post  # id is required
```

## 🧪 Example 2: Optional Arguments with Defaults

Optional arguments have default values when not provided:

```graphql
query {
  posts {           # Uses default limit of 10
    id
    title
    views
  }
}

query {
  posts(limit: 3) { # Custom limit of 3
    id
    title
  }
}
```

**Schema definition:**
```graphql
posts(limit: Int = 10): [Post!]!  # Default value = 10
```

## 🧪 Example 3: Multiple Arguments for Complex Filtering

Combine multiple arguments for powerful filtering:

```graphql
query {
  postsByFilters(
    author: "Knightro"
    published: true
    minViews: 30
  ) {
    id
    title
    author
    views
    published
  }
}
```

**Schema definition:**
```graphql
postsByFilters(
  author: String
  published: Boolean
  minViews: Int
  category: String
): [Post!]!
```

## 🧪 Example 4: Array Arguments

Pass multiple values using array arguments:

```graphql
query {
  postsByTags(tags: ["tutorial", "graphql"]) {
    id
    title
    tags
    category
  }
}
```

**Schema definition:**
```graphql
postsByTags(tags: [String!]!): [Post!]!  # Required array of required strings
```

---

## 🔍 Argument Type Patterns

### Required vs Optional
- `arg: String!` - Required string
- `arg: String` - Optional string
- `arg: String = "default"` - Optional with default value

### Scalar Types
- `ID!` - Required identifier
- `String` - Text data
- `Int` - Integer numbers
- `Boolean` - true/false
- `Float` - Decimal numbers

### Array Types
- `[String!]!` - Required array of required strings
- `[String]` - Optional array of optional strings
- `[Int!]` - Optional array of required integers

---

## 📚 Documentation Links

- **GraphQL Query Arguments:** https://graphql.org/learn/queries/#arguments
- **GraphQL Schema Arguments:** https://graphql.org/learn/schema/#arguments
- **Apollo Server Resolvers:** https://www.apollographql.com/docs/apollo-server/data/resolvers/
- **GraphQL Scalar Types:** https://graphql.org/learn/schema/#scalar-types
- **GraphQL Type System:** https://graphql.org/learn/schema/
- **Apollo Server Express Integration:** https://www.apollographql.com/docs/apollo-server/api/express-middleware/
- **Mongoose Documentation:** https://mongoosejs.com/docs/guide.html
- **MongoDB Query Operators:** https://www.mongodb.com/docs/manual/reference/operator/query/

## 🏁 Results

After this facilitator Exercise, learners should understand:
- How to define query arguments in GraphQL schemas
- The difference between required, optional, and default arguments
- How to use multiple arguments for complex filtering
- How resolvers access and process argument values
- Why query arguments make GraphQL APIs flexible and powerful

## 🚀 Next Steps

In the following lab exercise, learners will:
- Create their own queries with arguments
- Implement resolver logic for argument handling
- Practice different argument patterns and validation