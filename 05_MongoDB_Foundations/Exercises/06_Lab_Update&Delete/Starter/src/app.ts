import express from 'express';
// We will use the official MongoDB Node.js driver to connect to our database
// ObjectId is used to convert string IDs to MongoDB's ObjectId type for querying
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
		// Connect to the database and fetch products
		const db = await connect();
		// We limit to 100 products for simplicity
		// Querying the 'products' collection and converting the cursor to an array for easier handling.
		const docs = await db.collection('products').find().limit(100).toArray();
		// Send the retrieved documents as a JSON response to the client.
		res.json(docs);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error fetching products' });
	}
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
	try {
		// Connect to the database and fetch a single product by its ID
		const db = await connect();
		const id = req.params.id;
		// We use ObjectId to convert the string ID from the URL into a MongoDB ObjectId type for querying.
		// The 'findOne' method is used to retrieve a single document that matches the specified criteria (in this case, the _id field).
		const doc = await db.collection('products').findOne({ _id: new ObjectId(id) } as any);
		if (!doc) return res.status(404).json({ message: 'Not found' });
		res.json(doc);
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
			{ name: 'Wireless Headphones', description: 'Noise-cancelling over-ear headphones', price: 89.99, category: 'Electronics', stock: 45, tags: ['audio', 'wireless'], createdAt: new Date() },
			{ name: 'Coffee Mug', description: 'Ceramic mug with UCF Knights logo', price: 12.99, category: 'Accessories', stock: 120, tags: ['drinkware', 'ucf'], createdAt: new Date() },
			{ name: 'Laptop Stand', description: 'Adjustable aluminum laptop stand', price: 34.99, category: 'Electronics', stock: 67, tags: ['accessories', 'workspace'], createdAt: new Date() },
			{ name: 'Water Bottle', description: 'Insulated stainless steel water bottle', price: 24.99, category: 'Accessories', stock: 200, tags: ['drinkware', 'sports'], createdAt: new Date() },
		];
		const result = await db.collection('products').insertMany(sample as any);
		const inserted = await db.collection('products').find({ _id: { $in: Object.values(result.insertedIds) } as any }).toArray();
		res.json({ insertedCount: result.insertedCount, inserted });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error seeding products' });
	}
});

// ============================================
// UPDATE OPERATIONS - STUDENT ACTIVITY
// ============================================

// ACTIVITY 1: Update a product's price and stock
app.put('/products/:id', async (req, res) => {
	try {
		// TODO: Connect to the database using the connect() function
		
		// TODO: Get the 'id' parameter from the request URL
		// Hint: Use req.params.id
		
		// TODO: Get the 'price' and 'stock' from the request body
		// Hint: Use destructuring const { price, stock } = req.body
		
		// TODO: Use updateOne() to update the product
		// Hint: Filter by _id using new ObjectId(id)
		// Hint: Use $set operator to update price, stock, and add updatedAt field
		
		// TODO: Check if a document was matched (matchedCount)
		// If matchedCount is 0, return 404 status with message 'Product not found'
		
		// TODO: Send a JSON response with success message and counts
		// Include: message, matched count, and modified count
		
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error updating product' });
	}
});


// ACTIVITY 2: Add a tag to a product
app.post('/products/:id/tags', async (req, res) => {
	try {
		// TODO: Connect to the database
		
		// TODO: Get the 'id' parameter from the URL
		
		// TODO: Get the 'tag' from the request body
		// Hint: const { tag } = req.body
		
		// TODO: Use updateOne() with $addToSet operator
		// Hint: $addToSet adds to array only if value doesn't already exist
		// Hint: { $addToSet: { tags: tag } }
		// This prevents duplicate tags
		
		// TODO: Check if the product was found (matchedCount === 0)
		// If not found, return 404 with message 'Product not found'
		
		// TODO: Send JSON response with success message
		// Note: modifiedCount will be 0 if tag already existed
		
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error adding tag' });
	}
});

// ============================================
// DELETE OPERATIONS - STUDENT ACTIVITY
// ============================================

// ACTIVITY 3: Delete a product by ID
app.delete('/products/:id', async (req, res) => {
	try {
		// TODO: Connect to the database
		
		// TODO: Get the 'id' parameter from the URL
		
		// TODO: Use deleteOne() to remove the product
		// Hint: Filter by _id using new ObjectId(id)
		// Hint: deleteOne returns an object with deletedCount
		
		// TODO: Check if a document was deleted (deletedCount === 0)
		// If deletedCount is 0, return 404 with message 'Product not found'
		
		// TODO: Send JSON response with success message and deletedCount
		
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error deleting product' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});


