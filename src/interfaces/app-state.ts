import { IUser } from './user';
import {
  IHomePageData,
  IArticlesPageData,
  IArticlePageData,
  IAddArticlePageData,
  IEditArticlePageData,
} from './pages';

export interface IAppState {
  home?: IHomePageData;
  articles?: IArticlesPageData;
  article?: IArticlePageData;
  addArticle?: IAddArticlePageData;
  editArticle?: IEditArticlePageData;
  signedIn?: boolean;
  user?: IUser;
}

export type IAppStateItem = keyof IAppState;
