import path from 'path';
import fs from 'fs';
import { SourceConfig } from '../types/sourceConfig';

export default function getConfig(): SourceConfig | {} {
  const config = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf-8') || '{}'
  );

  return config;
}
