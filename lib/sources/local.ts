import { promises as fsPromises } from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { Post } from '../types/post';
import { Source } from '../types/source';
import getConfig from '../utils/getConfig';

const getAllFiles = async (dir: string, basePath: string) => {
  const markdownFiles = await fsPromises.readdir(dir, { withFileTypes: true });

  const postList: Post[] = [];

  for (let i = 0; i < markdownFiles.length; i++) {
    if (markdownFiles[i].isDirectory()) {
      postList.push(
        ...(await getAllFiles(path.join(dir, markdownFiles[i].name), basePath))
      );
      continue;
    }

    const postPath = dir.replace(basePath, '');
    const slug = markdownFiles[i].name.replace(/.md$/, '');

    const contentStr = await fsPromises.readFile(
      `${dir}/${markdownFiles[i].name}`,
      'utf8'
    );

    const { content, data: frontmatter } = matter(contentStr);

    const createdAt = new Date(frontmatter?.createdAt).getTime();
    const title = slug.replace('-', ' ');

    postList.push({
      type: 'local',
      path: postPath,
      slug: frontmatter?.slug || slug,
      permalink: frontmatter?.slug || postPath + '/' + slug,
      createdAt,
      title: frontmatter?.title || title,
      content,
    });
  }

  return postList.sort((post1, post2) => post2.createdAt - post1.createdAt);
};

export function getLocalSource(): Source {
  let posts: Post[] = [];
  let postsFetched = false;

  const fetchPostsIfRequired = async () => {
    if (postsFetched) {
      return;
    }

    const config = getConfig();

    if (config) {
      const basePath = path.join(process.cwd(), config.data.name);
      posts = await getAllFiles(basePath, basePath);
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
