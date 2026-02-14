import express, { Application } from 'express';
import { connectDB } from './config/db';
import postRoutes from './routes/postRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/posts', postRoutes);

// Root route
app.get('/', (req, res) => {
	res.json({ 
		message: '🗂️ Mongoose Subdocuments Demo - Hackhaven Blog API',
		description: 'This demo shows how to use subdocuments (comments) embedded within blog posts',
		endpoints: {
			'POST /posts': 'Create a new post (optionally with comments)',
			'GET /posts': 'Get all posts with their comments',
			'GET /posts/:id': 'Get a single post with comments',
			'POST /posts/:id/comments': '💬 Add a comment (subdocument) to a post',
			'GET /posts/:id/comments': '📝 Get all comments for a post',
			'GET /posts/:id/comments/:commentId': '🔍 Get a specific comment',
			'PUT /posts/:id/comments/:commentId': '✏️ Update a specific comment',
			'DELETE /posts/:id/comments/:commentId': '🗑️ Delete a specific comment',
			'DELETE /posts/:id': 'Delete a post (and all its comments)'
		},
		keyLearning: {
			subdocuments: 'Comments are stored INSIDE the post document',
			benefit: 'Single query retrieves both post and all comments',
			limitation: 'Comments cannot be referenced by other documents'
		}
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
	console.log(`📚 API Documentation: http://localhost:${PORT}`);
});

export default app;
