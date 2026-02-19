import { Post } from './models/POST';

interface PostFilters {
  author?: string;
  published?: boolean;
  minViews?: number;
  category?: string;
}

export const resolvers = {
  Query: {
    // Required argument example
    post: async (_parent: unknown, args: { id: string }) => {
      try {
        return await Post.findOne({ postId: args.id });
      } catch (error) {
        console.error('Error fetching post:', error);
        return null;
      }
    },

    // Optional argument with default value
    posts: async (_parent: unknown, args: { limit?: number }) => {
      try {
        const limit = args.limit || 10;
        return await Post.find().limit(limit).sort({ createdAt: -1 });
      } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
      }
    },

    // Multiple optional arguments for complex filtering
    postsByFilters: async (_parent: unknown, args: PostFilters) => {
      try {
        const filter: any = {};
        
        if (args.author) {
          filter.author = new RegExp(args.author, 'i');
        }
        
        if (args.published !== undefined) {
          filter.published = args.published;
        }
        
        if (args.minViews) {
          filter.views = { $gte: args.minViews };
        }
        
        if (args.category) {
          filter.category = new RegExp(args.category, 'i');
        }
        
        return await Post.find(filter).sort({ createdAt: -1 });
      } catch (error) {
        console.error('Error filtering posts:', error);
        return [];
      }
    },

    // Array argument example
    postsByTags: async (_parent: unknown, args: { tags: string[] }) => {
      try {
        return await Post.find({
          tags: { $in: args.tags.map(tag => new RegExp(tag, 'i')) }
        }).sort({ createdAt: -1 });
      } catch (error) {
        console.error('Error fetching posts by tags:', error);
        return [];
      }
    }
  },
  
  Post: {
    // Map MongoDB _id to GraphQL id field
    id: (post: any) => post.postId
  }
};