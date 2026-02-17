export const typeDefs = `
  # TODO: Define Book using built-in scalar types.
  # Required fields from BOOKS model:
  # id, title, author, pageCount, inStock, price

  # TODO: Replace placeholder Query with:
  # books: [Book!]!
  # book(id: ID!): Book
  type Query {
    placeholder: String
  }

  # TODO: Replace placeholder Mutation with:
  # updateBookPrice(id: ID!, price: Float!): Book
  type Mutation {
    placeholder: String
  }
`;
