import { ObjectID } from 'mongodb';

import { IUser } from './user';

export interface IArticle {
  _id?: ObjectID;
  label?: string;
  title?: string;
  content?: string;
  image?: string;
  hasImage?: boolean;
  categoryId?: ObjectID;
  authorId?: ObjectID;
  createdAt?: Date;
}

export interface IArticleCategory {
  _id?: ObjectID;
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
