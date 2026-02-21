export const typeDefs = `#graphql
  input CreateGreetingInput {
    name: String!
  }

  type Greeting {
    id: ID!
    name: String!
    message: String!
    createdAt: String!
  }

  type Query {
    latestGreeting: Greeting
  }

  type Mutation {
    createGreeting(input: CreateGreetingInput!): Greeting!
  }
`;
