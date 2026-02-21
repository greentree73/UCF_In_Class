import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language/index.js';
import Question from '../models/Question.js';

const DateType = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    return value instanceof Date ? value.toISOString() : null;
  },
  parseValue(value) {
    return new Date(value as string);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export const resolvers = {
  Date: DateType,

  Query: {
    questions: async (_parent, { sortBy }) => {
      console.log(`🔍 Fetching questions with sort: ${sortBy}`);

      let sortCriteria = {};
      switch (sortBy) {
        case 'OLDEST':
          sortCriteria = { createdAt: 1 };
          break;
        case 'MOST_VOTED':
          sortCriteria = { votes: -1, createdAt: -1 };
          break;
        case 'LEAST_VOTED':
          sortCriteria = { votes: 1, createdAt: -1 };
          break;
        case 'NEWEST':
        default:
          sortCriteria = { createdAt: -1 };
          break;
      }

      const questions = await Question.find().sort(sortCriteria).lean();
      console.log(`📊 Found ${questions.length} questions`);
      return questions;
    },

    question: async (_parent, { id }) => {
      console.log(`🔍 Fetching question by ID: ${id}`);
      const question = await Question.findById(id).lean();
      if (!question) {
        console.log(`❌ Question not found: ${id}`);
      }
      return question;
    },

    searchQuestions: async (_parent, { query }) => {
      console.log(`🔍 Searching questions for: "${query}"`);
      const questions = await Question.find({
        $text: { $search: query },
      })
        .sort({ score: { $meta: 'textScore' } })
        .lean();
      console.log(`📊 Found ${questions.length} matching questions`);
      return questions;
    },

    questionsByTag: async (_parent, { tag }) => {
      console.log(`🏷️ Fetching questions with tag: ${tag}`);
      const questions = await Question.find({
        tags: { $in: [tag] },
      })
        .sort({ createdAt: -1 })
        .lean();
      console.log(`📊 Found ${questions.length} questions with tag "${tag}"`);
      return questions;
    },
  },

  Mutation: {
    createQuestion: async (_parent, { input }) => {
      console.log('🏗️ Creating new question');
      console.log('📦 Input received:', JSON.stringify(input, null, 2));

      const question = new Question({
        title: input.title,
        body: input.body,
        author: input.author,
        tags: input.tags || [],
      });

      const savedQuestion = await question.save();
      console.log(`✅ Created question: ${savedQuestion.title} (${savedQuestion._id})`);

      return savedQuestion;
    },

    updateQuestion: async (_parent, { id, input }) => {
      console.log('🔧 Updating question');
      console.log(`📝 Question ID: ${id}`);
      console.log('📦 Update input:', JSON.stringify(input, null, 2));

      const updatedQuestion = await Question.findByIdAndUpdate(
        id,
        { $set: input },
        { new: true, runValidators: true }
      ).lean();

      if (!updatedQuestion) {
        console.log(`❌ Question not found for update: ${id}`);
        return null;
      }

      console.log(`✅ Updated question: ${updatedQuestion.title}`);

      return updatedQuestion;
    },

    deleteQuestion: async (_parent, { id }) => {
      console.log(`🗑️ Deleting question: ${id}`);

      const result = await Question.findByIdAndDelete(id);
      const success = !!result;

      if (success) {
        console.log(`✅ Deleted question: ${id}`);
      } else {
        console.log(`❌ Question not found for deletion: ${id}`);
      }

      return success;
    },

    voteQuestion: async (_parent, { id, direction }) => {
      console.log(`🗳️ Voting on question ${id}: ${direction > 0 ? '+1' : '-1'}`);

      const increment = direction > 0 ? 1 : -1;
      const question = await Question.findByIdAndUpdate(
        id,
        { $inc: { votes: increment } },
        { new: true }
      ).lean();

      if (!question) {
        console.log(`❌ Question not found for voting: ${id}`);
        return null;
      }

      console.log(`✅ Voted on question: ${question.title} (votes: ${question.votes})`);

      return question;
    },
  },

  Question: {
    id: (question) => question._id.toString(),
    age: (question) => Date.now() - new Date(question.createdAt).getTime(),
  },
};
