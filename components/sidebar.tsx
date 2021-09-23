import Link from 'next/link';
import React from 'react';
import { Post } from '../lib/types/post';
import getFolders from '../misc/getFolders';

export default function Sidebar({
  posts,
  showBackHome = false,
}: {
  posts: Post[];
  showBackHome?: boolean;
}) {
  const paths = getFolders(posts);

  return (
    <div className="flex flex-col">
      {showBackHome && (
        <Link href={`/`}>
          <a className="mb-4">← Back home</a>
        </Link>
      )}
      {paths.map((path) => (
        <Link href={`/${path}`} key={path}>
          <a className="text-xl mb-4">{path}</a>
        </Link>
      ))}
    </div>
  );
}
