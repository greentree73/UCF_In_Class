export const typeDefs = `#graphql
  scalar Date

  type Question {
    id: ID!
    title: String!
    body: String!
    author: String!
    tags: [String!]!
    votes: Int!
    createdAt: Date!
    updatedAt: Date!
    age: Float
  }

  input CreateQuestionInput {
    title: String!
    body: String!
    author: String!
    tags: [String!]
  }

  input UpdateQuestionInput {
    title: String
    body: String
    tags: [String!]
  }

  enum SortOrder {
    NEWEST
    OLDEST
    MOST_VOTED
    LEAST_VOTED
  }

  type Query {
    questions(sortBy: SortOrder = NEWEST): [Question!]!
    question(id: ID!): Question
    searchQuestions(query: String!): [Question!]!
    questionsByTag(tag: String!): [Question!]!
  }

  type Mutation {
    createQuestion(input: CreateQuestionInput!): Question!
    updateQuestion(id: ID!, input: UpdateQuestionInput!): Question
    deleteQuestion(id: ID!): Boolean!
    voteQuestion(id: ID!, direction: Int!): Question
  }
`;
