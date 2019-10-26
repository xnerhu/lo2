import { observable } from 'mobx';

import { ITeachersSection } from '~/interfaces';

export class TeachersStore {
  @observable
  public items: ITeachersSection[] = [];
}
