import { IHomePageData, IArticlesPageData } from './pages';

export interface IAppState {
  home?: IHomePageData;
  articles?: IArticlesPageData;
}

export type IAppStateItem = keyof IAppState;
