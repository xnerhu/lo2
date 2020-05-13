export type IImageSize = 'thumbnail' | 'normal' | 'original';

export interface IImageResizeOptions {
  original?: number;
  normal: number;
  thumbnail: number;
}

export interface IImageProcessOptions {
  width?: number;
  quality?: number;
  jpgOnly?: boolean;
}
