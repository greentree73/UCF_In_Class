# 📋 GraphQL Input Types Basics (HackHaven)

This facilitator Exercise introduces **GraphQL Input Types** - structured input objects that make mutations cleaner and more organized.

**Estimated time:** 7-10 minutes

## 🎯 Targets

By the end of this Exercise, learners can:
- Explain what GraphQL Input Types are and their purpose.
- Understand how Input Types improve mutation organization.
- Define Input Types in GraphQL schemas.
- Use Input Types in mutation resolvers for create and update operations.

## 💡 What are Input Types?

**Input Types are structured objects for complex mutation arguments.** They group related fields together instead of having many separate parameters.

Think of Input Types like **order forms**:
- 📝 **Without Input Types** = Separate fields: name, address, phone, email, item1, item2...
- 📋 **With Input Types** = Organized form: customerInfo{ name, address, phone }, orderItems{ item, quantity }

```graphql
# Without Input Types - messy arguments
mutation {
  createPost(
    title: "My Post"
    content: "Post content..."
    author: "Astra"
    category: "tutorials"
    tag1: "graphql"
    tag2: "tutorial"
    published: true
  )
}

# With Input Types - clean and organized
mutation {
  createPost(input: {
    title: "My Post"
    content: "Post content..."
    author: "Astra"
    category: "tutorials"  
    tags: ["graphql", "tutorial"]
    published: true
  })
}
```

## 🧠 Why we use Input Types

- **Organization:** Group related fields into logical structures
- **Reusability:** Same Input Type can be used in multiple mutations
- **Validation:** Type system validates entire input objects
- **Flexibility:** Easy to add new fields without breaking existing code
- **Clarity:** Mutations are easier to read and understand
- **Partial Updates:** Optional fields enable clean update operations

---

## 🖥️ Project in this folder

This project demonstrates Input Types using HackHaven's POST model with **MongoDB**.

### Prerequisites

- MongoDB running locally on default port (27017)
- Or set `MONGODB_URI` environment variable

### Run the demo

```bash
npm install
npm run dev
```

The server will:
- Connect to MongoDB (`hackhaven-input-types` database)
- Seed with sample HackHaven posts
- Start GraphQL server at `http://localhost:4015/graphql`
- **Show Input Type processing logs in the console!**

---

## 🧪 Example 1: CreatePostInput (Required Fields)

**Input Type for creating new posts** - groups all required creation fields.

**Schema Definition:**
```graphql
input CreatePostInput {
  title: String!
  content: String!
  author: String!
  category: String!
  tags: [String!]
  published: Boolean
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}
```

**Example Mutation:**
```graphql
mutation {
  createPost(input: {
    title: "GraphQL Input Types Tutorial"
    content: "Learn how to use Input Types to organize your mutations effectively."
    author: "Astra"
    category: "tutorials"
    tags: ["graphql", "input-types", "mutations"]
    published: true
  }) {
    id
    title
    author
    published
  }
}
```

**What happens:**
1. GraphQL validates the entire `input` object structure
2. Resolver receives one organized `input` parameter
3. All related data is grouped together logically
4. New post is created from the structured input

## 🧪 Example 2: UpdatePostInput (Optional Fields)

**Input Type for partial updates** - all fields optional for flexible updates.

**Schema Definition:**
```graphql
input UpdatePostInput {
  title: String
  content: String
  author: String
  category: String
  tags: [String!]
  published: Boolean
}

type Mutation {
  updatePost(id: ID!, input: UpdatePostInput!): Post
}
```

**Example Mutation (Partial Update):**
```graphql
mutation {
  updatePost(
    id: "post-001"
    input: {
      published: true
      tags: ["welcome", "community", "updated"]
    }
  ) {
    id
    title
    published
    tags
  }
}
```

**What happens:**
1. Only provided fields are included in the update
2. Resolver processes only the fields that were supplied
3. Database update includes only changed fields
4. Clean partial update without null/undefined handling

---

## 🔍 Input Type vs Regular Arguments

### Without Input Types (Messy)
```graphql
type Mutation {
  createPost(
    title: String!
    content: String!
    author: String!
    category: String!
    tag1: String
    tag2: String
    tag3: String
    published: Boolean
  ): Post!
}
```

### With Input Types (Clean)
```graphql
input CreatePostInput {
  title: String!
  content: String!
  author: String!
  category: String!
  tags: [String!]
  published: Boolean
}

type Mutation {
  createPost(input: CreatePostInput!): Post!
}
```

**Benefits of Input Types:**
- ✅ Fewer mutation arguments
- ✅ Related fields grouped together  
- ✅ Array fields (tags) instead of individual parameters
- ✅ Extensible without breaking changes
- ✅ Better auto-completion in GraphQL clients

---

## 🧪 Console Logging

This demo includes detailed console logs to show Input Type processing:

```
🏗️  Mutation resolver: Creating new post with Input Type
📦 Input received: {
  "title": "GraphQL Input Types Tutorial",
  "content": "Learn how to use Input Types...",
  "author": "Astra",
  "category": "tutorials",
  "tags": ["graphql", "input-types"],
  "published": true
}
✅ Created post: "GraphQL Input Types Tutorial" by Astra
```

**Watch your terminal** while running mutations to see Input Type processing!

---

## 🚀 Try These Mutations

### Create a New Post
```graphql
mutation {
  createPost(input: {
    title: "My First Input Type Post"
    content: "This post was created using GraphQL Input Types!"
    author: "Your Name"
    category: "experiments"
    tags: ["learning", "graphql"]
    published: false
  }) {
    id
    title
    author
    published
    tags
  }
}
```

### Update an Existing Post
```graphql
mutation {
  updatePost(
    id: "post-002"
    input: {
      published: true
      tags: ["graphql", "input-types", "tutorial", "updated"]
    }
  ) {
    id
    title
    published
    tags
  }
}
```

### Query to See Results
```graphql
query {
  posts {
    id
    title
    author
    published
    tags
    category
  }
}
```

---

## 📚 Documentation Links

- **GraphQL Input Types:** https://graphql.org/learn/schema/#input-types
- **GraphQL Mutations:** https://graphql.org/learn/queries/#mutations
- **Apollo Server Input Types:** https://www.apollographql.com/docs/apollo-server/schema/schema/#input-types
- **GraphQL Schema Language:** https://graphql.org/learn/schema/#type-language
- **Input Type Best Practices:** https://www.apollographql.com/blog/graphql/basics/designing-graphql-mutations/
- **GraphQL Type System:** https://graphql.org/learn/schema/#type-system
- **Mongoose Validation:** https://mongoosejs.com/docs/validation.html

## 🏁 Results

After this facilitator Exercise, learners should understand:
- How Input Types organize complex mutation arguments
- The difference between Input Types and regular arguments
- How to define Input Types in GraphQL schemas
- How resolvers process Input Type objects
- Why Input Types improve code maintainability and readability
- When to use required vs optional fields in Input Types

## 🚀 Next Steps

In the following lab exercise, learners will:
- Create their own Input Types for different operations
- Implement mutations with validation and error handling
- Practice both create and update patterns with Input Types
- Build a complete CRUD API using Input Types