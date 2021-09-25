import Markdown from 'markdown-to-jsx';
import React from 'react';
import dayjs from 'dayjs';
import Link from 'next/link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { obsidian } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';
import { NotionRenderer } from 'react-notion';

import { Post } from '../lib/types/post';
import MarkdownImage from './markdown/image';
import config from '../config.json';

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
          <h2 className="text-3xl font-bold hover:underline inline-block">{title}</h2>
        </a>
      </Link>
      <p className="mt-1 text-sm text-gray-500">{date}</p>
      <div className="prose lg:prose-lg mx-auto max-w-6xl pt-4 pb-8">
        {config.data.type === 'local' && (
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

                    if (language === 'math') {
                      return <BlockMath math={children} />;
                    }

                    return (
                      <SyntaxHighlighter language={language} style={obsidian}>
                        {children}
                      </SyntaxHighlighter>
                    );
                  },
                },
              },
            }}
          >
            {content}
          </Markdown>
        )}
        {config.data.type === 'notion' && (
          <NotionRenderer
            blockMap={content}
            customBlockComponents={{
              code: ({ blockValue }) => {
                const language = (blockValue.properties['language']?.[0] || [
                  '',
                ])[0];
                const children = blockValue.properties['title']?.[0] || '';

                if (language === 'LaTeX') {
                  return <BlockMath math={children.toString()} />;
                }

                return (
                  <SyntaxHighlighter language={language} style={obsidian}>
                    {children}
                  </SyntaxHighlighter>
                );
              },
            }}
          />
        )}
      </div>
    </article>
  );
}
