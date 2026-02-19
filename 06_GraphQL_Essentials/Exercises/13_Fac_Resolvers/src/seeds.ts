import { Post } from './models/POST';

const seedData = [
  {
    postId: 'post-001',
    title: 'Welcome to HackHaven',
    content: 'HackHaven is where builders share progress and feedback. Join our community of developers learning GraphQL together!',
    author: 'Knightro',
    views: 42,
    published: true,
    createdAt: new Date('2024-01-15'),
    tags: ['welcome', 'community', 'introduction'],
    category: 'announcements'
  },
  {
    postId: 'post-002',
    title: 'GraphQL Resolver Patterns',
    content: 'Learn the fundamental patterns for writing effective GraphQL resolvers. From simple field resolution to complex data fetching.',
    author: 'Astra',
    views: 28,
    published: true,
    createdAt: new Date('2024-02-01'),
    tags: ['graphql', 'resolvers', 'tutorial'],
    category: 'tutorials'
  },
  {
    postId: 'post-003',
    title: 'UCF Dev Session Notes',
    content: 'Weekly session covering advanced GraphQL concepts. This week we focus on resolver architecture and best practices.',
    author: 'Knightro',
    views: 15,
    published: false,
    createdAt: new Date('2024-02-10'),
    tags: ['ucf', 'session-notes', 'learning'],
    category: 'education'
  },
  {
    postId: 'post-004',
    title: 'Building Scalable Resolvers',
    content: 'How to structure your GraphQL resolvers for maintainability and performance in production applications.',
    author: 'Phoenix',
    views: 67,
    published: true,
    createdAt: new Date('2024-01-28'),
    tags: ['resolvers', 'scalability', 'production'],
    category: 'best-practices'
  },
  {
    postId: 'post-005',
    title: 'Async Resolver Deep Dive',
    content: 'Understanding async/await patterns in GraphQL resolvers and handling database operations effectively.',
    author: 'Astra',
    views: 34,
    published: true,
    createdAt: new Date('2024-02-05'),
    tags: ['async', 'database', 'patterns'],
    category: 'tutorials'
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