import React from 'react';

import getSource from '../lib';
import Layout from '../components/layout';
import PostView from '../components/postView';
import { Post } from '../lib/types/post';
import Sidebar from '../components/sidebar';

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <Layout>
      <Sidebar posts={posts} />
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
      posts,
    },
  };
}
