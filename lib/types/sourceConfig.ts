interface LocalSourceConfig {
  type: 'local';
  dataFolder: string;
}

export type SourceConfig = LocalSourceConfig;
