import { Request, Response } from 'express';
import { Post, User } from '../models';

export const seedData = async (req: Request, res: Response): Promise<void> => {
	try {
		const existingPost = await Post.findOne();
		if (existingPost) {
			res.json({ message: 'Seed already exists', existingPostId: existingPost._id });
			return;
		}

		const knightro = await User.create({
			username: 'Knightro',
			email: 'knightro@hackhaven.dev',
			role: 'admin'
		});

		const raven = await User.create({
			username: 'RavenCoder',
			email: 'raven@hackhaven.dev',
			role: 'member'
		});

		const post = await Post.create({
			title: 'Welcome to Hackhaven',
			body: 'This post is for population practice.',
			author: knightro._id,
			published: true,
			comments: [
				{ text: 'Great post!', user: raven._id },
				{ text: 'Thanks for sharing.', user: knightro._id }
			]
		});

		res.status(201).json({ message: 'Seed data created', postId: post._id });
	} catch (error: any) {
		res.status(500).json({ message: 'Error seeding data', error: error.message });
	}
};

export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find();
		res.json({ count: posts.length, posts });
	} catch (error: any) {
		res.status(500).json({ message: 'Error fetching posts', error: error.message });
	}
};

export const getPostById = async (req: Request, res: Response): Promise<void> => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			res.status(404).json({ message: 'Post not found' });
			return;
		}

		res.json({ post });
	} catch (error: any) {
		res.status(500).json({ message: 'Error fetching post', error: error.message });
	}
};

export const getPostsWithPopulatedAuthors = async (req: Request, res: Response): Promise<void> => {
	try {
		const posts = await Post.find()
			.populate('author', 'username role')
			.select('title author published');

		res.json({
			example: 'Populate top-level author reference',
			posts
		});
	} catch (error: any) {
		res.status(500).json({ message: 'Error populating authors', error: error.message });
	}
};

export const getPostsWithPopulatedCommentAuthors = async (req: Request, res: Response): Promise<void> => {
	res.status(501).json({
		message: 'TODO: Implement comment author population controller',
		hint: `Use Post.find().populate('comments.user', 'username')`
	});
};
