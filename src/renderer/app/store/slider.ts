import { observable } from 'mobx';
import { preFetchImage } from '../utils';

export class SliderStore {
  @observable
  public items: string[] = [];

  @observable
  public selected: string;

  @observable
  public fetched = false;

  public async load(items: string[]) {
    this.items = items;

    if (items.length) {
      this.selected = this.items[0];
    }

    const promises = this.items.map(r => preFetchImage(r));

    await Promise.all(promises);

    this.fetched = true;
  }
}
