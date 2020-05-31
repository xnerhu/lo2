import { IUser } from './user';
import { IImage } from './image';

export interface IArticle {
  _id?: string;
  label?: string;
  title?: string;
  content?: string;
  hasImage?: boolean;
  image?: string;
  categoryId?: string;
  subcategoryId?: string;
  authorId?: string;
  createdAt?: Date;
}

export interface IArticleCategory {
  _id?: string;
  name?: string;
  label?: string;
  subcategory?: boolean;
  subcategoryRef?: string;
}

export interface IArticleFilter {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  thumbnail?: boolean;
}

export interface IArticlesChunk {
  articles?: IArticle[];
  nextPage?: boolean;
  users?: IUser[];
}

export interface IArticleRequest {
  title: string;
  content: string;
  image: IImage;
  category: string;
}

export interface IInsertArticle extends IArticleRequest {
  authorId: string;
}

export interface IEditArticle extends IArticleRequest {
  _id?: string;
  deleteImage?: boolean;
  hasImage?: boolean;
}
