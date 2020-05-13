import sharp, { Sharp } from 'sharp';
import { promises as fs } from 'fs';

import { deleteFile } from '../utils';

export interface ICompressImageOptions {
  full: number;
  thumbnail?: number;
}

const defaultCompressOptions: ICompressImageOptions = {
  full: 1280,
  thumbnail: 512,
};

class ImageService {
  public format(path: string, full?: boolean) {
    return full ? path : `${path}.thumbnail`;
  }

  private getPaths(path: string, full?: boolean) {
    const url = this.format(path, full);

    return [`${url}.jpg`, `${url}.webp`];
  }

  public compressImage(instance: Sharp, path: string, quality = 70) {
    return [
      instance.jpeg({ quality }).toFile(path + '.jpg'),
      instance.webp({ quality }).toFile(path + '.webp'),
    ];
  }

  public async saveImage(
    buffer: Buffer,
    path: string,
    options = defaultCompressOptions,
  ) {
    const { full, thumbnail } = options;

    const instance = sharp(buffer);

    const promises = [
      ...this.compressImage(instance.resize(full), path),
      ...(thumbnail &&
        this.compressImage(
          instance.resize(thumbnail),
          this.format(path, false),
        )),
    ];

    await Promise.all(promises);
  }

  public async deleteImages(path: string) {
    const paths = [...this.getPaths(path, false), ...this.getPaths(path, true)];
    const promises = paths.map((r) => deleteFile(r));

    await Promise.all(promises);
  }
}

export default new ImageService();
