import { Router, Request, Response } from 'express';
import { Author, Book } from '../../models/index.js';

const router = Router();

// GET /api/authors - Get all authors with their books
router.get('/', async (_req: Request, res: Response) => {
  try {
    // include: [Book] tells Sequelize to JOIN with the books table
    // and include the associated book data in the result
    const authors = await Author.findAll({
      include: [Book], // Eager loading - fetches authors AND books in one query
    });
    
    res.json(authors);
  } catch (error) {
    console.error('Error fetching authors:', error);
    res.status(500).json({ error: 'Failed to fetch authors' });
  }
});

// GET /api/authors/:id - Get a specific author with their book
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const author = await Author.findByPk(id, {
      include: [Book], // Include the associated book
    });
    
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    
    res.json(author);
  } catch (error) {
    console.error('Error fetching author:', error);
    res.status(500).json({ error: 'Failed to fetch author' });
  }
});

// POST /api/authors - Create a new author
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      res.status(400).json({ error: 'Name and email are required' });
      return;
    }
    
    const newAuthor = await Author.create({
      name,
      email,
    });
    
    res.status(201).json(newAuthor);
  } catch (error: any) {
    console.error('Error creating author:', error);
    
    // Handle unique constraint violation (duplicate email)
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'Email already exists' });
      return;
    }
    
    res.status(500).json({ error: 'Failed to create author' });
  }
});

// DELETE /api/authors/:id - Delete an author (and their book due to CASCADE)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const author = await Author.findByPk(id);
    
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    
    await author.destroy();
    
    res.json({ message: 'Author deleted successfully' });
  } catch (error) {
    console.error('Error deleting author:', error);
    res.status(500).json({ error: 'Failed to delete author' });
  }
});

export default router;
