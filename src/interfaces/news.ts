import { IUser } from './user';

export interface INews {
  _id?: number;
  title?: string;
  content?: string;
  image?: string;
  _categoryId?: number;
  category?: INewsCategory;
  createdAt?: Date | string;
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
}

export interface INewsFilter {
  page?: number;
  limit?: number;
  text?: string;
  category?: number;
}
