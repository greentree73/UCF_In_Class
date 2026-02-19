import { Post } from './models/POST';

const seedData = [
  {
    postId: 'post-001',
    title: 'Welcome to HackHaven',
    content: 'HackHaven is where builders share progress and feedback.',
    author: 'Knightro',
    views: 42,
    published: true,
    createdAt: new Date('2024-01-15'),
    tags: ['welcome', 'community'],
    category: 'announcements'
  },
  {
    postId: 'post-002',
    title: 'GraphQL Query Patterns',
    content: 'Define clear query names and use arguments for filtering.',
    author: 'Astra',
    views: 18,
    published: false,
    createdAt: new Date('2024-02-01'),
    tags: ['graphql', 'tutorial', 'patterns'],
    category: 'tutorials'
  },
  {
    postId: 'post-003',
    title: 'UCF Dev Updates',
    content: 'Weekly session notes and resources for learners.',
    author: 'Knightro',
    views: 31,
    published: true,
    createdAt: new Date('2024-02-10'),
    tags: ['updates', 'learning'],
    category: 'news'
  },
  {
    postId: 'post-004',
    title: 'Building with Apollo Server',
    content: 'Step-by-step guide to creating GraphQL APIs with Apollo.',
    author: 'Phoenix',
    views: 67,
    published: true,
    createdAt: new Date('2024-01-28'),
    tags: ['apollo', 'graphql', 'server', 'tutorial'],
    category: 'tutorials'
  },
  {
    postId: 'post-005',
    title: 'Code Review Best Practices',
    content: 'How to give and receive effective code reviews.',
    author: 'Astra',
    views: 23,
    published: true,
    createdAt: new Date('2024-02-05'),
    tags: ['code-review', 'collaboration'],
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