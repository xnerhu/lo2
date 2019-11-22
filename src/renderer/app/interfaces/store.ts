import { IAppState } from '~/interfaces';

export interface IStoreOptions<T> {
  path?: string;
  filter?: (path: string) => boolean;
  api?: string;
  name?: keyof IAppState;
  items?: T[];
}
