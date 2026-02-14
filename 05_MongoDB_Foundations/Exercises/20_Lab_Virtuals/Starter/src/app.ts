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
		message: '🛍️ Ecommerce Product Virtuals Lab',
		whatIsVirtual: 'A virtual is a computed field that is not saved in MongoDB.',
		whyUseIt: ['Avoid duplicated derived data', 'Compute display-friendly values'],
		activity: 'Create one Product virtual: priceWithTax',
		routes: {
			'POST /products': 'Create product',
			'GET /products': 'Get all products',
			'GET /products/:id': 'Get one product',
			'DELETE /products/:id': 'Delete product'
		}
	});
});

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
