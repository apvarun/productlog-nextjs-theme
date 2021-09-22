import React from 'react';
import Layout from '../../components/layout';
import PostView from '../../components/postView';
import Sidebar from '../../components/sidebar';
import getSource from '../../lib';

export default function Change({ post }) {
  return (
    <Layout>
      <Sidebar posts={[]} showBackHome />
      <div className="md:col-span-3">
        <PostView {...post} key={post.slug} />
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params: { folder, slug } }) {
  const source = getSource();
  const post = await source.getPost(`/${folder}/${slug}`);

  return {
    props: {
      post: post,
    },
  };
}

export async function getStaticPaths() {
  const source = getSource();
  const posts = await source.getAllPosts();

  return {
    paths: posts.map((post) => ({
      params: { folder: post.path.slice(1), slug: post.slug },
    })),
    fallback: false,
  };
}
