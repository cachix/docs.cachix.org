declare module '@pagefind/default-ui' {
  interface SearchResult {
    url: string;
    sub_results?: { url: string }[];
  }
  export class PagefindUI {
    constructor(options: {
      element: string;
      bundlePath: string;
      showImages?: boolean;
      showSubResults?: boolean;
      processResult?: (result: SearchResult) => SearchResult;
    });
    triggerSearch(query: string): void;
  }
}
