import express from 'express';
// We will use the official MongoDB Node.js driver to connect to our database
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
// MongoDb runs on 27017
// Hackhaven is the name of the database we will use
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'E-CommerceDB';

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
app.get("/products", async (req, res) => {
  try {
    // TODO: Connect to the database using the connect() function
    const db = await connect();

    // TODO: Query the 'products' collection using .find()
    // Hint: Limit the results to 100 documents
    const docs = await db.collection("products").find().limit(100).toArray();

    // Hint: Convert the cursor to an array using .toArray()
    // TODO: Send the array of products as a JSON response
	res.json(docs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching products" });
  }
});

// 
app.get("/products/:id", async (req, res) => {
  try {
    // TODO: Connect to the database using the connect() function
	const db = await connect();

    // TODO: Validate the 'id' parameter to ensure it's a valid ObjectId
   // ObjectId.isValid()
    // TODO: If the 'id' is not valid, return 400 status
	const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid id" });
    // TODO: Get the 'id' parameter from the request
    // TODO: Convert the string ID to a MongoDB ObjectId
    const idObj = new ObjectId(id);

    // TODO: Query the 'products' collection using.findOne() with the ObjectId
	// Hint: Query format is { _id: new ObjectId(id) } as any
	const doc = await db.collection("products").findOne({ _id: idObj });

    if (!doc) 
		return res.status(404).json({ message: 'Not found' });
    // TODO: Send the product document as a JSON response
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching product" });
  }
  
  
});

// Seed some sample posts
app.post("/products/seed", async (req, res) => {
  try {
    const db = await connect();
    const sample = [
      {
        name: "Wireless Headphones",
        description: "Noise-cancelling over-ear headphones",
        price: 89.99,
        category: "Electronics",
        stock: 45,
        createdAt: new Date(),
      },
      {
        name: "Coffee Mug",
        description: "Ceramic mug with UCF Knights logo",
        price: 12.99,
        category: "Accessories",
        stock: 120,
        createdAt: new Date(),
      },
      {
        name: "Laptop Stand",
        description: "Adjustable aluminum laptop stand",
        price: 34.99,
        category: "Electronics",
        stock: 67,
        createdAt: new Date(),
      },
    ];
    const result = await db.collection("products").insertMany(sample as any);
    const inserted = await db
      .collection("products")
      .find({ _id: { $in: Object.values(result.insertedIds) } as any })
      .toArray();
    res.json({ insertedCount: result.insertedCount, inserted });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error seeding products" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`MongoDB server listening on ${PORT}`));

process.on('SIGINT', async () => {
	console.log('Shutting down...');
	if (client) await client.close();
	process.exit(0);
});

