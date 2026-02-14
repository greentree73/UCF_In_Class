import express, { Application } from 'express';
import { connectDB } from './config/db';
import { Post, User } from './models';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
	res.json({
		message: '🔗 Mongoose Population Intro - Hackhaven',
		whatIsPopulation: 'Population replaces ObjectId refs with full related document data.',
		whyUseIt: [
			'Stores references instead of duplicated objects',
			'Loads related data only when needed',
			'Makes API responses easier to read'
		],
		routes: {
			'GET /populate-author': 'Example 1: populate Post author',
			'GET /populate-comment-authors': 'Example 2: populate Post comment authors'
		}
	});
});

const seedIfNeeded = async (): Promise<void> => {
	const existingPost = await Post.findOne();
	if (existingPost) return;

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

	await Post.create({
		title: 'Welcome to Hackhaven',
		body: 'This post demonstrates basic population in Mongoose.',
		author: knightro._id,
		published: true,
		comments: [
			{ text: 'Great starter post!', user: raven._id },
			{ text: 'Thanks for sharing!', user: knightro._id }
		]
	});
};

app.get('/populate-author', async (req, res) => {
	try {
		await seedIfNeeded();

		const posts = await Post.find()
			.populate('author', 'username role')
			.select('title author published');

		res.json({
			example: 'Populate top-level author reference',
			query: `Post.find().populate('author', 'username role')`,
			posts
		});
	} catch (error: any) {
		res.status(500).json({ message: 'Error running author population', error: error.message });
	}
});

app.get('/populate-comment-authors', async (req, res) => {
	try {
		await seedIfNeeded();

		const posts = await Post.find()
			.populate('comments.user', 'username')
			.select('title comments');

		res.json({
			example: 'Populate nested comment user references',
			query: `Post.find().populate('comments.user', 'username')`,
			posts
		});
	} catch (error: any) {
		res.status(500).json({
			message: 'Error running comment author population',
			error: error.message
		});
	}
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
