import { observable, action } from 'mobx';

import { ISliderItem } from '../interfaces';
import { preFetchImage } from '../utils';

export class SliderStore {
  @observable
  public items: ISliderItem[] = [];

  @observable
  public selected: ISliderItem;

  public async load(items: ISliderItem[]) {
    this.items = items;

    if (items.length) {
      this.selected = items[0];
    }

    // await Promise.all(this.items.map(r => this.preFetch(r)));
  }

  @action
  public select(item: ISliderItem) {
    this.selected = item;
    this.preFetch(item);
  }

  @action
  public async preFetch(item: ISliderItem) {
    if (item.fetched) return;
    await preFetchImage(item.url);
    console.log("XDDDDD", item.url);
    item.fetched = true;
  }
}
