import Link from 'next/link';

import config from '../config.json';
import NavMenu from './navMenu';

export default function Header() {
  return (
    <header className="bg-gray-100">
      <div className="flex items-center justify-between max-w-6xl p-8 mx-auto">
        <Link href="/">
          <>
            {config.header.logo.image && (
              <img src={config.header.logo.image} className="w-8" />
            )}
            <a className="block font-medium text-2xl">
              {config.header.logo.text}
            </a>
          </>
        </Link>
        <NavMenu />
      </div>
      <div className="max-w-6xl p-8 mx-auto">
        <h1 className="text-5xl font-medium mb-4">{config.header.title}</h1>
        <p className="text-lg max-w-md">{config.header.description}</p>
      </div>
    </header>
  );
}
