import type { Book, CreateBookInput } from './types.js';

let books: Book[] = [];

const createId = () => {
  return `${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
};

export const listBooks = (): Book[] => {
  return [...books];
};

export const createBook = (input: CreateBookInput): Book => {
  const book: Book = {
    id: createId(),
    title: input.title,
    author: input.author,
    releaseYear: input.releaseYear,
    slug: input.slug,
  };

  books = [book, ...books];
  return book;
};

export const clearBooks = (): boolean => {
  books = [];
  return true;
};
