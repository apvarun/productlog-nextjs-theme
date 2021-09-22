import { Post } from './post';

export interface Source {
  getAllPosts: () => Promise<Post[]>;
  getPost: (slug: string) => Promise<Post | undefined>;
  getPostsCount: () => Promise<number>;
}
