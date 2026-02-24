// GraphQL schema defines operations available to clients.
export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
  }

  type Query {
    health: String!
    books: [Book!]!
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
  }
`;
