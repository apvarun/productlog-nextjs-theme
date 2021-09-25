interface LocalSourceConfig {
  data: {
    type: 'local' | 'notion';
    name: string;
  };
}

export type SourceConfig = LocalSourceConfig;
