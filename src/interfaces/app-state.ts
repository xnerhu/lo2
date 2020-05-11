import { IHomePageData, IArticlesPageData } from './pages';

export interface IAppState {
  home?: IHomePageData;
  articles?: IArticlesPageData;
  signedIn?: boolean;
}

export type IAppStateItem = keyof IAppState;
