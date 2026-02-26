export const typeDefs = `#graphql
  type Book {
    _id: ID!
    title: String!
    author: String!
    releaseYear: Int!
    slug: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateBookInput {
    title: String!
    author: String!
    releaseYear: Int!
    slug: String!
  }

  input UpdateBookInput {
    title: String
    author: String
    releaseYear: Int
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(input: CreateBookInput!): Book!
    updateBook(id: ID!, input: UpdateBookInput!): Book!
  }
`;
