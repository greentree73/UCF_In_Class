export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    views: Int!
    published: Boolean!
    createdAt: String!
    tags: [String!]!
    category: String!
  }

  # Example 1: Input Type for Creating Posts
  # Groups all required fields for post creation
  input CreatePostInput {
    title: String!
    content: String!
    author: String!
    category: String!
    tags: [String!]
    published: Boolean
  }

  # Example 2: Input Type for Updating Posts  
  # All fields are optional for partial updates
  input UpdatePostInput {
    title: String
    content: String
    author: String
    category: String
    tags: [String!]
    published: Boolean
  }

  type Query {
    # Basic queries for testing
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    # Example 1: Create post using Input Type
    # Instead of: createPost(title: String!, content: String!, author: String!, ...)
    # We use: createPost(input: CreatePostInput!)
    createPost(input: CreatePostInput!): Post!
    
    # Example 2: Update post using Input Type with optional fields
    # Partial updates are cleaner with Input Types
    updatePost(id: ID!, input: UpdatePostInput!): Post
    
    # Clean up mutation for testing
    deletePost(id: ID!): Boolean!
  }
`;