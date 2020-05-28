import { IImageFormatsMap, IImageFormat } from '../interfaces';

export const IMAGE_FORMATS_MAP: IImageFormatsMap = {
  thumbnail: {
    width: 448,
    ratio: 16 / 9,
    quality: 65,
  },
  normal: {
    width: 1024,
    ratio: 16 / 9,
    quality: 70,
  },
  original: {
    jpgOnly: true,
    quality: 80,
  },
};

export const IMAGE_FORMATS: IImageFormat[] = [
  'thumbnail',
  'normal',
  'original',
];
