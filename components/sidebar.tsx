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
        <Link href={`/`} className="mb-4">
          ← Back home
        </Link>
      )}
      {paths.map((path, i) => (
        <Link href={`/${path}`} key={i + path} className="text-xl mb-4">
          {path}
        </Link>
      ))}
    </div>
  );
}
