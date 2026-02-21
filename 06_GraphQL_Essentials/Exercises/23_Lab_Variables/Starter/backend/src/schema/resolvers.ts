export const resolvers = {
  Query: {
    greeting: (_parent: unknown, args: { name: string }) => `Hello, ${args.name}!`,
  },
};
