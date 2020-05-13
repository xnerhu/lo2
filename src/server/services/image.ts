import sharp, { Sharp } from 'sharp';
import { promises as fs } from 'fs';

import { deleteFile } from '../utils';
import {
  IImageSize,
  IImageResizeOptions,
  IImageProcessOptions,
} from '../interfaces';

const defaultResizeOptions: IImageResizeOptions = {
  normal: 1024,
  thumbnail: 448,
};

const defaultProcessOptions: Partial<IImageProcessOptions> = {
  quality: 70,
};

class ImageService {
  public format(path: string, size?: IImageSize) {
    const suffix = size !== 'original' ? `.${size}` : '';

    return path + suffix;
  }

  private getPaths(path: string, size?: IImageSize) {
    const url = this.format(path, size);

    return [`${url}.jpg`, `${url}.webp`];
  }

  private processImage = (instance: Sharp, basePath: string) => (
    size: IImageSize,
    options?: IImageProcessOptions,
  ) => {
    const { width, quality, jpgOnly } = {
      ...defaultProcessOptions,
      ...options,
    };

    const path = this.format(basePath, size);

    const resized = instance.resize(width, null, {
      fit: 'cover',
      background: '#fff',
      height: Number.isSafeInteger(width) ? (width * 9) / 16 : null,
    });

    return [
      resized.jpeg({ quality }).toFile(path + '.jpg'),
      !jpgOnly && resized.webp({ quality }).toFile(path + '.webp'),
    ];
  };

  public async saveImage(buffer: Buffer, path: string) {
    const instance = sharp(buffer);
    const handle = this.processImage(instance, path);

    const promises = [
      ...handle('original', { jpgOnly: true }),
      ...handle('normal', { width: defaultResizeOptions.normal }),
      ...handle('thumbnail', { width: defaultResizeOptions.thumbnail }),
    ];

    await Promise.all(promises);
  }

  public async deleteImages(path: string) {
    const sizes: IImageSize[] = ['thumbnail', 'normal', 'original'];
    const paths: string[] = [];

    sizes.forEach((r) => {
      paths.push(...this.getPaths(path, r));
    });

    const promises = paths.map((r) => deleteFile(r));

    await Promise.all(promises);
  }
}

export default new ImageService();
