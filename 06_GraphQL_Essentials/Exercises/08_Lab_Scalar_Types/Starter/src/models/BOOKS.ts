export interface IBook {
  id: string;
  title: string;
  author: string;
  pageCount: number;
  inStock: boolean;
  price: number;
}

export const BOOKS: IBook[] = [
  {
    id: 'book-001',
    title: 'HackHaven Handbook',
    author: 'Knightro',
    pageCount: 320,
    inStock: true,
    price: 29.99
  },
  {
    id: 'book-002',
    title: 'GraphQL for Builders',
    author: 'Astra',
    pageCount: 214,
    inStock: false,
    price: 24.5
  }
];
