import { IPosition } from 'spatium';

export interface IArticleEditorErrors {
  title?: string;
  content?: string;
  success?: boolean;
}

export interface IEditImageData extends IEditImageOptions {
  src: string;
}

export interface IEditImageOptions {
  offset: IPosition;
  scale: number;
}
