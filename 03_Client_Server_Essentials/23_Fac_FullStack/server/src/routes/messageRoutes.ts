import { Router, Request, Response } from 'express';
import Message from '../models/Message.js';

const router = Router();

// GET /api/messages - Get all messages
router.get('/', async (_req: Request, res: Response) => {
  try {
    const messages = await Message.findAll({
      order: [['createdAt', 'DESC']], // Most recent first
    });
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/messages - Create a new message
router.post('/', async (req: Request, res: Response) => {
  try {
    const { username, content } = req.body;

    // Validate input
    if (!username || !content) {
      res.status(400).json({ error: 'Username and content are required' });
      return;
    }

    // Create new message
    const newMessage = await Message.create({
      username,
      content,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

export default router;
