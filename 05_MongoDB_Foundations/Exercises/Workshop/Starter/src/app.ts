import express, { Application } from 'express';
import { connectDB } from './config/db';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
	res.json({
		message: '📚 Book Club Hub API - Workshop Starter',
		status: 'Starter scaffold ready',
		nextSteps: [
			'Create models in src/models',
			'Create controllers in src/controllers',
			'Create routes in src/routes',
			'Wire routes in app.ts'
		],
		requiredPopulationRoute: 'GET /discussions/populated'
	});
});

app.listen(PORT, () => {
	console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;
