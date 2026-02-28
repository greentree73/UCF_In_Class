export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    role: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    me: User!
    adminDashboard: String!
  }

  type Mutation {
    login(role: String!): AuthPayload!
  }
`;
