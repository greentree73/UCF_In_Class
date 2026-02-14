import express, { Application } from 'express';
import { connectDB } from './config/db';
import { Post } from './models/POST';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
	res.json({
		message: '🔮 Mongoose Virtuals Intro - Hackhaven Post Model',
		whatIsVirtual: 'A virtual is a computed field that is not stored in MongoDB.',
		whyUseIt: [
			'Keeps derived data out of the database',
			'Reduces duplicate/stale data issues',
			'Makes API responses cleaner'
		],
		examplesInThisDemo: ['readingTimeMinutes', 'titleWithAuthor'],
		demoRoute: 'GET /virtuals-demo'
	});
});

app.get('/virtuals-demo', async (req, res) => {
	try {
		let post = await Post.findOne();

		if (!post) {
			post = await Post.create({
				title: 'Welcome to Hackhaven',
				body: 'Virtuals help us compute useful values from real fields without storing duplicate data in MongoDB. This keeps our schema clean and easier to maintain.',
				author: 'Knightro',
				tags: ['mongodb', 'mongoose', 'virtuals'],
				published: true
			});
		}

		res.json({
			storedFields: {
				title: post.title,
				author: post.author,
				bodyLength: post.body.length
			},
			virtualExample1: {
				name: 'readingTimeMinutes',
				value: post.readingTimeMinutes,
				explanation: 'Computed from body word count (not stored in MongoDB).'
			},
			virtualExample2: {
				name: 'titleWithAuthor',
				value: post.titleWithAuthor,
				explanation: 'Display-ready title composed from title + author.'
			}
		});
	} catch (error: any) {
		res.status(500).json({
			message: 'Error running virtuals demo',
			error: error.message
		});
	}
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
