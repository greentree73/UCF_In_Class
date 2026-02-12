import express from 'express';
// We will use the official MongoDB Node.js driver to connect to our database
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});

