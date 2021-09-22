import Link from 'next/link';
import React from 'react';

import config from '../config.json';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="grid md:grid-cols-3 gap-4 max-w-6xl p-8 mx-auto">
        <div className="md:col-span-2 flex flex-col justify-center">
          <Link href="/">
            <a className="block font-medium text-2xl">
              {config.logo.image && (
                <img src={config.logo.image} className="w-8" />
              )}
              <span>{config.logo.text}</span>
            </a>
          </Link>
          <p className="text-gray-500">{config.meta.description}</p>
        </div>
        <ul className="py-8">
          {config.footer.links.map((footerLink) => (
            <li key={footerLink.name + footerLink.link}>
              <a
                href={footerLink.link}
                target="_blank"
                rel="noopener"
                className="block px-4 py-1"
              >
                {footerLink.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
