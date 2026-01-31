import sequelize from './config/connection.js';
import { Author, Book } from './models/index.js';

// Sample data: Famous programming books and their authors
const seedData = async () => {
  try {
    // Sync database - force: true will drop existing tables and recreate them
    await sequelize.sync({ force: true });
    console.log('✅ Database synced (tables recreated)');

    // Create Authors
    console.log('📝 Creating authors...');
    
    const author1 = await Author.create({
      name: 'Robert C. Martin',
      email: 'uncle.bob@cleancoder.com',
    });

    const author2 = await Author.create({
      name: 'Martin Fowler',
      email: 'martin@martinfowler.com',
    });

    const author3 = await Author.create({
      name: 'Eric Matthes',
      email: 'eric@pythoncrashcourse.com',
    });

    const author4 = await Author.create({
      name: 'Kyle Simpson',
      email: 'kyle@ydkjs.com',
    });

    const author5 = await Author.create({
      name: 'Jon Duckett',
      email: 'jon@htmlandcss.com',
    });

    const author6 = await Author.create({
      name: 'Andrew Hunt',
      email: 'andrew@pragprog.com',
    });

    const author7 = await Author.create({
      name: 'Brian Kernighan',
      email: 'bwk@cs.princeton.edu',
    });

    console.log('✅ Authors created successfully');

    // Create Books associated with Authors
    console.log('📚 Creating books...');

    await Book.create({
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      isbn: '978-0132350884',
      publishedYear: 2008,
      authorId: author1.id,
    });

    await Book.create({
      title: 'Refactoring: Improving the Design of Existing Code',
      isbn: '978-0134757599',
      publishedYear: 2018,
      authorId: author2.id,
    });

    await Book.create({
      title: 'Python Crash Course: A Hands-On, Project-Based Introduction to Programming',
      isbn: '978-1593279288',
      publishedYear: 2019,
      authorId: author3.id,
    });

    await Book.create({
      title: 'You Don\'t Know JS: Scope & Closures',
      isbn: '978-1449335588',
      publishedYear: 2014,
      authorId: author4.id,
    });

    await Book.create({
      title: 'JavaScript & jQuery: Interactive Front-End Web Development',
      isbn: '978-1118531648',
      publishedYear: 2014,
      authorId: author5.id,
    });

    await Book.create({
      title: 'The Pragmatic Programmer: Your Journey to Mastery',
      isbn: '978-0135957059',
      publishedYear: 2019,
      authorId: author6.id,
    });

    await Book.create({
      title: 'The C Programming Language',
      isbn: '978-0131103627',
      publishedYear: 1988,
      authorId: author7.id,
    });

    console.log('✅ Books created successfully');

    // Verify the data with associations
    console.log('\n📊 Verifying data with associations...\n');
    
    const authorsWithBooks = await Author.findAll({
      include: [Book],
    });

    authorsWithBooks.forEach((author: any) => {
      console.log(`👤 ${author.name}`);
      console.log(`   📧 ${author.email}`);
      if (author.Book) {
        console.log(`   📖 Book: "${author.Book.title}" (${author.Book.publishedYear})`);
        console.log(`   📘 ISBN: ${author.Book.isbn}`);
      }
      console.log('');
    });

    console.log('✅ Database seeded successfully!');
    console.log('🚀 You can now run: npm run dev');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
