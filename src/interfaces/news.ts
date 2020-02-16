import { IUser } from './user';

export interface INewsChunk {
  items?: INews[];
  nextPage?: boolean;
}

export interface INews {
  id?: number;
  label?: string;
  title?: string;
  content?: string;
  body?: string;
  image?: string;
  hasImage?: boolean;
  createdAt?: string;
  categoryId?: number;
  authorId?: number;
  _category?: INewsCategory;
  _author?: IUser;
}

export interface INewsCategory {
  id?: number;
  name?: string;
  label?: string;
}

export interface INewsFilter {
  page?: number;
  limit?: number;
  categoryLabel?: string;
  excluded?: string;
}

export interface IAddArticleReq {
  title: string;
  content: string;
  categoryLabel: string;
}

export interface IAddArticleRes {
  success?: boolean;
  articleLabel?: string;
  errors?: IAddArticleErrors;
}

export interface IAddArticleErrors {
  title?: string;
  content?: string;
  category?: string;
  image?: string;
}

export interface IEditArticleItem {
  title?: string;
  content?: string;
  image?: string;
  categoryLabel?: string;
}

export interface IEditArticleReq extends IAddArticleReq {
  deleteImage?: boolean;
}

export interface IEditArticleErrors extends IAddArticleErrors {
  label?: string;
}

export interface IDeleteArticleRes {
  success?: boolean;
  error?: string;
}
