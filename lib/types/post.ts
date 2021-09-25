interface LocalPost {
  type: 'local';
  content: string;
}
interface NotionPost {
  type: 'notion';
  content: any;
}

interface PostCommon {
  path: string;
  slug: string;
  permalink: string;
  createdAt: number;
  title: string;
  content: string;
}

export type Post = PostCommon & (LocalPost | NotionPost);
