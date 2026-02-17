import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User, Question } from './models';

dotenv.config();

const MONGO = process.env.MONGO_URL || 'mongodb://localhost:27017/hackhaven_graphql';

async function run() {
  await mongoose.connect(MONGO);
  console.log('Connected to MongoDB', MONGO);

  // clean
  await User.deleteMany({});
  await Question.deleteMany({});

  const passwordHash = bcrypt.hashSync('password', 10);
  const user = new User({ username: 'demo', password: passwordHash });
  await user.save();

  const q = new Question({ title: 'Welcome', body: 'This is a seeded question', author: user._id });
  await q.save();

  console.log('Seeded user demo / password and one question');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
