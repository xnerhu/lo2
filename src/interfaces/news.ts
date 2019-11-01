import { IUser } from './user';

export interface INews {
  _id?: number;
  title?: string;
  content?: string;
  image?: string;
  _authorId?: number;
  author?: IUser;
  createdAt?: Date;
}
