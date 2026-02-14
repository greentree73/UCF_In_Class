import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookclub_hub_db';

export const connectDB = async (): Promise<void> => {
	try {
		await mongoose.connect(MONGODB_URI);
		console.log('✅ MongoDB connected to bookclub_hub_db');
		console.log(`📍 Database: ${mongoose.connection.name}`);
	} catch (error) {
		console.error('❌ MongoDB connection error:', error);
		process.exit(1);
	}
};
