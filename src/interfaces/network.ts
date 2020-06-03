import { IEditImageOptions } from '~/renderer/interfaces';

export type IApiResponse<T = {}> = T & {
  success?: boolean;
  errorMessage?: string;
};

export interface IInsertArticleRes extends IApiResponse {
  label: string;
  imageOptions?: IEditImageOptions;
  deleteImage?: boolean;
}
