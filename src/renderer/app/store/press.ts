import { observable } from 'mobx';

import { IPress } from '~/interfaces';

export class PressStore {
  @observable
  public items: IPress[] = [];
}
