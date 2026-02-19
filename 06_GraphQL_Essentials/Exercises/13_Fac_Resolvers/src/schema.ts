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
    # Computed fields that demonstrate resolver logic
    isPopular: Boolean!
    summary: String!
  }

  type Query {
    # Basic resolver - direct data fetching
    posts: [Post!]!
    
    # Resolver with argument - single post lookup
    post(id: ID!): Post
  }
`;