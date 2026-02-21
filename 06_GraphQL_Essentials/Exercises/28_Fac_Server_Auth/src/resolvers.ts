import { User, Question, Answer } from './models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';

export const resolvers = {
  Query: {
    questions: async () => {
      return Question.find().populate('userId').lean();
    },
    question: async (_: any, { id }: any) => {
      return Question.findById(id).populate('userId').lean();
    },
    me: async (_: any, __: any, context: any) => {
      // `me` demonstrates context-based auth.
      // context.user is attached in src/index.ts after JWT verification.
      return context.user || null;
    }
  },
  Mutation: {
    register: async (_: any, { username, email, password }: any) => {
      // Register flow:
      // 1) hash raw password
      // 2) create user document
      // 3) sign JWT containing user identity
      // 4) return token + safe user fields
      const hash = bcrypt.hashSync(password, 10);
      const user = await User.create({ username, email, password: hash } as any);
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user: { id: user._id, username: user.username, email: user.email } };
    },
    login: async (_: any, { email, password }: any) => {
      // Login flow:
      // 1) find user by unique identifier (email)
      // 2) compare submitted password with stored hash
      // 3) if valid, sign and return fresh JWT
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');
      const ok = bcrypt.compareSync(password, (user as any).password);
      if (!ok) throw new Error('Invalid credentials');
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user: { id: user._id, username: user.username, email: user.email } };
    },
    createQuestion: async (_: any, { title, body }: any, context: any) => {
      // Protected resolver: user must be authenticated in context.
      if (!context.user) throw new Error('Unauthorized');
      const q = await Question.create({ title, body, userId: context.user.id } as any);
      return q;
    },
    createAnswer: async (_: any, { questionId, body }: any, context: any) => {
      // Same context-based authorization pattern.
      if (!context.user) throw new Error('Unauthorized');
      const a = await Answer.create({ body, questionId, userId: context.user.id } as any);
      return a;
    }
  }
};