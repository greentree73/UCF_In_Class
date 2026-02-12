import express from 'express';
import { connectDB, closeDB } from './config/db';
import productRoutes from './routes/productRoutes';

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

app.use(express.json());

// ============================================
// DATABASE CONNECTION
// ============================================

connectDB();

// ============================================
// ROUTES
// ============================================

app.get('/', (req, res) => {
	res.json({ 
		message: 'Mongoose CRUD Lab - Product Management API',
		database: 'Ecommerce',
		version: '1.0.0',
		endpoints: {
			'POST /products': 'Create a new product',
			'GET /products': 'Get all products',
			'GET /products/:id': 'Get a product by ID',
			'PUT /products/:id': 'Update a product by ID',
			'DELETE /products/:id': 'Delete a product by ID',
			'GET /products/filter/instock': 'Get in-stock products',
			'GET /products/category/:category': 'Get products by category',
			'PUT /products/category/:category/update': 'Update first product in category (TODO)'
		}
	});
});

app.use('/products', productRoutes);

// ============================================
// SERVER
// ============================================

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`🚀 Server running on port ${PORT}`);
	console.log(`📝 API Documentation: http://localhost:${PORT}`);
});

// ============================================
// GRACEFUL SHUTDOWN
// ============================================

process.on('SIGINT', async () => {
	console.log('\n🛑 Shutting down gracefully...');
	await closeDB();
	process.exit(0);
});
