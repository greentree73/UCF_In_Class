import express from 'express';
import { connectDB, closeDB } from './config/db';
import postRoutes from './routes/postRoutes';

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Parse JSON request bodies
app.use(express.json());

// ============================================
// DATABASE CONNECTION
// ============================================

connectDB();

// ============================================
// ROUTES
// ============================================

// Root route - API information
app.get('/', (req, res) => {
	res.json({ 
		message: 'Mongoose CRUD Operations API',
		database: 'Hackhaven',
		version: '1.0.0',
		endpoints: {
			'POST /posts': 'Create a new post',
			'GET /posts': 'Get all posts',
			'GET /posts/:id': 'Get a post by ID',
			'PUT /posts/:id': 'Update a post by ID',
			'DELETE /posts/:id': 'Delete a post by ID',
			'GET /posts/filter/published': 'Get published posts',
			'GET /posts/author/:author': 'Get posts by author',
			'GET /posts/tag/:tag': 'Get posts by tag'
		}
	});
});

// Mount post routes at /posts
app.use('/posts', postRoutes);

// ============================================
// SERVER
// ============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`📝 API Documentation: http://localhost:${PORT}`);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGINT', async () => {
	console.log('\n🛑 Shutting down gracefully...');
	await closeDB();
	process.exit(0);
});
