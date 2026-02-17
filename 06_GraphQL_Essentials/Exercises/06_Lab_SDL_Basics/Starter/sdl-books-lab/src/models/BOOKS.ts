export interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  inStock: boolean;
  createdAt: string;
}

export const BOOKS: IBook[] = [
  {
    id: 'book-001',
    title: 'HackHaven Handbook',
    author: 'Knightro',
    genre: 'Tech',
    publishedYear: 2024,
    inStock: true,
    createdAt: '2026-02-15T12:00:00.000Z'
  },
  {
    id: 'book-002',
    title: 'GraphQL for Builders',
    author: 'Astra',
    genre: 'Tech',
    publishedYear: 2025,
    inStock: false,
    createdAt: '2026-02-15T12:05:00.000Z'
  }
];
