import sharp, { Sharp } from 'sharp';

export interface ICompressImageOptions {
  full: number;
  thumbnail?: number;
}

import { deleteFile } from './files';

const defaultCompressImageOptions: ICompressImageOptions = {
  full: 1280,
  thumbnail: 512,
};

const compressImage = (instance: Sharp, path: string, quality = 70) => {
  return [
    instance.jpeg({ quality }).toFile(path + '.jpg'),
    instance.webp({ quality }).toFile(path + '.webp'),
  ];
};

export const saveImage = async (
  buffer: Buffer,
  path: string,
  options = defaultCompressImageOptions,
) => {
  const { full, thumbnail } = options;

  const instance = sharp(buffer);
  const promises = [
    ...compressImage(instance.resize(full), path),
    ...(thumbnail &&
      compressImage(instance.resize(thumbnail), `${path}.thumbnail`)),
  ];

  await Promise.all(promises);
};

export const deleteImages = async (path: string) => {
  const promises = [
    deleteFile(path + '.jpg'),
    deleteFile(path + '.webp'),
    deleteFile(path + '.thumbnail.jpg'),
    deleteFile(path + '.thumbnail.webp'),
  ];

  await Promise.all(promises);
};
