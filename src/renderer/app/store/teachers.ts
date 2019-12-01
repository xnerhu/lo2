import { action, observable } from 'mobx';

import { StoreBase } from '../models';
import { IAppState, ITeachersSection } from '~/interfaces';
import { callApi } from '../utils';

export class TeachersStore extends StoreBase {
  @observable
  public data: ITeachersSection[] = [];

  public inject({ teachers }: IAppState) {
    if (teachers) {
      this.data = teachers;
      this.loaded = true;
    }
  }

  @action
  public load() {
    if (!this.loaded) {
      this.loadTeachers();
      this.loaded = true;
    }
  }

  @action
  public async loadTeachers() {
    this.data = await callApi<ITeachersSection[]>('teachers');
  }
}
