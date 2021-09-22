import path from 'path';
import fs from 'fs';
import { getLocalSource } from './sources/local';
import getConfig from './utils/getConfig';

export default function getSource() {
  const config = getConfig();

  if ('type' in config) {
    switch (config.type) {
      case 'local':
        return getLocalSource();
    }
  }

  return null;
}
