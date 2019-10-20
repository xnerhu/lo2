import { resolve } from 'path';
import { promises as fs } from 'fs';

export const getSliderItems = async () => {
  const path = resolve('./static', 'slider');
  const files = await fs.readdir(path);

  return files.map(r => `/static/slider/${r}`);
}
