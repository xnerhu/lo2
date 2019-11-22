import { observable, computed, action } from 'mobx';

import { preFetchImage } from '../utils';
import { StoreBase } from '../models';

export class SliderStore extends StoreBase<string> {
  @observable
  public fetched = false;

  @observable
  public selectedIndex = 0;

  constructor() {
    super({
      api: 'slider',
      name: 'slider',
      path: '/',
    });

    this.on('load', this.onLoad);
  }

  @computed
  public get selected() {
    if (!this.items.length) return null;
    return this.items[this.selectedIndex];
  }

  @action
  private onLoad = async (items: string[]) => {
    this.items = items;

    try {
      await Promise.all(this.items.map(r => preFetchImage(r)));
    } catch (err) {
    }

    this.fetched = true;
  }

  @action
  public switchLeft = () => {
    if (--this.selectedIndex < 0) {
      this.selectedIndex = this.items.length - 1;
    }
  }

  @action
  public switchRight = () => {
    if (++this.selectedIndex >= this.items.length) {
      this.selectedIndex = 0;
    }
  }
}
