import dotenv from 'dotenv';

dotenv.config();

export const config = {
  mongoUri: process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/tdd_week07_capstone_starter',
  port: Number(process.env.PORT ?? 4000),
};
