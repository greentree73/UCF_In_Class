import express from 'express';
// We will use the official MongoDB Node.js driver to connect to our database
// ObjectId is used to convert string IDs to MongoDB's ObjectId type for querying
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
// MongoDb runs on 27017
// Hackhaven is the name of the database we will use
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'Hackhaven';

const app = express();

app.use(express.json());

let client: MongoClient;
// Connect to MongoDB and return the database instance
// We use a singleton pattern here to reuse the same client across requests
async function connect() {
	if (!client) {
		client = new MongoClient(MONGO_URL);
		await client.connect();
		console.log('Connected to MongoDB at', MONGO_URL);
	}
	return client.db(DB_NAME);
}

app.get('/', (req, res) => res.json({ status: 'ok', db: DB_NAME }));

// ============================================
// DEMONSTRATING EMBEDDED DOCUMENTS
// ============================================

// List all posts (with embedded author profile and comments)
app.get('/posts', async (req, res) => {
	try {
		const db = await connect();
		// Posts contain embedded documents (author profile, metadata)
		// and embedded arrays (comments, tags)
		const docs = await db.collection('posts').find().limit(100).toArray();
		res.json(docs);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error fetching posts' });
	}
});

// Query featured posts
app.get('/posts/featured', async (req, res) => {
	try {
		const db = await connect();
		
		// Query embedded document field: matches posts marked as featured
		const posts = await db.collection('posts').find({
			"metadata.featured":true
		}).toArray();
		
		res.json({ 
			message: 'Featured posts',
			count: posts.length,
			posts 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error querying posts' });
	}
});

// Get a single post with all embedded data
app.get('/posts/:id', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const doc = await db.collection('posts').findOne({ _id: new ObjectId(id) } as any);
		if (!doc) return res.status(404).json({ message: 'Not found' });
		res.json(doc);
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Invalid id or error' });
	}
});

// Seed sample posts with embedded documents
app.post('/posts/seed', async (req, res) => {
	try {
		const db = await connect();
		const sample = [
			{
				title: 'Introduction to MongoDB Embedded Documents',
				body: 'Learn how to model complex data structures using embedded documents in MongoDB.',
				category: 'Tutorial',
				tags: ['mongodb', 'database', 'nosql'],
				// EMBEDDED DOCUMENT: Single object containing author profile
				author: {
					username: 'alice',
					email: 'alice@hackhaven.dev',
					bio: 'Database enthusiast and MongoDB expert',
					joinedDate: new Date('2025-01-15')
				},
				// EMBEDDED DOCUMENT: Single object containing post metadata
				metadata: {
					views: 1250,
					likes: 45,
					readTime: '5 min',
					featured: true
				},
				// EMBEDDED ARRAY OF DOCUMENTS: Multiple comment objects
				comments: [
					{
						text: 'Great tutorial! Very helpful.',
						commenter: 'bob',
						email: 'bob@hackhaven.dev',
						verified: true,
						date: new Date('2026-01-20')
					},
					{
						text: 'Thanks for sharing this!',
						commenter: 'carol',
						email: 'carol@hackhaven.dev',
						verified: true,
						date: new Date('2026-01-22')
					}
				],
				createdAt: new Date('2026-01-15')
			},
			{
				title: 'Advanced MongoDB Queries',
				body: 'Deep dive into complex query patterns and aggregation pipelines.',
				category: 'Advanced',
				tags: ['mongodb', 'queries', 'aggregation'],
				author: {
					username: 'bob',
					email: 'bob@hackhaven.dev',
					bio: 'Full-stack developer specializing in data architecture',
					joinedDate: new Date('2025-03-10')
				},
				metadata: {
					views: 890,
					likes: 32,
					readTime: '8 min',
					featured: false
				},
				comments: [
					{
						text: 'The aggregation examples are excellent!',
						commenter: 'alice',
						email: 'alice@hackhaven.dev',
						verified: true,
						date: new Date('2026-02-02')
					}
				],
				createdAt: new Date('2026-02-01')
			},
			{
				title: 'Building RESTful APIs with Node.js',
				body: 'A comprehensive guide to creating REST APIs using Express and MongoDB.',
				category: 'Tutorial',
				tags: ['nodejs', 'express', 'api', 'rest'],
				author: {
					username: 'carol',
					email: 'carol@hackhaven.dev',
					bio: 'Backend engineer passionate about API design',
					joinedDate: new Date('2025-06-20')
				},
				metadata: {
					views: 2100,
					likes: 78,
					readTime: '12 min',
					featured: true
				},
				comments: [],  // No comments yet
				createdAt: new Date('2026-02-05')
			}
		];
		
		const result = await db.collection('posts').insertMany(sample as any);
		const inserted = await db.collection('posts').find({ _id: { $in: Object.values(result.insertedIds) } as any }).toArray();
		res.json({ insertedCount: result.insertedCount, inserted });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error seeding posts' });
	}
});

