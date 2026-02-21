// GraphQL Types that match our backend schema
export interface Question {
  id: string;
  title: string;
  body: string;
  author: string;
  tags: string[];
  votes: number;
  createdAt: string;
  updatedAt: string;
  age?: number;
}

export interface CreateQuestionInput {
  title: string;
  body: string;
  author: string;
  tags?: string[];
}

export interface UpdateQuestionInput {
  title?: string;
  body?: string;
  tags?: string[];
}

export enum SortOrder {
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
  MOST_VOTED = 'MOST_VOTED',
  LEAST_VOTED = 'LEAST_VOTED'
}

// Apollo Client Query Results
export interface GetQuestionsData {
  questions: Question[];
}

export interface GetQuestionData {
  question: Question | null;
}

export interface SearchQuestionsData {
  searchQuestions: Question[];
}

export interface GetQuestionsByTagData {
  questionsByTag: Question[];
}

// Apollo Client Mutation Results
export interface CreateQuestionData {
  createQuestion: Question;
}

export interface UpdateQuestionData {
  updateQuestion: Question | null;
}

export interface DeleteQuestionData {
  deleteQuestion: boolean;
}

export interface VoteQuestionData {
  voteQuestion: Question | null;
}

// Apollo Client Variables
export interface GetQuestionsVariables {
  sortBy?: SortOrder;
}

export interface GetQuestionVariables {
  id: string;
}

export interface SearchQuestionsVariables {
  query: string;
}

export interface GetQuestionsByTagVariables {
  tag: string;
}

export interface CreateQuestionVariables {
  input: CreateQuestionInput;
}

export interface UpdateQuestionVariables {
  id: string;
  input: UpdateQuestionInput;
}

export interface DeleteQuestionVariables {
  id: string;
}

export interface VoteQuestionVariables {
  id: string;
  direction: number;
}