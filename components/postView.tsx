import Markdown from 'markdown-to-jsx';
import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/cjs/styles/hljs';


import { Post } from '../lib/types/post';
import MarkdownImage from './markdown/image';

export default function PostView({
  title,
  content,
  createdAt,
  permalink,
}: Post) {
  const date = dayjs(createdAt || new Date()).format('D MMMM YYYY');

  return (
    <article>
      <Link href={permalink}>
        <a>
          <h2 className="text-3xl font-bold hover:underline">{title}</h2>
        </a>
      </Link>
      <p className="mt-1 text-sm text-gray-500">{date}</p>
      <Markdown
        options={{
          overrides: {
            img: {
              component: MarkdownImage,
            },
            p: {
              component: ({ children, ...props }) => {
                const ParaComponent =
                  children[0]?.type === MarkdownImage ? 'div' : 'p';

                return <ParaComponent {...props}>{children}</ParaComponent>;
              },
            },
            pre: {
              component: ({ children, ...props }) => (
                <p {...props}>{children}</p>
              ),
            },
            code: {
              component: ({ className, children }) => {
                const language = (className || '').replace('lang-', '');

                return (
                  <SyntaxHighlighter language={language} style={obsidian}>
                    {children}
                  </SyntaxHighlighter>
                );
              },
            },
          },
        }}
        className="prose lg:prose-lg mx-auto max-w-6xl pt-4 pb-8"
      >
        {content}
      </Markdown>
    </article>
  );
}
