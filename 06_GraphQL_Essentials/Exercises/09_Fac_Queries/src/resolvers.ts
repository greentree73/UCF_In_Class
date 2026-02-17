import { HACKHAVEN_DB } from './models/POST';

export const resolvers = {
  Query: {
    post: (_parent: unknown, args: { id: string }) => {
      return HACKHAVEN_DB.posts.find((post) => post.id === args.id) || null;
    },
    postsByPublished: (_parent: unknown, args: { published: boolean }) => {
      return HACKHAVEN_DB.posts.filter((post) => post.published === args.published);
    }
  }
};
