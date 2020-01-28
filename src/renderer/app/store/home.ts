import { observable, action, computed } from 'mobx';

import { IAppState, INews } from '~/interfaces';
import { callApi, preFetchImage } from '../utils';
import { IS_BROWSER } from '~/renderer/constants';

export class HomeStore {
  @observable
  public sliderItems: string[] = [];

  @observable
  public sliderReady = false;

  @observable
  protected _newsItems: INews[] = [];

  @observable
  public renderLastNews = false;

  protected loaded = false;

  public inject({ slider, shortNews }: IAppState) {
    if (slider && shortNews) {
      this.updateNews(shortNews);
      this.updateSlider(slider);

      this.loaded = true;
    }
  }

  public async fetchAll() {
    if (!this.loaded) {
      this.loaded = true;

      this.fetchSlider();
      this.fetchNews();
    }
  }

  public async fetchSlider() {
    const items = await callApi<string[]>('slider');

    await this.updateSlider(items);
  }

  public async fetchNews() {
    const items = await callApi<INews[]>('short-news');

    await this.updateNews(items);
  }

  @action
  protected updateNews(items: INews[]) {
    this._newsItems = items;
  }

  @action
  protected async updateSlider(items: string[]) {
    this.sliderReady = false;
    this.sliderItems = items;

    try {
      await Promise.all(this.sliderItems.map(r => preFetchImage(r)));
    } catch (err) {
      console.error(err);
    }

    this.sliderReady = true;
  }

  @computed
  public get news() {
    const length = 9;
    return this._newsItems.slice(0, this.renderLastNews ? length : length - 1);
  }

  @action
  public onWindowResize = () => {
    const width = window.innerWidth;

    if (IS_BROWSER) {
      this.renderLastNews = (width <= 1632 && width >= 1268) || width <= 871;
    }
  };
}
