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

  type Query {
    # Required argument - must be provided
    post(id: ID!): Post
    
    # Optional argument with default value
    posts(limit: Int = 10): [Post!]!
    
    # Multiple arguments for complex filtering
    postsByFilters(
      author: String
      published: Boolean
      minViews: Int
      category: String
    ): [Post!]!
    
    # String array argument for tag filtering
    postsByTags(tags: [String!]!): [Post!]!
  }
`;