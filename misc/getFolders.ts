import { Post } from '../lib/types/post';

export default function getFolders(posts: Post[]) {
  return Array.from(
    new Set(posts.map((post) => post.path.split('/').filter((p) => !!p)[0]))
  );
}
