import { Post } from './models/POST';

export const resolvers = {
  Query: {
    // Example 1: Basic resolver - fetches all posts from database
    // This demonstrates the most common resolver pattern: Query -> Database
    posts: async () => {
      try {
        console.log('🔍 Query resolver: Fetching all posts...');
        const posts = await Post.find().sort({ createdAt: -1 });
        console.log(`✅ Found ${posts.length} posts`);
        return posts;
      } catch (error) {
        console.error('❌ Error in posts resolver:', error);
        throw new Error('Failed to fetch posts');
      }
    },

    // Example 2: Resolver with arguments - finds specific post by ID
    // This shows how resolvers handle arguments and conditional logic
    post: async (_parent, args) => {
      try {
        console.log(`🔍 Query resolver: Fetching post with ID: ${args.id}`);
        const post = await Post.findOne({ postId: args.id });
        
        if (!post) {
          console.log(`⚠️  Post not found: ${args.id}`);
          return null;
        }
        
        console.log(`✅ Found post: "${post.title}"`);
        return post;
      } catch (error) {
        console.error('❌ Error in post resolver:', error);
        throw new Error(`Failed to fetch post with ID: ${args.id}`);
      }
    }
  },

  Post: {
    // Field resolver: Maps MongoDB _id to GraphQL id
    // This is a simple transformation resolver
    id: (post) => {
      return post.postId;
    },

    // Field resolver: Computed field - determines if post is popular
    // This demonstrates business logic in resolvers
    isPopular: (post) => {
      const threshold = 30; // Posts with 30+ views are "popular"
      const isPopular = post.views >= threshold;
      console.log(`📊 Computing popularity for "${post.title}": ${post.views} views -> ${isPopular ? 'Popular' : 'Not Popular'}`);
      return isPopular;
    },

    // Field resolver: Computed field - creates content summary
    // This shows how resolvers can transform and derive data
    summary: (post) => {
      const maxLength = 100;
      let summary = post.content.length <= maxLength 
        ? post.content 
        : post.content.substring(0, maxLength) + '...';
      
      console.log(`📝 Creating summary for "${post.title}": ${summary.length} characters`);
      return summary;
    },

    // Field resolver: Format createdAt as ISO string
    // Simple data formatting in resolvers
    createdAt: (post) => {
      return post.createdAt.toISOString();
    }
  }
};