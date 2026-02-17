export const typeDefs = `
  # Post represents a HackHaven post and demonstrates built-in scalar types.
  type Post {
    # ID: unique identifier for the post.
    id: ID!
    # String: text-based fields.
    title: String!
    content: String!
    # Int: whole number value.
    views: Int!
    # Boolean: true/false publish state.
    published: Boolean!
    # Float: decimal rating value.
    rating: Float!
  }

  # Query operations for reading post scalar values.
  type Query {
    # Fetch a single post by its ID.
    postScalars(id: ID!): Post
  }

  # Mutation operations for updating scalar fields.
  type Mutation {
    # Update a post's Float rating and Boolean published state.
    updatePostState(id: ID!, rating: Float!, published: Boolean!): Post
  }
`;
