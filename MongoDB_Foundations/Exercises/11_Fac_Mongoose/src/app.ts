import express from 'express';
import { connectDB, closeDB } from './config/db';
import { Post } from './models';

const app = express();
app.use(express.json());

// ============================================
// CONNECTING TO MONGODB WITH MONGOOSE
// ============================================

// Connect to the Hackhaven database
connectDB();

// ============================================
// BASIC CRUD OPERATIONS
// ============================================

app.get('/', (req, res) => {
	res.json({ 
		message: 'Mongoose ODM Introduction API',
		database: 'Hackhaven',
		endpoints: {
			'GET /posts': 'Get all posts',
			'GET /posts/:id': 'Get post by ID',
			'POST /posts': 'Create new post',
			'PUT /posts/:id': 'Update post',
			'DELETE /posts/:id': 'Delete post',
			'GET /posts/filter/published': 'Get published posts',
			'GET /posts/author/:author': 'Get posts by author',
			'GET /posts/tag/:tag': 'Search posts by tag'
		}
	});
});

// CREATE - Add a new post
app.post('/posts', async (req, res) => {
	try {
		// Create a new instance of the Post model
		const post = new Post({
			title: req.body.title,
			body: req.body.body,
			author: req.body.author,
			tags: req.body.tags,
			published: req.body.published
		});

		// Save to database - Mongoose validates and saves the document
		const savedPost = await post.save();
		
		res.status(201).json({ 
			message: 'Post created successfully',
			post: savedPost 
		});
	} catch (err: any) {
		// Mongoose provides detailed validation errors
		res.status(400).json({ 
			message: 'Error creating post',
			error: err.message 
		});
	}
});

// READ - Get all posts
app.get('/posts', async (req, res) => {
	try {
		// Find all documents in the collection
		// Mongoose returns JavaScript objects (not plain JSON)
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
});

// READ - Get post by ID
app.get('/posts/:id', async (req, res) => {
	try {
		// findById is a Mongoose helper method
		// Automatically handles ObjectId conversion
		const post = await Post.findById(req.params.id);
		
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}
		
		res.json({ post });
	} catch (err: any) {
		res.status(400).json({ 
			message: 'Invalid post ID',
			error: err.message 
		});
	}
});

// UPDATE - Update a post
app.put('/posts/:id', async (req, res) => {
	try {
		// findByIdAndUpdate finds the document and updates it
		// { new: true } returns the updated document
		// { runValidators: true } runs schema validation on update
		const post = await Post.findByIdAndUpdate(
			req.params.id,
			{ 
				...req.body,
				updatedAt: Date.now()
			},
			{ 
				new: true,           // Return updated document
				runValidators: true  // Run schema validation
			}
		);
		
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
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
});

// DELETE - Remove a post
app.delete('/posts/:id', async (req, res) => {
	try {
		// findByIdAndDelete finds and removes the document
		const post = await Post.findByIdAndDelete(req.params.id);
		
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
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
});

// ============================================
// QUERYING WITH MONGOOSE
// ============================================

// Find published posts
app.get('/posts/filter/published', async (req, res) => {
	try {
		// Mongoose provides a clean, chainable query API
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
});

// Find posts by author
app.get('/posts/author/:author', async (req, res) => {
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
});

// Search posts by tag
app.get('/posts/tag/:tag', async (req, res) => {
	try {
		// Query arrays with Mongoose
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
			message: 'Error searching post'
		})
	} 
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
	console.log('\n🛑 Shutting down gracefully...');
	await closeDB();
	process.exit(0);
});
