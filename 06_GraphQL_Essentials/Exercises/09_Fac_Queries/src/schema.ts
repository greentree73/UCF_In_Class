export const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    views: Int!
    published: Boolean!
  }

  type Query {
    post(id: ID!): Post
    postsByPublished(published: Boolean!): [Post!]!
  }
`;
