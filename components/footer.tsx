import Link from 'next/link';
import React from 'react';

import config from '../config.json';
import Analytics from './analytics';

export default function Footer() {
  return (
    <footer className="bg-primary-light">
      <div className="flex flex-col md:flex-row gap-4 max-w-6xl p-8 mx-auto">
        <div className="flex-1 flex flex-col justify-center items-start">
          {config.logo.image && (
            <div className="mb-2">
              <img
                src={config.logo.image}
                className="w-12 max-h-12 object-contain"
                alt={config.logo.text}
              />
            </div>
          )}
          <Link href="/">
            <a className="block justify-items-start font-medium text-2xl">
              {config.logo.text}
            </a>
          </Link>
          <p className="text-gray-600">{config.meta.description}</p>
        </div>
        {config.footer.section.map((section) => (
          <div className="md:p-8" key={section.linkTitle}>
            <h3 className="font-bold mb-2">{section.linkTitle}</h3>
            <ul className="">
              {section.links.map((footerLink) => (
                <li key={footerLink.name + footerLink.link}>
                  <a
                    href={footerLink.link}
                    target="_blank"
                    rel="noopener"
                    className="block py-1"
                  >
                    {footerLink.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-primary-medium">
        <div className="max-w-6xl px-8 py-2 mx-auto font-light text-sm text-center">
          {config.footer.copyright}
        </div>
      </div>
      <Analytics />
    </footer>
  );
}
