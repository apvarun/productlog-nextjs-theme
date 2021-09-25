import { getLocalSource } from './sources/local';
import getConfig from './utils/getConfig';
import { getNotionSource } from './sources/notion';

export default function getSource() {
  const config = getConfig();

  switch (config.data.type) {
    case 'local':
      return getLocalSource();
    case 'notion':
      return getNotionSource();
    default:
      return null;
  }
}
