export type Book = {
  id: string;
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};

export type CreateBookInput = {
  title: string;
  author: string;
  releaseYear: number;
  slug: string;
};
