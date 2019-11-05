import { IUser } from './user';

export interface INews {
  _id?: number;
  title?: string;
  content?: string;
  image?: string;
  _categoryId?: number;
  category?: string;
  createdAt?: Date;
  _authorId?: number;
  author?: IUser;
}

export interface INewsCategory {
  _id?: number;
  title?: string;
}

export interface INewsChunk {
  items?: INews[];
  pagesCount?: number;
  error?: boolean;
}

export interface INewsFilter {
  page?: number;
  limit?: number;
  text?: string;
  category?: number;
}
