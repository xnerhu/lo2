import { computed, observable, action } from 'mobx';

import { StoreBase } from '../models';
import { INews } from '~/interfaces';
import { IS_BROWSER } from '~/renderer/constants';

export class ShortNewsStore extends StoreBase<INews> {
  @observable
  public renderLastShort = false;

  constructor() {
    super({
      api: 'short-news',
      name: 'shortNews',
      path: '/',
    });
  }

  @computed
  public get news() {
    const length = 9;
    return this.items.slice(0, this.renderLastShort ? length : length - 1)
  }

  @action
  public onWindowResize = () => {
    const width = window.innerWidth;

    if (IS_BROWSER) {
      this.renderLastShort = width <= 1632 && width >= 1268 || width <= 871;
    }
  }
}
