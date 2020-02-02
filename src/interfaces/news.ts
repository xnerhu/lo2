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
