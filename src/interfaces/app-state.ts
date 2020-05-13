import { IHomePageData, IArticlesPageData, IArticlePageData } from './pages';
import { IUser } from './user';

export interface IAppState {
  home?: IHomePageData;
  articles?: IArticlesPageData;
  article?: IArticlePageData;
  signedIn?: boolean;
  user?: IUser;
}

export type IAppStateItem = keyof IAppState;
