import { observable, action } from 'mobx';

import { IAppState, INews, IHomePagePacket } from '~/interfaces';
import { callApi } from '../utils';

export class HomeStore {
  @observable
  public sliderItems: string[] = [];

  @observable
  public newsItems: INews[] = [];

  protected loaded = false;

  public inject({ homePage }: IAppState) {
    if (homePage) {
      this.update(homePage);
      this.loaded = true;
    }
  }

  public async fetch() {
    if (!this.loaded) {
      this.loaded = true;

      const data = await callApi<IHomePagePacket>('home');

      this.update(data);
    }
  }

  @action
  protected update({ news, sliderItems }: IHomePagePacket) {
    this.newsItems = news;
    this.sliderItems = sliderItems;
  }
}
