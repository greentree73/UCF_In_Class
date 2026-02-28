export const typeDefs = `#graphql
  type Recipe {
    _id: ID!
    title: String!
    cuisine: String!
    prepTimeMinutes: Int!
    difficulty: String!
    slug: String!
    ingredients: [String!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateRecipeInput {
    title: String!
    cuisine: String!
    prepTimeMinutes: Int!
    difficulty: String!
    slug: String!
    ingredients: [String!]!
  }

  input UpdateRecipeInput {
    title: String
    cuisine: String
    prepTimeMinutes: Int
    difficulty: String
    slug: String
    ingredients: [String!]
  }

  type Query {
    recipes: [Recipe!]!
    recipe(id: ID!): Recipe
  }

  type Mutation {
    createRecipe(input: CreateRecipeInput!): Recipe!
    updateRecipe(id: ID!, input: UpdateRecipeInput!): Recipe!
    deleteRecipe(id: ID!): Recipe!
  }
`;
