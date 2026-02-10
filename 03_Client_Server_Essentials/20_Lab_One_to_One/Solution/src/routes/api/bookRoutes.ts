import { Router, Request, Response } from 'express';
import { Author, Book } from '../../models/index.js';

const router = Router();

// GET /api/books - Get all books with their authors
router.get('/', async (_req: Request, res: Response) => {
  try {
    // include: [Author] tells Sequelize to JOIN with the authors table
    // and include the associated author data in the result
    const books = await Book.findAll({
      include: [Author], // Eager loading - fetches books AND authors in one query
    });
    
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET /api/books/:id - Get a specific book with its author
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findByPk(id, {
      include: [Author], // Include the associated author
    });
    
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    
    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// POST /api/books - Create a new book
router.post('/', async (req: Request, res: Response) => {
  try {
    const { title, isbn, publishedYear, authorId } = req.body;
    
    if (!title || !isbn || !authorId) {
      res.status(400).json({ error: 'Title, ISBN, and authorId are required' });
      return;
    }
    
    // Verify the author exists
    const author = await Author.findByPk(authorId);
    if (!author) {
      res.status(404).json({ error: 'Author not found' });
      return;
    }
    
    const newBook = await Book.create({
      title,
      isbn,
      publishedYear,
      authorId,
    });
    
    // Fetch the book with the author included
    const bookWithAuthor = await Book.findByPk(newBook.id, {
      include: [Author],
    });
    
    res.status(201).json(bookWithAuthor);
  } catch (error: any) {
    console.error('Error creating book:', error);
    
    // Handle unique constraint violation (duplicate ISBN)
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).json({ error: 'ISBN already exists' });
      return;
    }
    
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findByPk(id);
    
    if (!book) {
      res.status(404).json({ error: 'Book not found' });
      return;
    }
    
    await book.destroy();
    
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

export default router;
