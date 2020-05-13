import { IUser } from './user';

export interface IArticle {
  _id?: string;
  label?: string;
  title?: string;
  content?: string;
  image?: string;
  hasImage?: boolean;
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
  image: string;
}
