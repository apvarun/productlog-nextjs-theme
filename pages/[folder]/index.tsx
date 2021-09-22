import React from 'react';
import Layout from '../../components/layout';
import PostView from '../../components/postView';
import Sidebar from '../../components/sidebar';
import getSource from '../../lib';
import { Post } from '../../lib/types/post';
import getFolders from '../../misc/getFolders';

export default function Folder({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Sidebar posts={[]} showBackHome />
      <div className="md:col-span-3">
        {posts.map((post) => (
          <PostView {...post} key={post.slug} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const source = getSource();
  const posts = await source.getAllPosts();

  return {
    props: {
      posts: posts.filter((post) => post.path === `/${params.folder}`),
    },
  };
}

export async function getStaticPaths() {
  const source = getSource();
  const posts = await source.getAllPosts();

  const paths = getFolders(posts);

  return {
    paths: paths.map((path) => ({ params: { folder: path } })),
    fallback: false,
  };
}
