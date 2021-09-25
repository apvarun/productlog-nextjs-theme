import path from 'path';
import fs from 'fs';
import { SourceConfig } from '../types/sourceConfig';

export default function getConfig(): SourceConfig | null {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf-8')
    );
  } catch {
    return null;
  }
}
