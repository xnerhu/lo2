import { IAppState } from '~/interfaces';

export interface IStoreOptions {
  path?: string | string[];
  api?: string;
  name?: keyof IAppState;
}
