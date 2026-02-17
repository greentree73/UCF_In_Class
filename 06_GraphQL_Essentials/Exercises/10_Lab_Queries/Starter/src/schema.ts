export const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
    genre: String!
    inStock: Boolean!
  }

  # TODO: Replace placeholder query fields with:
  # books: [Book!]!
  # book(id: ID!): Book
  # booksByStock(inStock: Boolean!): [Book!]!
  type Query {
    placeholder: String
  }
`;
