import { ObjectID } from 'mongodb';

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
