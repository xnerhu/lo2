import { IHomePageData, IArticlesPageData } from './pages';
import { IUser } from './user';

export interface IAppState {
  home?: IHomePageData;
  articles?: IArticlesPageData;
  signedIn?: boolean;
  user?: IUser;
}

export type IAppStateItem = keyof IAppState;
