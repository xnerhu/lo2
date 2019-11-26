import { IAppState } from '~/interfaces';

export declare interface StoreBase {
  inject(state: IAppState): void;
  load(options?: any): void;
}

export class StoreBase {
  public loaded = false;
}
