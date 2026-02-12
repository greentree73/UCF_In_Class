import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'Hackhaven';

export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);
		console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
	} catch (error) {
		console.error('❌ MongoDB connection error:', error);
		process.exit(1);
	}
};

// Handle graceful shutdown
export const closeDB = async (): Promise<void> => {
	await mongoose.connection.close();
	console.log('✅ MongoDB connection closed');
};
