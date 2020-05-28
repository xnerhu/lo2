import { promises as fs } from 'fs';
import { resolve, parse } from 'path';

export const listFiles = async (dirName: string, exclude = ['webp']) => {
  const path = resolve('./static', dirName);
  const files = await fs.readdir(path);
  const items: string[] = [];

  for (const file of files) {
    const { name, ext } = parse(file);

    if (!exclude.includes(ext.slice(1))) {
      items.push(`/static/${dirName}/${name}`);
    }
  }

  return items;
};

export const deleteFile = async (path: string) => {
  try {
    await fs.unlink(path);
  } catch (error) {
    console.log(error);
  }
};

export const isImage = (file: any) => {
  return file && file.mimetype.startsWith('image');
};
