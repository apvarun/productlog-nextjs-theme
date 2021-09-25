import React from 'react';

import config from '../config.json';
import useWindowSize from '../misc/useWindowSize';

interface Item {
  name: string;
  link: string;
  type?: string;
}

interface DropdownItem {
  name: string;
  children: Item[];
}

type Menu = Array<Item | DropdownItem>;

const MobileMenu = ({ menu }: { menu: Menu }) => {
  return (
    <div className="group relative">
      <button className="rounded px-3 py-2">
        Menu
        <span className="ml-2 text-sm">▼</span>
      </button>
      <nav
        tabIndex={0}
        className="invisible rounded bg-white w-40 absolute right-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 shadow-lg"
      >
        <ul className="py-1">
          {menu
            .map((child) => {
              if ('children' in child) {
                return child.children.map((subChild) => (
                  <li key={subChild.name + subChild.link}>
                    <a
                      href={subChild.link}
                      target="_blank"
                      rel="noopener"
                      className="block px-4 py-2 hover:bg-primary-light"
                    >
                      {subChild.name}
                    </a>
                  </li>
                ));
              }

              return (
                <li key={child.name + child.link}>
                  <a
                    href={child.link}
                    target="_blank"
                    rel="noopener"
                    className="block px-4 py-2 hover:bg-primary-light"
                  >
                    {child.name}
                  </a>
                </li>
              );
            })
            .flat()}
        </ul>
      </nav>
    </div>
  );
};

const DropdownMenuItem = ({ name, children }: DropdownItem) => (
  <div className="group relative">
    <button className="rounded px-3 py-2">
      {name}
      <span className="ml-2 text-sm">▼</span>
    </button>
    <nav
      tabIndex={0}
      className="invisible rounded bg-white w-40 absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1 shadow-lg"
    >
      <ul className="py-1">
        {children.map((child) => (
          <li key={child.name + child.link}>
            <a
              href={child.link}
              target="_blank"
              rel="noopener"
              className="block px-4 py-2 hover:bg-primary-light"
            >
              {child.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

const SimpleMenuItem = ({ name, link, type = '' }: Item) => (
  <a
    href={link}
    target="_blank"
    rel="noopener"
    className={`px-3 py-2 ${
      type === 'button'
        ? 'rounded bg-primary-dark hover:bg-gray-400 transition-colors'
        : ''
    }`}
  >
    {name}
  </a>
);

export default function NavMenu() {
  const { width } = useWindowSize();

  if (width < 640) {
    return <MobileMenu menu={config.header.menu as Menu} />;
  }

  return (
    <nav className="flex gap-4">
      {(config.header.menu as Menu).map((item) =>
        'children' in item ? (
          <DropdownMenuItem {...item} key={item.name} />
        ) : (
          <SimpleMenuItem {...item} key={item.name} />
        )
      )}
    </nav>
  );
}
