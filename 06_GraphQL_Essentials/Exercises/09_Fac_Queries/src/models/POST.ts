export interface IPost {
  id: string;
  title: string;
  content: string;
  author: string;
  views: number;
  published: boolean;
}

export const HACKHAVEN_DB: { posts: IPost[] } = {
  posts: [
    {
      id: 'post-001',
      title: 'Welcome to HackHaven',
      content: 'HackHaven is where builders share progress and feedback.',
      author: 'Knightro',
      views: 42,
      published: true
    },
    {
      id: 'post-002',
      title: 'GraphQL Query Patterns',
      content: 'Define clear query names and use arguments for filtering.',
      author: 'Astra',
      views: 18,
      published: false
    },
    {
      id: 'post-003',
      title: 'UCF Dev Updates',
      content: 'Weekly session notes and resources for learners.',
      author: 'Knightro',
      views: 31,
      published: true
    }
  ]
};
