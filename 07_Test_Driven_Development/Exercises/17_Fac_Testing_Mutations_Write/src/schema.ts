export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    slug: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
  }

  input UpdateBookInput {
    title: String
    author: String
  }

  type Query {
    health: String!
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
  }
`;