// ============================================
// QUERYING EMBEDDED DOCUMENTS
// ============================================

// Query posts by embedded author username using dot notation
app.get('/posts/author/:username', async (req, res) => {
	try {
		const db = await connect();
		const username = req.params.username;
		
		// Use dot notation to query nested fields
		// Quotes are required around the field path
		const posts = await db.collection('posts').find({
			"author.username": username
		}).toArray();
		
		res.json({ 
			author: username,
			count: posts.length,
			posts 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error querying posts' });
	}
});

// Query posts by specific commenter
app.get('/posts/commenter/:name', async (req, res) => {
	try {
		const db = await connect();
		const commenter = req.params.name;
		
		// Query embedded array by nested field
		const posts = await db.collection('posts').find({
			"comments.commenter": commenter
		}).toArray();
		
		res.json({ 
			commenter,
			count: posts.length,
			posts 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error querying posts' });
	}
});

// ============================================
// UPDATING EMBEDDED DOCUMENTS
// ============================================

// Update a specific field in an embedded document
app.put('/posts/:id/author/bio', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const { bio } = req.body;
		
		// Use dot notation with $set to update nested field
		// Only updates author.bio, leaves other author fields untouched
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ $set: { "author.bio": bio } }
		);
		
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}
		
		res.json({ 
			message: 'Author bio updated',
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error updating post' });
	}
});

// Update entire embedded document (replaces all fields)
app.put('/posts/:id/author', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const { username, email, bio, joinedDate } = req.body;
		
		// Replacing the entire author object
		// This will remove any fields not included in the update
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ 
				$set: { 
					author: {
						username,
						email,
						bio,
						joinedDate: new Date(joinedDate)
					}
				} 
			}
		);
		
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}
		
		res.json({ 
			message: 'Author updated',
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error updating author' });
	}
});

// ============================================
// WORKING WITH EMBEDDED ARRAYS
// ============================================

// Add a comment to the post's comments array
app.post('/posts/:id/comments', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const { text, commenter, email, verified } = req.body;
		
		// Use $push to add a new embedded document to the array
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ 
				$push: { 
					comments: {
						text,
						commenter,
						email,
						verified: verified || false,
						date: new Date()
					}
				} 
			}
		);
		
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}
		
		res.json({ 
			message: 'Comment added successfully',
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error adding comment' });
	}
});

// Update a specific comment using the positional $ operator
app.put('/posts/:id/comments/:commenter/verify', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const commenter = req.params.commenter;
		
		// The $ positional operator identifies the first array element that matches the query
		// Query must include the array field to use $
		const result = await db.collection('posts').updateOne(
			{ 
				_id: new ObjectId(id),
				"comments.commenter": commenter  // Required for $ operator
			},
			{ 
				$set: { 
					"comments.$.verified": true  // $ refers to matched array element
				} 
			}
		);
		
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post or commenter not found' });
		}
		
		res.json({ 
			message: `Comment by ${commenter} marked as verified`,
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error updating comment' });
	}
});

// Remove a comment from the embedded array
app.delete('/posts/:id/comments/:commenter', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const commenter = req.params.commenter;
		
		// Use $pull to remove elements matching the condition
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ 
				$pull: { 
					comments: { commenter: commenter }
				} 
			}
		);
		
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}
		
		res.json({ 
			message: `Comment by ${commenter} removed`,
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error removing comment' });
	}
});

// Remove unverified comments
app.delete('/posts/:id/comments/unverified', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		
		// $pull can use conditions to remove multiple matching elements
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ 
				$pull: { 
					comments: { verified: false }  // Remove unverified comments
				} 
			}
		);
		
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}
		
		res.json({ 
			message: 'Unverified comments removed',
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error removing comments' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});


