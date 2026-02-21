import 'dotenv/config';
import mongoose from 'mongoose';
import Question from './models/Question.js';

const sampleQuestions = [
  {
    title: 'How to center a div in CSS?',
    body: "I've been struggling with centering a div element both horizontally and vertically. What's the best modern approach to achieve this?",
    author: 'CSSNewbie',
    tags: ['css', 'frontend', 'layout'],
    votes: 15,
  },
  {
    title: 'What is the difference between let, const, and var in JavaScript?',
    body: 'Can someone explain the key differences between these three ways of declaring variables in JavaScript? When should I use each one?',
    author: 'JSLearner',
    tags: ['javascript', 'variables', 'fundamentals'],
    votes: 42,
  },
  {
    title: 'How to set up MongoDB with Node.js?',
    body: "I'm building my first MERN stack application. What's the best way to connect MongoDB to a Node.js application? Should I use Mongoose?",
    author: 'FullStackBeginner',
    tags: ['mongodb', 'nodejs', 'database', 'mern'],
    votes: 28,
  },
  {
    title: 'React useState vs useReducer - when to use which?',
    body: "I understand how useState works, but I'm confused about useReducer. In what scenarios should I choose useReducer over useState?",
    author: 'ReactDeveloper',
    tags: ['react', 'hooks', 'state-management'],
    votes: 33,
  },
  {
    title: 'How to handle CORS errors in Express.js?',
    body: "My frontend React app can't connect to my Express backend due to CORS errors. How do I properly configure CORS for development and production?",
    author: 'BackendDev',
    tags: ['express', 'cors', 'backend', 'api'],
    votes: 19,
  },
  {
    title: 'GraphQL vs REST API - which should I choose?',
    body: "I'm designing a new API for my application. What are the pros and cons of GraphQL compared to REST? Which one is better for a small team?",
    author: 'APIDesigner',
    tags: ['graphql', 'rest', 'api', 'architecture'],
    votes: 56,
  },
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/Apollo_Splashdown';
    await mongoose.connect(MONGODB_URI);
    console.log('📊 Connected to MongoDB for seeding');

    await Question.deleteMany({});
    console.log('🗑️ Cleared existing questions');

    const createdQuestions = await Question.insertMany(sampleQuestions);
    console.log(`✅ Seeded ${createdQuestions.length} questions:`);

    createdQuestions.forEach((question, index) => {
      console.log(`  ${index + 1}. ${question.title} (${question.votes} votes)`);
    });

    console.log('🎉 Database seeding completed!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase();
}
