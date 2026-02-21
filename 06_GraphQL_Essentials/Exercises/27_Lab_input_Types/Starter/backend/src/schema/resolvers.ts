import Greeting from '../models/Greeting.js';

export const resolvers = {
  Query: {
    latestGreeting: async () => {
      return Greeting.findOne().sort({ createdAt: -1 }).lean();
    },
  },
  Mutation: {
    createGreeting: async (_parent: unknown, args: { input: { name: string } }) => {
      const cleanName = args.input.name.trim();
      const greeting = await Greeting.create({
        name: cleanName,
        message: `Hello, ${cleanName}!`,
      });

      return greeting;
    },
  },
  Greeting: {
    id: (greeting: { _id: { toString: () => string } }) => greeting._id.toString(),
    createdAt: (greeting: { createdAt: Date }) => new Date(greeting.createdAt).toISOString(),
  },
};
