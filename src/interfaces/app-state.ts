import { IHomePageData } from './pages';

export interface IAppState {
  home?: IHomePageData;
  articles?: string;
}

export type IAppStateItem = keyof IAppState;
