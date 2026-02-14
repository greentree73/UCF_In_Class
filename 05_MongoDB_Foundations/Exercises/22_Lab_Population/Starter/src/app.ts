import express, { Application } from 'express';
import { connectDB } from './config/db';
import postRoutes from './routes/postRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.use('/posts', postRoutes);

app.get('/', (req, res) => {
	res.json({
		message: '🔗 Population Lab - Hackhaven',
		activity: 'Complete one populate controller and one route',
		routes: {
			'POST /posts/seed': 'Create sample data',
			'GET /posts': 'Get posts without populate',
			'GET /posts/populated-authors': 'Completed example',
			'GET /posts/populated-comment-authors': 'TODO in this lab'
		}
	});
});

app.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});

export default app;
