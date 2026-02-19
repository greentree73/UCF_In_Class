import { Post } from './models/POST';

const seedData = [
  {
    postId: 'post-001',
    title: 'Welcome to HackHaven',
    content: 'HackHaven is where builders share progress and feedback. Join our community of developers learning GraphQL Input Types together!',
    author: 'Knightro',
    views: 42,
    published: true,
    createdAt: new Date('2024-01-15'),
    tags: ['welcome', 'community', 'introduction'],
    category: 'announcements'
  },
  {
    postId: 'post-002',
    title: 'GraphQL Input Types Guide',
    content: 'Learn about GraphQL Input Types - complex input objects that make mutations cleaner and more organized.',
    author: 'Astra',
    views: 28,
    published: true,
    createdAt: new Date('2024-02-01'),
    tags: ['graphql', 'input-types', 'tutorial'],
    category: 'tutorials'
  },
  {
    postId: 'post-003',
    title: 'Mutation Best Practices',
    content: 'How to structure GraphQL mutations using Input Types for create, update, and delete operations.',
    author: 'Phoenix',
    views: 15,
    published: false,
    createdAt: new Date('2024-02-10'),
    tags: ['mutations', 'best-practices', 'graphql'],
    category: 'best-practices'
  }
];

export async function seedDatabase() {
  try {
    // Check if data already exists
    const existingPosts = await Post.countDocuments();
    
    if (existingPosts > 0) {
      console.log('🌱 Database already seeded, skipping...');
      return;
    }

    // Insert seed data
    await Post.insertMany(seedData);
    console.log('🌱 Database seeded successfully with HackHaven posts!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}