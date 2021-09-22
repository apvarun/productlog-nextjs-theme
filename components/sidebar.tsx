import Link from 'next/link';
import React from 'react';
import { Post } from '../lib/types/post';
import getFolders from '../misc/getFolders';

export default function Sidebar({ posts }: { posts: Post[] }) {
  const paths = getFolders(posts);

  return (
    <div>
      {paths.map((path) => (
        <Link href={`/${path}`} key={path}>
          <a className="text-xl">{path}</a>
        </Link>
      ))}
    </div>
  );
}
