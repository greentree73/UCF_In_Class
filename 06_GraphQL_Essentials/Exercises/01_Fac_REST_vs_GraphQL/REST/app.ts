import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3001;

const hackHavenPost = {
  id: 'post-001',
  title: 'Welcome to HackHaven',
  content: 'HackHaven is where developers gather to share builds and ideas.',
  author: 'Knightro',
  tags: ['hackhaven', 'rest', 'graphql'],
  published: true,
  views: 42,
  createdAt: '2026-02-15T12:00:00.000Z'
};

app.get('/api/post', (_req: Request, res: Response) => {
  res.json(hackHavenPost);
});

app.listen(PORT, () => {
  console.log(`REST API running at http://localhost:${PORT}/api/post`);
});
