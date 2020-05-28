import { IImageFormatsMap, IImageFormat } from '../interfaces';
import { ARTICLE_IMAGE_RATIO } from '~/constants/design';

export const IMAGE_FORMATS_MAP: IImageFormatsMap = {
  thumbnail: {
    width: 448,
    ratio: ARTICLE_IMAGE_RATIO,
    quality: 65,
  },
  normal: {
    width: 1024,
    ratio: ARTICLE_IMAGE_RATIO,
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
