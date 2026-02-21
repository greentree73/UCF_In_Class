import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

export const resolvers = {
  Query: {
    // ToDo: Fix the `me` resolver :
    // `context` is in the 3rd resolver argument, not the 2nd.
    // Remember the arguments are: (_parent, _args, context)
    me: async (_parent: any, context: any) => {
      return context.user || null;
    },
  },
  Mutation: {
    register: async (_parent: any, args: { username: string; email: string; password: string }) => {
      const existing = await User.findOne({ email: args.email }).lean();
      if (existing) {
        throw new Error('Email already in use');
      }

      const passwordHash = bcrypt.hashSync(args.password, 10);
      const user = await User.create({
        username: args.username.trim(),
        email: args.email.trim().toLowerCase(),
        password: passwordHash,
      });

      const token = jwt.sign(
        { id: user._id.toString(), username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      };
    },

    login: async (_parent: any, args: { email: string; password: string }) => {
      const user = await User.findOne({ email: args.email.trim().toLowerCase() });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const valid = bcrypt.compareSync(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { id: user._id.toString(), username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      return {
        token,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
        },
      };
    },
  },
};
