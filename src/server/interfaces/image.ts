export type IImageFormat = 'thumbnail' | 'normal' | 'original';

export interface IImageFormatsMap {
  thumbnail: IImageFormatOptions;
  normal: IImageFormatOptions;
  original: IImageFormatOptions;
}

export interface IImageFormatOptions {
  width?: number;
  height?: number;
  ratio?: number;
  jpgOnly?: boolean;
  quality?: number;
}
