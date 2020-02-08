import sharp, { Sharp } from 'sharp';

import { ICompressImageOptions } from '../interfaces';

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
