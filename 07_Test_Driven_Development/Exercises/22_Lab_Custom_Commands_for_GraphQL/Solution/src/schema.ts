export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    releaseYear: Int!
    slug: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
    releaseYear: Int!
    slug: String!
  }

  type Query {
    books: [Book!]!
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
    clearBooks: Boolean!
  }
`;
