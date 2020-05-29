import sharp, { Sharp } from 'sharp';

import { deleteFile } from '../utils';
import { IImageFormat, IImageFormatOptions } from '../interfaces';
import { IMAGE_FORMATS, IMAGE_FORMATS_MAP } from '../constants';

class ImageService {
  public format(path: string, format?: IImageFormat) {
    const suffix = format !== 'original' ? `.${format}` : '';

    return path + suffix;
  }

  private getPaths(path: string, format?: IImageFormat) {
    const url = this.format(path, format);

    return [`${url}.jpg`, `${url}.webp`];
  }

  public async deleteImages(path: string) {
    const paths: string[] = [];

    IMAGE_FORMATS.forEach((r) => {
      paths.push(...this.getPaths(path, r));
    });

    const promises = paths.map((r) => deleteFile(r, false));

    await Promise.all(promises);
  }

  private process(
    instance: Sharp,
    path: string,
    options: IImageFormatOptions = {},
  ) {
    const { width, ratio, jpgOnly, quality } = options;
    let { height } = options;

    if (!height && width && ratio) {
      height = Math.round(width * (1 / ratio));
    }

    const resized = instance.resize(null, null, {
      fit: 'cover',
      position: 'center',
      background: '#fff',
      width,
      height,
      withoutEnlargement: true,
    });

    return [
      resized.jpeg({ quality }).toFile(path + '.jpg'),
      !jpgOnly && resized.webp({ quality }).toFile(path + '.webp'),
    ];
  }

  public async saveImage(
    buffer: Buffer,
    basePath: string,
    ...formats: IImageFormat[]
  ) {
    const instance = sharp(buffer);
    const promises: Promise<any>[] = [];

    formats.forEach((r) => {
      const path = this.format(basePath, r);
      const options = IMAGE_FORMATS_MAP[r];

      promises.push(...this.process(instance, path, options));
    });

    await Promise.all(promises);
  }
}

export default new ImageService();
