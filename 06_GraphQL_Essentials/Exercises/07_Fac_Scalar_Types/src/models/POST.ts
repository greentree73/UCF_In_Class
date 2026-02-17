export interface IPost {
  id: string;
  title: string;
  content: string;
  views: number;
  published: boolean;
  rating: number;
}

export const HACKHAVEN_DB: { posts: IPost[] } = {
  posts: [
    {
      id: 'post-001',
      title: 'Welcome to HackHaven',
      content: 'HackHaven is where builders share their progress.',
      views: 42,
      published: true,
      rating: 4.7
    },
    {
      id: 'post-002',
      title: 'GraphQL at UCF',
      content: 'Scalars make API contracts predictable for teams.',
      views: 18,
      published: false,
      rating: 4.2
    }
  ]
};
