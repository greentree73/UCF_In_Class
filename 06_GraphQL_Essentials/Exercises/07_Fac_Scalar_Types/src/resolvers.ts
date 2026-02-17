import { HACKHAVEN_DB } from './models/POST';

export const resolvers = {
  Query: {
    postScalars: (_parent: unknown, args: { id: string }) => {
      return HACKHAVEN_DB.posts.find((post) => post.id === args.id) || null;
    }
  },
  Mutation: {
    updatePostState: (
      _parent: unknown,
      args: { id: string; rating: number; published: boolean }
    ) => {
      const post = HACKHAVEN_DB.posts.find((entry) => entry.id === args.id);
      if (!post) {
        return null;
      }

      post.rating = args.rating;
      post.published = args.published;
      return post;
    }
  }
};
