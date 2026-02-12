import express, { Application } from 'express';
import { connectDB } from './config/db';
import productRoutes from './routes/productRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/products', productRoutes);

// Root route
app.get('/', (req, res) => {
	res.json({ 
		message: 'Product Instance Methods Lab API',
		endpoints: {
			'POST /products': 'Create a new product',
			'GET /products': 'Get all products',
			'GET /products/:id': 'Get a single product',
			'PUT /products/:id/discount': '💰 Apply discount (instance method)',
			'GET /products/:id/stock-check': '📦 Check stock level (instance method)',
			'PUT /products/:id/restock': '📈 Restock product (instance method)',
			'DELETE /products/:id': 'Delete a product'
		},
		note: 'Complete the instance methods in src/models/PRODUCT.ts to make this API work!'
	});
});

// Start server
app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
