import { Request, Response } from 'express';
import { Post } from '../models';

// Create a new post
export const createPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = new Post(req.body);
		await post.save();
		res.status(201).json({ message: 'Post created successfully', post });
	} catch (err: any) {
		res.status(400).json({ message: 'Error creating post', error: err.message });
	}
};

// Get all posts
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find();
		res.json({ count: posts.length, posts });
	} catch (err: any) {
		res.status(400).json({ message: 'Error fetching posts', error: err.message });
	}
};

// Get a single post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ post });
	} catch (err: any) {
		res.status(400).json({ message: 'Error fetching post', error: err.message });
	}
};

// ========================================
// INSTANCE METHODS IN ACTION
// ========================================

// Increment views when a post is viewed
export const viewPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		// Call instance method to increment views
		await post.incrementViews();
		
		res.json({ 
			message: 'Post viewed successfully',
			views: post.views,
			post 
		});
	} catch (err: any) {
		res.status(400).json({ message: 'Error viewing post', error: err.message });
	}
};

// Get a post excerpt (preview)
export const getPostExcerpt = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		// Call instance method to get excerpt
		const excerpt = post.getExcerpt(100);
		
		res.json({ 
			title: post.title,
			author: post.author,
			excerpt,
			fullLength: post.body.length
		});
	} catch (err: any) {
		res.status(400).json({ message: 'Error fetching excerpt', error: err.message });
	}
};

// Publish a post
export const publishPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		// Call instance method to publish
		await post.publish();
		
		res.json({ 
			message: 'Post published successfully',
			post 
		});
	} catch (err: any) {
		res.status(400).json({ message: 'Error publishing post', error: err.message });
	}
};

// Add a tag to a post
export const addTagToPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		const { tag } = req.body;
		
		if (!tag) {
			res.status(400).json({ message: 'Tag is required' });
			return;
		}
		
		// Call instance method to add tag
		await post.addTag(tag);
		
		res.json({ 
			message: 'Tag added successfully',
			tags: post.tags,
			post 
		});
	} catch (err: any) {
		res.status(400).json({ message: 'Error adding tag', error: err.message });
	}
};

// Delete a post
export const deletePost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ message: 'Post deleted successfully' });
	} catch (err: any) {
		res.status(400).json({ message: 'Error deleting post', error: err.message });
	}
};
