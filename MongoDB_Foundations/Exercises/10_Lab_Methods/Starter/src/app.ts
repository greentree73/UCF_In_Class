import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'ecommerce';

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

app.post('/products/seed', async (req, res) => {
	try {
		const db = await connect();
		const sample = [
			{
				name: 'Wireless Bluetooth Headphones',
				description: 'Premium noise-canceling headphones with 30-hour battery life',
				category: 'Electronics',
				price: 149.99,
				stock: 45,
				rating: 4.5,
				brand: 'AudioTech',
				inStock: true,
				tags: ['audio', 'wireless', 'bluetooth'],
				createdAt: new Date('2026-01-10')
			},
			{
				name: 'Ergonomic Office Chair',
				description: 'Adjustable lumbar support with breathable mesh back',
				category: 'Furniture',
				price: 299.99,
				stock: 12,
				rating: 4.7,
				brand: 'ComfortPlus',
				inStock: true,
				tags: ['office', 'furniture', 'ergonomic'],
				createdAt: new Date('2026-01-12')
			},
			{
				name: 'Stainless Steel Water Bottle',
				description: 'Insulated 32oz bottle keeps drinks cold for 24 hours',
				category: 'Home & Kitchen',
				price: 24.99,
				stock: 150,
				rating: 4.8,
				brand: 'HydroFlow',
				inStock: true,
				tags: ['kitchen', 'insulated', 'eco-friendly'],
				createdAt: new Date('2026-01-15')
			},
			{
				name: 'Mechanical Gaming Keyboard',
				description: 'RGB backlit keyboard with Cherry MX switches',
				category: 'Electronics',
				price: 129.99,
				stock: 0,
				rating: 4.6,
				brand: 'GameMaster',
				inStock: false,
				tags: ['gaming', 'keyboard', 'rgb'],
				createdAt: new Date('2026-01-18')
			},
			{
				name: 'Yoga Mat Premium',
				description: 'Extra thick 6mm non-slip exercise mat with carrying strap',
				category: 'Sports & Outdoors',
				price: 39.99,
				stock: 75,
				rating: 4.4,
				brand: 'FitLife',
				inStock: true,
				tags: ['yoga', 'fitness', 'exercise'],
				createdAt: new Date('2026-01-20')
			},
			{
				name: 'Smart Watch Pro',
				description: 'Fitness tracker with heart rate monitor and GPS',
				category: 'Electronics',
				price: 249.99,
				stock: 30,
				rating: 4.3,
				brand: 'TechWear',
				inStock: true,
				tags: ['fitness', 'smartwatch', 'wearable'],
				createdAt: new Date('2026-01-22')
			},
			{
				name: 'Coffee Maker Deluxe',
				description: 'Programmable 12-cup drip coffee maker with thermal carafe',
				category: 'Home & Kitchen',
				price: 89.99,
				stock: 22,
				rating: 4.5,
				brand: 'BrewMaster',
				inStock: true,
				tags: ['coffee', 'kitchen', 'appliance'],
				createdAt: new Date('2026-01-25')
			},
			{
				name: 'Running Shoes Ultra',
				description: 'Lightweight cushioned running shoes with breathable mesh',
				category: 'Sports & Outdoors',
				price: 119.99,
				stock: 60,
				rating: 4.6,
				brand: 'RunFast',
				inStock: true,
				tags: ['running', 'shoes', 'athletic'],
				createdAt: new Date('2026-01-28')
			},
			{
				name: 'LED Desk Lamp',
				description: 'Adjustable brightness desk lamp with USB charging port',
				category: 'Furniture',
				price: 34.99,
				stock: 0,
				rating: 4.2,
				brand: 'BrightLight',
				inStock: false,
				tags: ['lighting', 'office', 'led'],
				createdAt: new Date('2026-02-01')
			},
			{
				name: 'Backpack Travel Pro',
				description: 'Water-resistant laptop backpack with anti-theft zippers',
				category: 'Bags & Luggage',
				price: 79.99,
				stock: 40,
				rating: 4.7,
				brand: 'TravelGear',
				inStock: true,
				tags: ['travel', 'backpack', 'laptop'],
				createdAt: new Date('2026-02-03')
			},
			{
				name: 'Wireless Mouse Precision',
				description: 'Ergonomic wireless mouse with programmable buttons',
				category: 'Electronics',
				price: 29.99,
				stock: 85,
				rating: 4.4,
				brand: 'TechGear',
				inStock: true,
				tags: ['mouse', 'wireless', 'ergonomic'],
				createdAt: new Date('2026-02-05')
			},
			{
				name: 'Portable Bluetooth Speaker',
				description: 'Waterproof speaker with 12-hour battery life',
				category: 'Electronics',
				price: 59.99,
				stock: 55,
				rating: 4.5,
				brand: 'SoundWave',
				inStock: true,
				tags: ['audio', 'bluetooth', 'waterproof'],
				createdAt: new Date('2026-02-06')
			}
		];
		
		const result = await db.collection('products').insertMany(sample as any);
		res.json({ 
			message: 'Sample products seeded successfully',
			insertedCount: result.insertedCount 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error seeding products' });
	}
});

// Get all products (basic example - already complete)
app.get('/products', async (req, res) => {
	try {
		const db = await connect();
		const products = await db.collection('products')
			.find()
			.limit(20)
			.toArray();
		
		res.json({ 
			count: products.length,
			products 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error fetching products' });
	}
});

// ============================================
// TODO: COMPLETE THE FOLLOWING ROUTES
// ============================================

// TODO #1: Sort products by price
// Route: GET /products/sort
// Goal: Return products sorted by price (lowest to highest)
// Hint: Use the .sort() cursor method
// Documentation: https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#sort
app.get('/products/sort', async (req, res) => {
	try {
		const db = await connect();
		
		// TODO: Complete this query
		// 1. Query the 'products' collection
		// 2. Use .sort() to sort by price in ascending order (1 = ascending, -1 = descending)
		// 3. Convert the cursor to an array using .toArray()
		
		const products = [] // Replace this line with your query
		
		res.json({ 
			message: 'Products sorted by price',
			count: products.length,
			products 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error sorting products' });
	}
});

// TODO #2: Get specific product fields only
// Route: GET /products/fields
// Goal: Return only name, price, and rating fields (exclude _id)
// Hint: Use the .project() cursor method
// Documentation: https://mongodb.github.io/node-mongodb-native/6.0/classes/FindCursor.html#project
app.get('/products/fields', async (req, res) => {
	try {
		const db = await connect();
		
		// TODO: Complete this query
		// 1. Query the 'products' collection
		// 2. Use .project() to select only: name, price, and rating
		// 3. Exclude _id by setting it to 0 in the projection
		// 4. Limit results to 10 products
		// 5. Convert to array
		
		const products = [] // Replace this line with your query
		
		res.json({ 
			message: 'Product fields (name, price, rating only)',
			count: products.length,
			products 
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error projecting fields' });
	}
});

// TODO #3: Count products by category
// Route: GET /products/count/:category
// Goal: Return the count of products in a specific category
// Hint: Use .countDocuments() method
// Documentation: https://www.mongodb.com/docs/drivers/node/current/usage-examples/count/
app.get('/products/count/:category', async (req, res) => {
	try {
		const db = await connect();
		const category = req.params.category;
		
		// TODO: Complete this query
		// 1. Use countDocuments() on the 'products' collection
		// 2. Pass a filter object to match the category parameter
		// 3. Store the result in a variable called 'count'
		
		const count = 0; // Replace this line with your query
		
		res.json({ 
			category,
			count
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Error counting products' });
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`E-commerce API server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});

