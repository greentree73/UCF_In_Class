export const typeDefs = `
  type User { id: ID!, username: String!, email: String! }
  type Answer { id: ID!, body: String!, author: User!, createdAt: String! }
  type Question { id: ID!, title: String!, body: String!, author: User!, answers: [Answer!]!, createdAt: String! }

  type Query {
    questions: [Question!]!
    question(id: ID!): Question
    me: User
  }

  type AuthPayload { token: String!, user: User! }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    createQuestion(title: String!, body: String!): Question!
    createAnswer(questionId: ID!, body: String!): Answer!
  }
`;
