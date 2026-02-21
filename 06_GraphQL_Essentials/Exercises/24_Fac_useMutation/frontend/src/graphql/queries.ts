import { gql } from '@apollo/client';

// Variable primer:
// - Variables are declared in the operation signature with $name and a GraphQL type.
// - Example: query GetQuestion($id: ID!)
// - Variables are then injected into fields using the same $name.
// - Example: question(id: $id)
// This keeps queries reusable and avoids hard-coding values in the GraphQL document.

// Fragment for question data (reusable across queries)
export const QUESTION_FRAGMENT = gql`
  fragment QuestionInfo on Question {
    id
    title
    body
    author
    tags
    votes
    createdAt
    updatedAt
    age
  }
`;

// Query to get all questions with optional sorting
// Variable used: $sortBy -> controls server-side sorting order.
export const GET_QUESTIONS = gql`
  ${QUESTION_FRAGMENT}
  query GetQuestions($sortBy: SortOrder) {
    questions(sortBy: $sortBy) {
      ...QuestionInfo
    }
  }
`;

// Query to get a specific question by ID
// Variable used: $id -> selects a single question record.
export const GET_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  query GetQuestion($id: ID!) {
    question(id: $id) {
      ...QuestionInfo
    }
  }
`;

// Query to search questions
// Variable used: $query -> sends the search text to the backend resolver.
export const SEARCH_QUESTIONS = gql`
  ${QUESTION_FRAGMENT}
  query SearchQuestions($query: String!) {
    searchQuestions(query: $query) {
      ...QuestionInfo
    }
  }
`;

// Query to get questions by tag
// Variable used: $tag -> filters questions by one tag value.
export const GET_QUESTIONS_BY_TAG = gql`
  ${QUESTION_FRAGMENT}
  query GetQuestionsByTag($tag: String!) {
    questionsByTag(tag: $tag) {
      ...QuestionInfo
    }
  }
`;

// Mutation to create a new question
// Variable used: $input -> sends a structured object matching CreateQuestionInput.
export const CREATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      ...QuestionInfo
    }
  }
`;

// Mutation to update a question
// Variables used:
// - $id identifies which question to update
// - $input provides the updated fields
export const UPDATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      ...QuestionInfo
    }
  }
`;

// Mutation to delete a question
// Variable used: $id -> selects which question to remove.
export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`;

// Mutation to vote on a question
// Variables used:
// - $id identifies which question is being voted on
// - $direction is the vote delta (+1 or -1)
export const VOTE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation VoteQuestion($id: ID!, $direction: Int!) {
    voteQuestion(id: $id, direction: $direction) {
      ...QuestionInfo
    }
  }
`;