export interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  inStock: boolean;
}

export const BOOKS: IBook[] = [
  {
    id: 'book-001',
    title: 'HackHaven Handbook',
    author: 'Knightro',
    genre: 'Tech',
    inStock: true
  },
  {
    id: 'book-002',
    title: 'GraphQL for Builders',
    author: 'Astra',
    genre: 'Tech',
    inStock: false
  },
  {
    id: 'book-003',
    title: 'UCF Dev Journal',
    author: 'Knightro',
    genre: 'Career',
    inStock: true
  }
];
