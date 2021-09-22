export type PageItem = {
  frontMatter?: {
    [key: string]: string;
  };
  name: string;
  route: string;
};

export type PageList = {
  children: Array<PageList | PageItem>;
  name: string;
  route: string;
};

export type PageMap = Array<PageList | PageItem>;

export default function getPageObj(routePaths: string[], pageMap: PageMap) {
  let pageItem = pageMap;

  for (let i = 0; i < routePaths.length; i++) {
    const tmp = pageItem.find((pg) => pg.name === routePaths[i]);

    if (!('children' in tmp) || routePaths.length === i + 1) {
      if ('children' in tmp) return tmp.children;

      return tmp;
    }

    pageItem = tmp.children;
  }

  return pageItem;
}
