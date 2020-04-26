import { Request } from 'express';

import { IAppState, IUser } from '~/interfaces';

export interface IInsertArticleData {
  title?: string;
  body?: string;
  categoryId?: number;
  authorId?: number;
  image?: Express.Multer.File;
}

export interface IEditArticleData extends IInsertArticleData {
  label?: string;
  deleteImage?: boolean;
}

export interface IRequest extends Request {
  appState?: IAppState;
  user?: IUser;
  authError?: Error;
  addArticle?: IInsertArticleData;
  editArticle?: IEditArticleData;
}
