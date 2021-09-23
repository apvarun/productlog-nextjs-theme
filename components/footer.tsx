import Link from 'next/link';
import React from 'react';

import config from '../config.json';

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="flex flex-col md:flex-row gap-4 max-w-6xl p-8 mx-auto">
        <div className="flex-1 flex flex-col justify-center">
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
        {config.footer.section.map((section) => (
          <div className="p-8" key={section.linkTitle}>
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
      <div className="bg-gray-200">
        <div className="max-w-6xl px-8 py-2 mx-auto font-light text-sm text-center">
          {config.footerText}
        </div>
      </div>
    </footer>
  );
}
