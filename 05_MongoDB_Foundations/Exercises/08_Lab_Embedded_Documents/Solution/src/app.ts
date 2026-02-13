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

// List all products with embedded documents
app.get('/products', async (req, res) => {
	try {
		const db = await connect();
		const docs = await db.collection('products').find().limit(100).toArray();
		res.json(docs);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error fetching products' });
	}
});

// Get a single product by ID
app.get('/products/:id', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const doc = await db.collection('products').findOne({ _id: new ObjectId(id) } as any);
		if (!doc) return res.status(404).json({ message: 'Product not found' });
		res.json(doc);
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Invalid id or error' });
	}
});

// Seed sample products with embedded documents
app.post('/products/seed', async (req, res) => {
	try {
		const db = await connect();
		const sample = [
			{
				name: 'Wireless Mouse',
				description: 'Ergonomic wireless mouse with USB receiver',
				price: 24.99,
				category: 'Electronics',
				stock: 150,
				tags: ['wireless', 'mouse', 'ergonomic'],
				manufacturer: {
					name: 'TechCorp',
					location: 'San Francisco, CA',
					website: 'techcorp.com',
					founded: 2010
				},
				specs: {
					dpi: '1600',
					buttons: 5,
					battery: 'AA',
					connectivity: 'USB 2.4GHz'
				},
				reviews: [
					{
						rating: 5,
						comment: 'Very comfortable for long use!',
						reviewer: 'alice',
						verified: true,
						date: new Date('2026-01-10')
					}
				],
				createdAt: new Date()
			},
			{
				name: 'Mechanical Keyboard',
				description: 'RGB backlit mechanical gaming keyboard',
				price: 89.99,
				category: 'Electronics',
				stock: 75,
				tags: ['keyboard', 'mechanical', 'rgb', 'gaming'],
				manufacturer: {
					name: 'GameGear',
					location: 'Austin, TX',
					website: 'gamegear.com',
					founded: 2015
				},
				specs: {
					switchType: 'Cherry MX Blue',
					backlight: 'RGB',
					keys: 104,
					connectivity: 'USB-C'
				},
				reviews: [
					{
						rating: 4,
						comment: 'Great keyboard, a bit loud',
						reviewer: 'bob',
						verified: true,
						date: new Date('2026-01-15')
					},
					{
						rating: 5,
						comment: 'Perfect for gaming!',
						reviewer: 'carol',
						verified: true,
						date: new Date('2026-01-20')
					}
				],
				createdAt: new Date()
			},
			{
				name: 'USB-C Cable',
				description: '6ft braided USB-C charging cable',
				price: 12.99,
				category: 'Accessories',
				stock: 300,
				tags: ['cable', 'usb-c', 'charging'],
				manufacturer: {
					name: 'ConnectTech',
					location: 'Seattle, WA',
					website: 'connecttech.com',
					founded: 2018
				},
				specs: {
					length: '6ft',
					material: 'Braided Nylon',
					powerDelivery: '60W',
					connector: 'USB-C to USB-C'
				},
				reviews: [],
				createdAt: new Date()
			}
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
// STUDENT ACTIVITIES
// ============================================

// Activity 1: Update a product's embedded manufacturer subdocument
// PUT /products/:id/manufacturer
app.put('/products/:id/manufacturer', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const { name, location, website, founded } = req.body;

		// SOLUTION: Use updateOne with $set to replace the entire manufacturer subdocument
		// The $set operator updates or creates the specified fields
		// Here we're replacing the entire manufacturer object with new values
		const result = await db.collection('products').updateOne(
			{ _id: new ObjectId(id) },  // Filter: find product by ID
			{ 
				$set: { 
					manufacturer: {  // Replace entire manufacturer object
						name,
						location,
						website,
						founded
					}
				} 
			}
		);

		// Check if the product was found
		// matchedCount tells us if a document matched the filter
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Product not found' });
		}

		// modifiedCount tells us if the document was actually changed
		// It will be 0 if the new data is identical to the existing data
		res.json({ 
			message: 'Manufacturer updated',
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error updating manufacturer' });
	}
});

// Activity 2: Delete a review from a product's reviews array
// DELETE /products/:id/reviews/:reviewer
app.delete('/products/:id/reviews/:reviewer', async (req, res) => {
	try {
		const db = await connect();
		const id = req.params.id;
		const reviewer = req.params.reviewer;

		// SOLUTION: Use updateOne with $pull to remove matching reviews from the array
		// The $pull operator removes all array elements that match the condition
		// In this case, we're removing reviews where the reviewer field matches
		const result = await db.collection('products').updateOne(
			{ _id: new ObjectId(id) },  // Filter: find product by ID
			{ 
				$pull: { 
					reviews: { reviewer: reviewer }  // Remove reviews matching this reviewer
				} 
			}
		);

		// Check if the product was found
		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Product not found' });
		}

		// modifiedCount will be 0 if no review matched the reviewer name
		// This could mean the reviewer doesn't have a review on this product
		res.json({ 
			message: `Review by ${reviewer} removed`,
			modified: result.modifiedCount
		});
	} catch (err) {
		console.error(err);
		res.status(400).json({ message: 'Error deleting review' });
	}
});

// Activity 3: Get products by manufacturer name (embedded subdocument property)
// GET /products/manufacturer/:name
app.get('/products/manufacturer/:name', async (req, res) => {
	try {
		const db = await connect();
		const manufacturerName = req.params.name;

		// SOLUTION: Use find() with dot notation to query embedded fields
		// Dot notation allows us to access nested fields within subdocuments
		// The field path must be in quotes when using dot notation
		const products = await db.collection('products').find({
			"manufacturer.name": manufacturerName  // Query the name field inside manufacturer
		}).toArray();

		// Return the results with count and manufacturer info
		// This provides useful context to the client
		res.json({ 
			manufacturer: manufacturerName,
			count: products.length,
			products 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error querying products' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});


