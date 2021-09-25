import { Post } from '../types/post';
import { Source } from '../types/source';
import getConfig from '../utils/getConfig';

interface NotionPost {
  createdAt: string;
  id: string;
  slug: string;
  title: string;
  year: number;
}

const getNotionPosts = async (id) => {
  const notionPosts: NotionPost[] = await fetch(
    `https://notion-api.splitbee.io/v1/table/${id}`
  ).then((res) => res.json());

  const processedPosts: Post[] = [];

  for (let i = 0; i < notionPosts.length; i++) {
    const { year, slug, createdAt, title, id } = notionPosts[i];

    const blocks = await fetch(
      `https://notion-api.splitbee.io/v1/page/${id}`
    ).then((res) => res.json());

    processedPosts.push({
      type: 'notion',
      path: `/${year}`,
      permalink: `/${year}/${slug}`,
      slug,
      createdAt: new Date(createdAt).getTime(),
      title,
      content: blocks,
    });
  }

  return processedPosts;
};

export function getNotionSource(): Source {
  let posts: Post[] = [];
  let postsFetched = false;

  const fetchPostsIfRequired = async () => {
    if (postsFetched) {
      return;
    }

    const config = getConfig();

    if (config) {
      posts = await getNotionPosts(config.data.name);
    }

    postsFetched = true;
  };

  const getAllPosts = async () => {
    await fetchPostsIfRequired();

    return posts;
  };

  const getPost = async (slug: string) => {
    await fetchPostsIfRequired();

    return posts.find((post) => `${post.path}/${post.slug}` === slug);
  };

  const getPostsCount = async () => {
    await fetchPostsIfRequired();

    return posts.length;
  };

  return {
    getAllPosts,
    getPost,
    getPostsCount,
  };
}
