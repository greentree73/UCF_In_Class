import { gql } from '@apollo/client';

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
export const GET_QUESTIONS = gql`
  ${QUESTION_FRAGMENT}
  query GetQuestions($sortBy: SortOrder) {
    questions(sortBy: $sortBy) {
      ...QuestionInfo
    }
  }
`;

// Query to get a specific question by ID
export const GET_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  query GetQuestion($id: ID!) {
    question(id: $id) {
      ...QuestionInfo
    }
  }
`;

// Query to search questions
export const SEARCH_QUESTIONS = gql`
  ${QUESTION_FRAGMENT}
  query SearchQuestions($query: String!) {
    searchQuestions(query: $query) {
      ...QuestionInfo
    }
  }
`;

// Query to get questions by tag
export const GET_QUESTIONS_BY_TAG = gql`
  ${QUESTION_FRAGMENT}
  query GetQuestionsByTag($tag: String!) {
    questionsByTag(tag: $tag) {
      ...QuestionInfo
    }
  }
`;

// Mutation to create a new question
export const CREATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      ...QuestionInfo
    }
  }
`;

// Mutation to update a question
export const UPDATE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation UpdateQuestion($id: ID!, $input: UpdateQuestionInput!) {
    updateQuestion(id: $id, input: $input) {
      ...QuestionInfo
    }
  }
`;

// Mutation to delete a question
export const DELETE_QUESTION = gql`
  mutation DeleteQuestion($id: ID!) {
    deleteQuestion(id: $id)
  }
`;

// Mutation to vote on a question
export const VOTE_QUESTION = gql`
  ${QUESTION_FRAGMENT}
  mutation VoteQuestion($id: ID!, $direction: Int!) {
    voteQuestion(id: $id, direction: $direction) {
      ...QuestionInfo
    }
  }
`;