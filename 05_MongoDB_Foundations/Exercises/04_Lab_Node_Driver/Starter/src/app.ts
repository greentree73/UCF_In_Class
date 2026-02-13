import express from 'express';
// We will use the official MongoDB Node.js driver to connect to our database
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
// MongoDb runs on 27017
// EcommerceDB is the name of the database we will use
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'EcommerceDB';

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

// List products
app.get('/products', async (req, res) => {
	try {
		// TODO: Connect to the database using the connect() function
		
		// TODO: Query the 'products' collection using .find()
		// Hint: Limit the results to 100 documents
		// Hint: Convert the cursor to an array using .toArray()
		
		// TODO: Send the array of products as a JSON response
		
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error fetching products' });
	}
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
	try {
		// TODO: Connect to the database using the connect() function
		
		// TODO: Get the 'id' parameter from the request
		// Hint: Use req.params.id
		
		// TODO: Convert the string ID to a MongoDB ObjectId
		// Hint: Use new ObjectId(id)
		
		// TODO: Query the 'products' collection using .findOne() with the ObjectId
		// Hint: Query format is { _id: new ObjectId(id) } as any
		
		// TODO: Check if the product was found. If not, return 404 status
		// Hint: if (!doc) return res.status(404).json({ message: 'Not found' });
		
		// TODO: Send the product document as a JSON response
		
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Invalid id or error' });
	}
});

// Seed some sample products
app.post('/products/seed', async (req, res) => {
	try {
		const db = await connect();
		const sample = [
			{ name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones', price: 89.99, category: 'Electronics', stock: 45, createdAt: new Date() },
			{ name: 'Coffee Mug', description: 'Ceramic mug with UCF Knights logo', price: 12.99, category: 'Accessories', stock: 120, createdAt: new Date() },
			{ name: 'Laptop Stand', description: 'Adjustable aluminum laptop stand', price: 34.99, category: 'Electronics', stock: 67, createdAt: new Date() },
		];
		const result = await db.collection('products').insertMany(sample as any);
		const inserted = await db.collection('products').find({ _id: { $in: Object.values(result.insertedIds) } as any }).toArray();
		res.json({ insertedCount: result.insertedCount, inserted });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error seeding products' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});

