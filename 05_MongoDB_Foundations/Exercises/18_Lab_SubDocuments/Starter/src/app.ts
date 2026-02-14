import express, { Application } from 'express';
import { connectDB } from './config/db';
import productRoutes from './routes/productRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/products', productRoutes);

app.get('/', (req, res) => {
	res.json({
		message: '🛒 Ecommerce Products API - Subdocuments Lab',
		description: 'Practice adding review subdocuments to products',
		endpoints: {
			'POST /products': 'Create product',
			'GET /products': 'Get all products',
			'GET /products/:id': 'Get product by id',
			'GET /products/:id/reviews': 'Get all reviews for a product',
			'POST /products/:id/reviews': 'TODO in this lab: add review subdocument',
			'DELETE /products/:id': 'Delete product'
		}
	});
});

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
