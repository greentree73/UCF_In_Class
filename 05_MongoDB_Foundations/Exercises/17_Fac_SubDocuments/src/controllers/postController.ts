import { Request, Response } from 'express';
import { Post } from '../models';

// ======================
// POST CRUD OPERATIONS
// ======================

// CREATE - Add a new post (optionally with initial comments)
export const createPost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = new Post({
			title: req.body.title,
			body: req.body.body,
			author: req.body.author,
			tags: req.body.tags,
			published: req.body.published,
			comments: req.body.comments || []  // Can include initial comments
		});

		const savedPost = await post.save();
		
		res.status(201).json({ 
			message: 'Post created successfully',
			post: savedPost,
			commentCount: savedPost.comments.length
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error creating post',
			error: error.message 
		});
	}
};

// READ - Get all posts (including their subdocuments)
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find();
		
		res.json({ 
			count: posts.length,
			posts 
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error fetching posts',
			error: error.message 
		});
	}
};

// READ - Get single post by ID
export const getPostById = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ 
			post,
			commentCount: post.comments.length
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error fetching post',
			error: error.message 
		});
	}
};

// DELETE - Remove a post (and all its subdocuments automatically)
export const deletePost = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findByIdAndDelete(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ 
			message: 'Post and all its comments deleted successfully',
			deletedPost: post 
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error deleting post',
			error: error.message 
		});
	}
};

// ===============================
// SUBDOCUMENT OPERATIONS
// ===============================

// CREATE - Add a comment (subdocument) to a post
export const addComment = async (req: Request, res: Response): Promise<void> => {
	try {
		// 1. Find the parent document
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}

		// 2. Add the subdocument to the array
		post.comments.push({
			author: req.body.author,
			text: req.body.text,
			likes: req.body.likes || 0
		} as any);

		// 3. Save the parent document (subdocument is saved automatically)
		await post.save();
		
		// The newly added comment is the last one in the array
		const newComment = post.comments[post.comments.length - 1];
		
		res.status(201).json({ 
			message: '💬 Comment added successfully',
			comment: newComment,
			post: {
				id: post._id,
				title: post.title,
				totalComments: post.comments.length
			}
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error adding comment',
			error: error.message 
		});
	}
};

// READ - Get all comments for a post
export const getComments = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}
		
		res.json({ 
			postTitle: post.title,
			commentCount: post.comments.length,
			comments: post.comments 
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error fetching comments',
			error: error.message 
		});
	}
};

// READ - Get a specific comment by ID
export const getCommentById = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}

		// Use Mongoose's .id() method to find subdocument by its _id
		const comment = post.comments.id(req.params.commentId);
		
		if (!comment) {
			res.status(404).json({ message: 'Comment not found' });
			return;
		}
		
		res.json({ 
			comment,
			parentPost: {
				id: post._id,
				title: post.title
			}
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error fetching comment',
			error: error.message 
		});
	}
};

// UPDATE - Modify a specific comment
export const updateComment = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}

		// Find the specific subdocument
		const comment = post.comments.id(req.params.commentId);
		
		if (!comment) {
			res.status(404).json({ message: 'Comment not found' });
			return;
		}

		// Update the subdocument fields
		if (req.body.text) comment.text = req.body.text;
		if (req.body.author) comment.author = req.body.author;
		if (req.body.likes !== undefined) comment.likes = req.body.likes;

		// Save the parent document to persist changes
		await post.save();
		
		res.json({ 
			message: '✏️ Comment updated successfully',
			comment 
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error updating comment',
			error: error.message 
		});
	}
};

// DELETE - Remove a specific comment
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}

		// Method 1: Using pull() - Recommended approach
		post.comments.pull(req.params.commentId);

		// Alternative Method 2: Using deleteOne() on the subdocument
		// const comment = post.comments.id(req.params.commentId);
		// if (!comment) {
		//   res.status(404).json({ message: 'Comment not found' });
		//   return;
		// }
		// comment.deleteOne();

		// Save the parent to persist changes
		await post.save();
		
		res.json({ 
			message: '🗑️ Comment deleted successfully',
			remainingComments: post.comments.length 
		});
	} catch (error: any) {
		res.status(500).json({ 
			message: 'Error deleting comment',
			error: error.message 
		});
	}
};
