export const typeDefs = `#graphql
  type Movie {
    id: ID!
    movieId: String!
    title: String!
    director: String!
    releaseYear: Int!
    genre: String!
    duration: Int!
    description: String!
    rating: Float!
    cast: [String!]!
    budget: Float
    boxOffice: Float
  }

  # Input Type for creating new movies
  input CreateMovieInput {
    title: String!
    director: String!
    releaseYear: Int!
    genre: String!
    duration: Int!
    description: String!
    rating: Float
    cast: [String!]
    budget: Float
  }

  # Input Type for updating existing movies (all fields optional)
  input UpdateMovieInput {
    title: String
    director: String
    releaseYear: Int
    genre: String
    rating: Float
    duration: Int
    description: String
    cast: [String!]
    budget: Float
  }

  type Query {
    # Basic queries
    movies: [Movie!]!
    movie(id: ID!): Movie
    movieByMovieId(movieId: String!): Movie

    # Search queries using filters
    moviesByTitle(title: String!): [Movie!]!
    moviesByYear(year: Int!): [Movie!]!
    moviesByGenre(genre: String!): [Movie!]!
  }

  type Mutation {
    createMovie(input: CreateMovieInput!): Movie!
    updateMovie(id: ID!, input: UpdateMovieInput!): Movie
    deleteMovie(id: ID!): Boolean!
  }
`;