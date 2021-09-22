import Markdown from 'markdown-to-jsx';
import React from 'react';
import dayjs from 'dayjs';

import { Post } from '../lib/types/post';
import Link from 'next/link';

export default function PostView({ title, content, createdAt, permalink }: Post) {
  const date = dayjs(createdAt || new Date()).format('D MMMM YYYY');

  return (
    <article>
      <Link href={permalink}>
        <a>
          <h2 className="text-3xl font-bold">{title}</h2>
        </a>
      </Link>
      <p className="mt-1 text-sm text-gray-500">{date}</p>
      <Markdown className="prose lg:prose-lg mx-auto max-w-6xl pt-4 pb-8">
        {content}
      </Markdown>
    </article>
  );
}
