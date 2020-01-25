import { promises as fs } from 'fs';
import { resolve, parse } from 'path';

export const getSliderItems = async () => {
  const path = resolve('./static', 'slider');
  const files = await fs.readdir(path);
  const slides: string[] = [];

  for (const file of files) {
    const { name, ext } = parse(file);

    if (ext !== '.webp') {
      slides.push(`/static/slider/${name}`);
    }
  }

  return slides;
};
