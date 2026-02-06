import Author from './Author.js';
import Book from './Book.js';

// ============================================
// DEFINE ASSOCIATIONS HERE
// ============================================
// This is the KEY file for understanding Sequelize associations!
// We import both models FIRST, then define how they relate to each other.

/**
 * ONE-TO-ONE ASSOCIATION
 * 
 * In this example:
 * - One Author has one Book
 * - One Book belongs to one Author
 * 
 * The Book model contains the foreign key 'authorId' that references
 * the Author model's primary key 'id'.
 */

// Author has one Book
// This adds a virtual property to Author instances: author.getBook()
Author.hasOne(Book, {
  foreignKey: 'authorId',  // Column name in the Book table
  onDelete: 'CASCADE',     // If an author is deleted, delete their book too
});

// Book belongs to Author
// This adds a virtual property to Book instances: book.getAuthor()
Book.belongsTo(Author, {
  foreignKey: 'authorId',  // Must match the foreignKey in hasOne
});

/**
 * UNDERSTANDING THE ASSOCIATION METHODS:
 * 
 * hasOne() - Defines the "parent" or "owner" side
 * - Used on the model that "owns" the relationship
 * - In one-to-one, this is somewhat arbitrary
 * - Creates getter/setter methods on Author instances
 * 
 * belongsTo() - Defines the side with the foreign key
 * - Used on the model that contains the reference
 * - Book has the authorId column, so Book belongsTo Author
 * - Creates getter/setter methods on Book instances
 * 
 * foreignKey - The column name that stores the reference
 * - Must be the same in both hasOne and belongsTo
 * - This column exists in the Book table
 * 
 * onDelete: 'CASCADE' - Referential integrity
 * - If an Author is deleted, automatically delete their Book
 * - Other options: 'SET NULL', 'RESTRICT', 'NO ACTION'
 */

/**
 * VIRTUAL METHODS CREATED BY ASSOCIATIONS:
 * 
 * On Author instances:
 * - author.getBook() - Get the associated book
 * - author.setBook(book) - Set the associated book
 * - author.createBook(data) - Create and associate a new book
 * 
 * On Book instances:
 * - book.getAuthor() - Get the associated author
 * - book.setAuthor(author) - Set the associated author
 * - book.createAuthor(data) - Create and associate a new author
 */

// Export both models with associations established
export { Author, Book };
