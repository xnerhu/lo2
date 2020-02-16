import { Request } from 'express';

import { IAppState, IUser } from '~/interfaces';
import { IInsertArticleData, IEditArticleData } from './news';

export interface IRequest extends Request {
  appState?: IAppState;
  user?: IUser;
  addArticle?: IInsertArticleData;
  editArticle?: IEditArticleData;
}
