import { observable } from 'mobx';

import { INewsBase } from '~/interfaces';

export class ShortNewsStore {
  @observable
  public items: INewsBase[] = [];
}
