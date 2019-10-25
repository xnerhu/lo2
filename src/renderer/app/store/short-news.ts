import { observable } from 'mobx';

import { INews } from '~/interfaces';

export class ShortNewsStore {
  @observable
  public items: INews[] = [];
}
