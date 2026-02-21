export const typeDefs = `#graphql
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
    createGreeting(name: String!): Greeting!
  }
`;
