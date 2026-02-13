import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// TODO: Explain what these constants do and why we use environment variables
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.MONGO_DB || 'Ecommerce';

// TODO: Explain what this function does and what Promise<void> means
export const connectDB = async (): Promise<void> => {
	try {
		// TODO: Explain what mongoose.connect() does and how the connection string is formatted
		await mongoose.connect(`${MONGO_URL}/${DB_NAME}`);
		console.log(`✅ Connected to MongoDB: ${DB_NAME}`);
	} catch (error) {
		// TODO: Explain what happens in the catch block and why we use process.exit(1)
		console.error('❌ MongoDB connection error:', error);
		process.exit(1);
	}
};

// TODO: Explain why we need a closeDB function and when it gets called
export const closeDB = async (): Promise<void> => {
	// TODO: Explain what mongoose.connection.close() does
	await mongoose.connection.close();
	console.log('✅ MongoDB connection closed');
};
