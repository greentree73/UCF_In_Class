import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express4';
import mongoose from 'mongoose';
import { typeDefs } from './schema';
import { Post } from './models/POST';

const app = express();
const PORT = Number(process.env.PORT || 4002);
const MONGO_URL = process.env.MONGO_URL || '';

const seedPostId = new mongoose.Types.ObjectId('64f0c7a1b6a7f41111111111');

const fallbackPosts = [
  {
    _id: seedPostId,
    title: 'Welcome to HackHaven',
    content: 'HackHaven is where developers gather to share builds and ideas.',
    author: 'Knightro',
    tags: ['hackhaven', 'sdl', 'graphql'],
    published: true,
    views: 42,
    createdAt: new Date('2026-02-15T12:00:00.000Z')
  }
];

async function getPostById(id: string) {
  if (mongoose.connection.readyState === 1) {
    return Post.findById(id);
  }

  return fallbackPosts.find((post) => post._id.toString() === id) || null;
}

const resolvers = {
  Query: {
    postCard: async (_parent: unknown, args: { id: string }) => {
      const post = await getPostById(args.id);
      if (!post) {
        return null;
      }

      return {
        id: post._id.toString(),
        title: post.title,
        author: post.author
      };
    },
    post: async (_parent: unknown, args: { id: string }) => {
      const post = await getPostById(args.id);
      if (!post) {
        return null;
      }

      return {
        id: post._id.toString(),
        title: post.title,
        content: post.content,
        author: post.author,
        tags: post.tags,
        published: post.published,
        views: post.views,
        createdAt: new Date(post.createdAt).toISOString()
      };
    }
  },
  Mutation: {
    createPost: async (
      _parent: unknown,
      args: { input: { title: string; content: string; author: string } }
    ) => {
      const payload = {
        title: args.input.title,
        content: args.input.content,
        author: args.input.author,
        tags: ['hackhaven', 'sdl-basics'],
        published: false,
        views: 0,
        createdAt: new Date()
      };

      if (mongoose.connection.readyState === 1) {
        const created = await Post.create(payload);

        return {
          id: created._id.toString(),
          title: created.title,
          content: created.content,
          author: created.author,
          tags: created.tags,
          published: created.published,
          views: created.views,
          createdAt: created.createdAt.toISOString()
        };
      }

      const created = {
        _id: new mongoose.Types.ObjectId(),
        ...payload
      };

      fallbackPosts.push(created);

      return {
        id: created._id.toString(),
        title: created.title,
        content: created.content,
        author: created.author,
        tags: created.tags,
        published: created.published,
        views: created.views,
        createdAt: created.createdAt.toISOString()
      };
    }
  }
};

async function connectIfConfigured() {
  if (!MONGO_URL) {
    console.log('No MONGO_URL set. Running with in-memory HackHaven fallback data.');
    return;
  }

  await mongoose.connect(MONGO_URL, { dbName: 'hackhaven' });
  console.log('Connected to HackHaven MongoDB.');
}

async function start() {
  await connectIfConfigured();

  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use('/graphql', express.json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`SDL basics server running at http://localhost:${PORT}/graphql`);
    console.log(`Try seed id: ${seedPostId.toString()}`);
  });
}

start().catch((error) => {
  console.error('Failed to start SDL basics server:', error);
  process.exit(1);
});
