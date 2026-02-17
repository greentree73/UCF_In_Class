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
      return context.user || null;
    }
  },
  Mutation: {
    register: async (_: any, { username, email, password }: any) => {
      const hash = bcrypt.hashSync(password, 10);
      const user = await User.create({ username, email, password: hash } as any);
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user: { id: user._id, username: user.username, email: user.email } };
    },
    login: async (_: any, { email, password }: any) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error('Invalid credentials');
      const ok = bcrypt.compareSync(password, (user as any).passwordHash);
      if (!ok) throw new Error('Invalid credentials');
      const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
      return { token, user: { id: user._id, username: user.username, email: user.email } };
    },
    createQuestion: async (_: any, { title, body }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');
      const q = await Question.create({ title, body, userId: context.user.id } as any);
      return q;
    },
    createAnswer: async (_: any, { questionId, body }: any, context: any) => {
      if (!context.user) throw new Error('Unauthorized');
      const a = await Answer.create({ body, questionId, userId: context.user.id } as any);
      return a;
    }
  }
};