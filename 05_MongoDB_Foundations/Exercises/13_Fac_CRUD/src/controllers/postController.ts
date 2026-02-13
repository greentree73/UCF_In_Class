import { Request, Response } from 'express';
import { Post } from '../models';

// ============================================
// CREATE - Add a new post
// ============================================

export const createPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = new Post({
			title: req.body.title,
			body: req.body.body,
			author: req.body.author,
			tags: req.body.tags,
			published: req.body.published
		});

		const savedPost = await post.save();
		
		res.status(201).json({ 
			message: 'Post created successfully',
			post: savedPost 
		});
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error creating post',
			error: err.message 
		});
	}
};

// ============================================
// READ - Get all posts
// ============================================

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find();
		
		res.json({ 
			count: posts.length,
			posts 
		});
	} catch (err: any) {
		res.status(500).json({ 
			message: 'Error fetching posts',
			error: err.message 
		});
	}
};

// ============================================
// READ - Get post by ID
// ============================================

export const getPostById = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ post });
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Invalid post ID',
			error: err.message 
		});
	}
};

// ============================================
// UPDATE - Update a post
// ============================================

export const updatePost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			{ 
				...req.body,
				updatedAt: Date.now()
			},
			{ 
				new: true,           // Return the updated document
				runValidators: true  // Run schema validation
			}
		);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ 
			message: 'Post updated successfully',
			post 
		});
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error updating post',
			error: err.message 
		});
	}
};

// ============================================
// DELETE - Remove a post
// ============================================

export const deletePost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ 
			message: 'Post deleted successfully',
			post 
		});
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Error deleting post',
			error: err.message 
		});
	}
};

// ============================================
// QUERY - Get published posts
// ============================================

export const getPublishedPosts = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find({ published: true })
			.sort({ createdAt: -1 })  // Sort by newest first
			.limit(10);                // Limit to 10 results
		
		res.json({ 
			count: posts.length,
			posts 
		});
	} catch (err: any) {
		res.status(500).json({ 
			message: 'Error fetching published posts',
			error: err.message 
		});
	}
};

// ============================================
// QUERY - Get posts by author
// ============================================

export const getPostsByAuthor = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find({ 
			author: req.params.author 
		});
		
		res.json({ 
			author: req.params.author,
			count: posts.length,
			posts 
		});
	} catch (err: any) {
		res.status(500).json({ 
			message: 'Error fetching posts by author',
			error: err.message 
		});
	}
};

// ============================================
// QUERY - Search posts by tag
// ============================================

export const getPostsByTag = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find({ 
			tags: req.params.tag  // Matches if array contains the tag
		});
		
		res.json({ 
			tag: req.params.tag,
			count: posts.length,
			posts 
		});
	} catch (err: any) {
		res.status(500).json({ 
			message: 'Error searching posts by tag',
			error: err.message 
		});
	}
};
