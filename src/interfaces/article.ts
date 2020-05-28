import { IUser } from './user';
import { IImage } from './image';

export interface IArticle {
  _id?: string;
  label?: string;
  title?: string;
  content?: string;
  hasImage?: boolean;
  image?: string;
  originalImage?: string;
  categoryId?: string;
  authorId?: string;
  createdAt?: Date;
}

export interface IArticleCategory {
  _id?: string;
  name?: string;
  label?: string;
}

export interface IArticleFilter {
  page?: number;
  limit?: number;
  category?: string;
  thumbnail?: boolean;
}

export interface IArticlesChunk {
  articles?: IArticle[];
  nextPage?: boolean;
  users?: IUser[];
}

export interface IInsertArticle {
  title: string;
  content: string;
  category: string;
  authorId: string;
  image: IImage;
  originalImage: IImage;
}
