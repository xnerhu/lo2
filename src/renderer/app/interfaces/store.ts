import { IAppState } from '~/interfaces';

export interface IStoreOptions<T> {
  path?: string | string[];
  api?: string;
  name?: keyof IAppState;
  items?: T[];
}
