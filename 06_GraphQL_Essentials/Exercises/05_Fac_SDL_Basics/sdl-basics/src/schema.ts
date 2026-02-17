export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    tags: [String!]!
    published: Boolean!
    views: Int!
    createdAt: String!
  }

  type PostCard {
    id: ID!
    title: String!
    author: String!
  }

  input CreatePostInput {
    title: String!
    content: String!
    author: String!
  }

  type Query {
    postCard(id: ID!): PostCard
    post(id: ID!): Post
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
`;
