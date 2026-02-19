export const typeDefs = `
  type Movie {
    id: ID!
    title: String!
    director: String!
    releaseYear: Int!
    genre: String!
    rating: Float!
    duration: Int!
    description: String!
    cast: [String!]!
    budget: Float!
    boxOffice: Float!
    
    # Computed fields - students will implement these in resolvers
    movieAge: Int!
    isBlockbuster: Boolean!
    shortDescription: String!
    profitMargin: Float!
  }

  type Query {
    # TODO: Implement query resolvers for these
    movies: [Movie!]!
    movie(id: ID!): Movie
    moviesByGenre(genre: String!): [Movie!]!
  }
`;