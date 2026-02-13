import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'Hackhaven';

const app = express();
app.use(express.json());

let client: MongoClient;

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
// SEED DATA
// ============================================

app.post('/posts/seed', async (req, res) => {
	try {
		const db = await connect();
		const sample = [
			{
				title: 'Introduction to MongoDB Cursors',
				body: 'Learn how to efficiently iterate through query results using MongoDB cursors.',
				author: { username: 'alice', email: 'alice@hackhaven.dev' },
				category: 'Tutorial',
				tags: ['mongodb', 'cursors', 'performance'],
				metadata: { views: 1250, likes: 45, featured: true },
				createdAt: new Date('2026-01-15')
			},
			{
				title: 'Advanced Query Optimization',
				body: 'Deep dive into query performance and index usage.',
				author: { username: 'bob', email: 'bob@hackhaven.dev' },
				category: 'Advanced',
				tags: ['mongodb', 'performance', 'indexes'],
				metadata: { views: 890, likes: 32, featured: false },
				createdAt: new Date('2026-01-18')
			},
			{
				title: 'Building RESTful APIs with Node.js',
				body: 'Comprehensive guide to creating REST APIs using Express and MongoDB.',
				author: { username: 'carol', email: 'carol@hackhaven.dev' },
				category: 'Tutorial',
				tags: ['nodejs', 'express', 'api'],
				metadata: { views: 2100, likes: 78, featured: true },
				createdAt: new Date('2026-01-20')
			},
			{
				title: 'Data Modeling Best Practices',
				body: 'Learn how to design efficient MongoDB schemas.',
				author: { username: 'alice', email: 'alice@hackhaven.dev' },
				category: 'Tutorial',
				tags: ['mongodb', 'schema', 'design'],
				metadata: { views: 1500, likes: 56, featured: true },
				createdAt: new Date('2026-01-22')
			},
			{
				title: 'Aggregation Pipeline Mastery',
				body: 'Master complex data transformations with aggregation.',
				author: { username: 'bob', email: 'bob@hackhaven.dev' },
				category: 'Advanced',
				tags: ['mongodb', 'aggregation', 'pipeline'],
				metadata: { views: 750, likes: 28, featured: false },
				createdAt: new Date('2026-01-25')
			},
			{
				title: 'Working with Embedded Documents',
				body: 'Understanding when and how to use embedded documents.',
				author: { username: 'carol', email: 'carol@hackhaven.dev' },
				category: 'Intermediate',
				tags: ['mongodb', 'embedded', 'documents'],
				metadata: { views: 980, likes: 41, featured: false },
				createdAt: new Date('2026-01-28')
			},
			{
				title: 'MongoDB Atlas Setup Guide',
				body: 'Step-by-step guide to deploying MongoDB in the cloud.',
				author: { username: 'alice', email: 'alice@hackhaven.dev' },
				category: 'Tutorial',
				tags: ['mongodb', 'atlas', 'cloud'],
				metadata: { views: 1800, likes: 65, featured: true },
				createdAt: new Date('2026-02-01')
			},
			{
				title: 'Real-time Data with Change Streams',
				body: 'Implement real-time features using MongoDB change streams.',
				author: { username: 'bob', email: 'bob@hackhaven.dev' },
				category: 'Advanced',
				tags: ['mongodb', 'realtime', 'streams'],
				metadata: { views: 620, likes: 19, featured: false },
				createdAt: new Date('2026-02-03')
			}
		];
		
		const result = await db.collection('posts').insertMany(sample as any);
		res.json({ 
			message: 'Sample posts seeded successfully',
			insertedCount: result.insertedCount 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error seeding posts' });
	}
});

// ============================================
// CURSOR METHODS - BASIC ITERATION
// ============================================

// Using .toArray() - Most common approach (loads all into memory)
app.get('/cursor/toarray', async (req, res) => {
	try {
		const db = await connect();
		
		// find() returns a cursor, toArray() converts it to an array
		// ⚠️ Be careful with large datasets - loads everything into memory
		const posts = await db.collection('posts')
			.find()
			.limit(5)
			.toArray();
		
		res.json({ 
			method: 'toArray()',
			count: posts.length,
			posts 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error with cursor' });
	}
});

// Using .forEach() - Memory efficient for large datasets
app.get('/cursor/foreach', async (req, res) => {
	try {
		const db = await connect();
		const cursor = db.collection('posts').find().limit(5);
		
		// Process documents one at a time without loading all into memory
		const results: any[] = [];
		await cursor.forEach(doc => {
			// This callback runs for each document
			results.push({
				title: doc.title,
				author: doc.author.username
			});
		});
		
		res.json({ 
			method: 'forEach()',
			count: results.length,
			posts: results 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error with cursor' });
	}
});

// Using .next() and .hasNext() - Manual iteration  
app.get('/cursor/manual', async (req, res) => {
	try {
		const db = await connect();
		const cursor = db.collection('posts').find().limit(3);
		
		const results: any[] = [];
		
		// Manually iterate through cursor
		while (await cursor.hasNext()) {
			const doc = await cursor.next();
			if (doc) {
				results.push({
					title: doc.title,
					views: doc.metadata.views
				});
			}
		}
		
		await cursor.close();  // Always close cursor when done
		
		res.json({ 
			method: 'next() and hasNext()',
			count: results.length,
			posts: results 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error with cursor' });
	}
});

// ============================================
// CURSOR METHODS - TRANSFORMATION
// ============================================

// Using .sort() - Sort results
app.get('/cursor/sort', async (req, res) => {
	try {
		const db = await connect();
		
		// Sort by views (descending) then by title (ascending)
		const posts = await db.collection('posts')
			.find()
			.sort({ 'metadata.views': -1, title: 1 })  // -1 = descending, 1 = ascending
			.limit(5)
			.toArray();
		
		res.json({ 
			method: 'sort()',
			sorted: 'by views (desc) then title (asc)',
			count: posts.length,
			posts: posts.map(p => ({
				title: p.title,
				views: p.metadata.views
			}))
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error sorting' });
	}
});

// Using .limit() and .skip() - Pagination
app.get('/cursor/paginate', async (req, res) => {
	try {
		const db = await connect();
		const page = parseInt(req.query.page as string) || 1;
		const pageSize = parseInt(req.query.pageSize as string) || 3;
		
		// Calculate skip value for pagination
		const skip = (page - 1) * pageSize;
		
		// Get total count for pagination metadata
		const total = await db.collection('posts').countDocuments();
		
		// Apply pagination
		const posts = await db.collection('posts')
			.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(pageSize)
			.toArray();
		
		res.json({ 
			method: 'skip() and limit()',
			pagination: {
				page,
				pageSize,
				total,
				totalPages: Math.ceil(total / pageSize)
			},
			posts: posts.map(p => ({
				title: p.title,
				author: p.author.username
			}))
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error with pagination' });
	}
});

// Using .project() - Select specific fields
app.get('/cursor/project', async (req, res) => {
	try {
		const db = await connect();
		
		// Project only specific fields (reduces data transfer)
		const posts = await db.collection('posts')
			.find()
			.project({ 
				title: 1, 
				'author.username': 1,  // Embedded field projection
				'metadata.views': 1,
				_id: 0  // Exclude _id field
			})
			.limit(5)
			.toArray();
		
		res.json({ 
			method: 'project()',
			description: 'Returns only selected fields',
			count: posts.length,
			posts 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error with projection' });
	}
});

// ============================================
// CURSOR METHODS - AGGREGATION
// ============================================

// Using .count() - Get count without retrieving documents
app.get('/cursor/count', async (req, res) => {
	try {
		const db = await connect();
		
		// Count all posts
		const totalPosts = await db.collection('posts').countDocuments();
		
		// Count posts by category
		const tutorials = await db.collection('posts').countDocuments({ category: 'Tutorial' });
		const advanced = await db.collection('posts').countDocuments({ category: 'Advanced' });
		
		// Count featured posts
		const featured = await db.collection('posts').countDocuments({ 'metadata.featured': true });
		
		res.json({ 
			method: 'countDocuments()',
			counts: {
				total: totalPosts,
				byCategory: { tutorials, advanced },
				featured
			}
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error counting' });
	}
});

// Stream processing for large datasets
app.get('/cursor/stream', async (req, res) => {
	try {
		const db = await connect();
		const cursor = db.collection('posts').find();
		
		// Set headers for streaming response
		res.setHeader('Content-Type', 'application/json');
		res.write('[');
		
		let isFirst = true;
		
		// Stream documents one by one  
		await cursor.forEach(doc => {
			if (!isFirst) res.write(',');
			res.write(JSON.stringify({
				title: doc.title,
				author: doc.author.username
			}));
			isFirst = false;
		});
		
		res.write(']');
		res.end();
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error streaming' });
	}
});

// ============================================
// CURSOR METHODS - COMPLEX QUERIES
// ============================================

// Combining multiple cursor methods
app.get('/cursor/complex', async (req, res) => {
	try {
		const db = await connect();
		
		// Chain multiple cursor methods for complex queries
		const posts = await db.collection('posts')
			.find({ category: 'Tutorial' })  // Filter
			.sort({ 'metadata.views': -1 })   // Sort by popularity
			.skip(0)                            // Pagination
			.limit(3)                           // Limit results
			.project({                          // Select fields
				title: 1,
				'author.username': 1,
				'metadata.views': 1,
				'metadata.likes': 1,
				_id: 0
			})
			.toArray();
		
		res.json({ 
			method: 'Chained cursor methods',
			query: 'Top 3 Tutorial posts by views',
			posts 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error with complex query' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB Cursor Methods server listening on ${PORT}`));
