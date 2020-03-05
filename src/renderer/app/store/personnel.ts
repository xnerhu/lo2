import { action, observable } from 'mobx';

import { IAppState, IPersonnelSection, IPersonnelPacket } from '~/interfaces';
import { callApi } from '../utils/network';

export class PersonnelStore {
  @observable
  public sliderItems: string[] = [];

  @observable
  public sections: IPersonnelSection[] = [];

  protected loaded = false;

  public inject({ personnelPage }: IAppState) {
    if (personnelPage) {
      this.update(personnelPage);
      this.loaded = true;
    }
  }

  public async fetch() {
    if (!this.loaded) {
      this.loaded = true;

      const data = await callApi<IPersonnelPacket>('personnel');

      this.update(data);
    }
  }

  @action
  protected update(data: IPersonnelPacket) {
    const { sliderItems, sections } = data;

    this.sliderItems = sliderItems;
    this.sections = sections;
  }
}
