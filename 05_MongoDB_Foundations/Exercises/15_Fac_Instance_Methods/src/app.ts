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
		message: 'Mongoose Instance Methods Demo API',
		endpoints: {
			'POST /posts': 'Create a new post',
			'GET /posts': 'Get all posts',
			'GET /posts/:id': 'Get a single post',
			'POST /posts/:id/view': '📈 Increment views (instance method)',
			'GET /posts/:id/excerpt': '📄 Get post excerpt (instance method)',
			'PUT /posts/:id/publish': '✅ Publish post (instance method)',
			'POST /posts/:id/tags': '🏷️ Add tag (instance method)',
			'DELETE /posts/:id': 'Delete a post'
		}
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
