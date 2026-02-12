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

// List posts
app.get('/posts', async (req, res) => {
	try {
		// Connect to the database and fetch posts
		const db = await connect();
		// We limit to 100 posts for simplicity
		// Querying the 'posts' collection and converting the cursor to an array for easier handling.
		const docs = await db.collection('posts').find().limit(100).toArray();
		// Send the retrieved documents as a JSON response to the client.
		res.json(docs);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error fetching posts' });
	}
});

// 
app.get('/posts/:id', async (req, res) => {
	try {
		// Connect to the database and fetch a single post by its ID
		const db = await connect();
		const id = req.params.id;
		// We use ObjectId to convert the string ID from the URL into a MongoDB ObjectId type for querying.
		// The 'findOne' method is used to retrieve a single document that matches the specified criteria (in this case, the _id field).
		const doc = await db.collection('posts').findOne({ _id: new ObjectId(id) } as any);
		if (!doc) return res.status(404).json({ message: 'Not found' });
		res.json(doc);
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Invalid id or error' });
	}
});

// Seed some sample posts
app.post('/posts/seed', async (req, res) => {
	try {
		const db = await connect();
		const sample = [
			{ title: 'Seeding MongoDB', body: 'This is a seeded post', author: 'alice', tags: ['seed', 'intro'], createdAt: new Date() },
			{ title: 'Querying with Node', body: 'Using the mongodb driver to query', author: 'bob', tags: ['driver', 'node'], createdAt: new Date() },
			{ title: 'Compass demo', body: 'Inspect this using MongoDB Compass', author: 'carol', tags: ['compass'], createdAt: new Date() },
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
// UPDATE OPERATIONS
// ============================================

// Update a single post - specific fields only using $set
// Update and return the updated document
app.put('/posts/:id', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const { title, body } = req.body;

		// updateOne modifies the first document matching the filter
		// $set operator updates only specified fields without affecting others
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ 
				$set: { 
					title, 
					body,
					updatedAt: new Date()  // Track when the update happened
				},
				 
			},
			{ returnDocument: 'after' }  // Return the updated document
		);

		// matchedCount tells us if a document was found
		// modifiedCount tells us if changes were actually made
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}

		res.json({ 
			message: 'Post updated',
			matched: result.matchedCount,
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error updating post' });
	}
});


// Add a tag to a post using $push
app.post('/posts/:id/tags', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const { tag } = req.body;

		// $addToSet adds to array *-only if the value doesn't already exist
		// This prevents duplicate tags
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ $addToSet: { tags: tag } }
		);

		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}

		res.json({ 
			message: 'Tag added',
			modified: result.modifiedCount  // Will be 0 if tag already existed
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error adding tag' });
	}
});

// Remove a tag from a post using $pull
app.delete('/posts/:id/tags/:tag', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const tag = req.params.tag;

		// $pull removes all instances of a value from an array
		const result = await db.collection('posts').updateOne(
			{ _id: new ObjectId(id) },
			{ $pull: { tags: tag } }
		);

		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}

		res.json({ 
			message: 'Tag removed',
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error removing tag' });
	}
});

// Update multiple posts at once - change author name across all posts
app.put('/posts/author/:oldName/:newName', async (req, res) => {
	try {
		const db = await connect();
		const { oldName, newName } = req.params;

		// updateMany updates ALL documents matching the filter
		// Use with caution! Always ensure your filter is correct
		const result = await db.collection('posts').updateMany(
			{ author: oldName },  // Filter: all posts by this author
			{ $set: { author: newName } }  // Update: change author name
		);

		res.json({ 
			message: `Updated author from ${oldName} to ${newName}`,
			matched: result.matchedCount,
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error updating posts' });
	}
});

// ============================================
// DELETE OPERATIONS
// ============================================

// Delete a single post by ID
app.delete('/posts/:id', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;

		// deleteOne removes the first document matching the filter
		// Returns deletedCount (0 if not found, 1 if deleted)
		const result = await db.collection('posts').deleteOne(
			{ _id: new ObjectId(id) }
		);

		if (result.deletedCount === 0) {
			return res.status(404).json({ message: 'Post not found' });
		}

		res.json({ 
			message: 'Post deleted successfully',
			deletedCount: result.deletedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error deleting post' });
	}
});

// Delete and return the deleted document
app.post('/posts/:id/archive', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;

		// findOneAndDelete removes the document and returns it
		// Useful when you need to log what was deleted or move it elsewhere
		const deleted = await db.collection('posts').findOneAndDelete(
			{ _id: new ObjectId(id) }
		);

		if (!deleted) {
			return res.status(404).json({ message: 'Post not found' });
		}

		// In a real app, you might save this to an 'archived_posts' collection
		res.json({ 
			message: 'Post archived',
			deletedPost: deleted
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error archiving post' });
	}
});

// Delete all posts by a specific author
app.delete('/posts/author/:author', async (req, res) => {
	try {
		const db = await connect();
		const author = req.params.author;

		// deleteMany removes ALL documents matching the filter
		// ⚠️ CAUTION: This can delete many documents at once!
		// Always test your filter carefully
		const result = await db.collection('posts').deleteMany(
			{ author: author }
		);

		res.json({ 
			message: `Deleted all posts by ${author}`,
			deletedCount: result.deletedCount
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error deleting posts' });
	}
});

// Delete all posts with a specific tag
app.delete('/posts/tags/:tag', async (req, res) => {
	try {
		const db = await connect();
		const tag = req.params.tag;

		// Delete all posts that have this tag in their tags array
		const result = await db.collection('posts').deleteMany(
			{ tags: tag }  // Matches if array contains the value
		);

		res.json({ 
			message: `Deleted ${result.deletedCount} posts with tag '${tag}'`,
			deletedCount: result.deletedCount
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error deleting posts' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});


