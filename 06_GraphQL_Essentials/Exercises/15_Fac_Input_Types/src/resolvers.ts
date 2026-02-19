import { Post } from './models/POST';

// Interface for CreatePostInput - matches GraphQL input type
interface CreatePostInput {
  title: string;
  content: string;
  author: string;
  category: string;
  tags?: string[];
  published?: boolean;
}

// Interface for UpdatePostInput - all fields optional
interface UpdatePostInput {
  title?: string;
  content?: string;
  author?: string;
  category?: string;
  tags?: string[];
  published?: boolean;
}

export const resolvers = {
  Query: {
    // Basic query resolvers for testing Input Type mutations
    posts: async () => {
      try {
        return await Post.find().sort({ createdAt: -1 });
      } catch (error) {
        console.error('Error fetching posts:', error);
        throw new Error('Failed to fetch posts');
      }
    },

    post: async (_parent: unknown, args: { id: string }) => {
      try {
        return await Post.findOne({ postId: args.id });
      } catch (error) {
        console.error('Error fetching post:', error);
        return null;
      }
    }
  },

  Mutation: {
    // Example 1: Create post using Input Type
    // Instead of many separate arguments, we receive one structured input object
    createPost: async (_parent: unknown, args: { input: CreatePostInput }) => {
      try {
        console.log('🏗️  Mutation resolver: Creating new post with Input Type');
        console.log('📦 Input received:', JSON.stringify(args.input, null, 2));

        // Generate unique ID for new post
        const postCount = await Post.countDocuments();
        const newPostId = `post-${String(postCount + 1).padStart(3, '0')}`;

        // Create new post using Input Type data
        const newPost = new Post({
          postId: newPostId,
          title: args.input.title,
          content: args.input.content,
          author: args.input.author,
          category: args.input.category,
          tags: args.input.tags || [],
          published: args.input.published || false,
          views: 0
        });

        const savedPost = await newPost.save();
        console.log(`✅ Created post: "${savedPost.title}" by ${savedPost.author}`);
        
        return savedPost;
      } catch (error) {
        console.error('❌ Error in createPost mutation:', error);
        throw new Error('Failed to create post');
      }
    },

    // Example 2: Update post using Input Type with optional fields
    // Input Type makes partial updates clean and organized
    updatePost: async (_parent: unknown, args: { id: string; input: UpdatePostInput }) => {
      try {
        console.log(`🔧 Mutation resolver: Updating post ${args.id} with Input Type`);
        console.log('📦 Update input received:', JSON.stringify(args.input, null, 2));

        // Find the existing post
        const existingPost = await Post.findOne({ postId: args.id });
        if (!existingPost) {
          console.log(`⚠️  Post not found: ${args.id}`);
          return null;
        }

        // Build update object dynamically from Input Type
        // Only include fields that were actually provided
        const updateData: any = {};
        
        if (args.input.title !== undefined) {
          updateData.title = args.input.title;
        }
        if (args.input.content !== undefined) {
          updateData.content = args.input.content;
        }
        if (args.input.author !== undefined) {
          updateData.author = args.input.author;
        }
        if (args.input.category !== undefined) {
          updateData.category = args.input.category;
        }
        if (args.input.tags !== undefined) {
          updateData.tags = args.input.tags;
        }
        if (args.input.published !== undefined) {
          updateData.published = args.input.published;
        }

        console.log('🔄 Applying updates:', Object.keys(updateData));

        // Update the post with only the provided fields
        const updatedPost = await Post.findOneAndUpdate(
          { postId: args.id },
          updateData,
          { new: true } // Return updated document
        );

        console.log(`✅ Updated post: "${updatedPost?.title}"`);
        return updatedPost;
      } catch (error) {
        console.error('❌ Error in updatePost mutation:', error);
        throw new Error(`Failed to update post with ID: ${args.id}`);
      }
    },

    // Simple delete mutation for testing cleanup
    deletePost: async (_parent: unknown, args: { id: string }) => {
      try {
        console.log(`🗑️  Mutation resolver: Deleting post ${args.id}`);
        
        const result = await Post.deleteOne({ postId: args.id });
        const success = result.deletedCount > 0;
        
        console.log(success ? '✅ Post deleted successfully' : '⚠️  Post not found');
        return success;
      } catch (error) {
        console.error('❌ Error in deletePost mutation:', error);
        throw new Error(`Failed to delete post with ID: ${args.id}`);
      }
    }
  },

  Post: {
    // Field resolver: Map MongoDB _id to GraphQL id
    id: (post: any) => post.postId,
    
    // Field resolver: Format createdAt as ISO string
    createdAt: (post: any) => post.createdAt.toISOString()
  }
};