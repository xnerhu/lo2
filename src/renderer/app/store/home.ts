import { observable, action, computed } from 'mobx';

import { IAppState, INews } from '~/interfaces';
import { callApi, preFetchImage } from '../utils';
import { IS_BROWSER } from '~/renderer/constants';
import { StoreBase } from '../models';

export class HomeStore extends StoreBase {
  @observable
  public sliderItems: string[] = [];

  @observable
  public sliderReady = false;

  @observable
  protected _newsItems: INews[] = [];

  @observable
  public renderLastNews = false;

  public inject({ slider, shortNews }: IAppState) {
    if (slider && shortNews) {
      this.sliderItems = slider;
      this._newsItems = shortNews;

      this.loaded = true;
      this.loadSliderItems();
    }
  }

  public load() {
    if (!this.loaded) {
      this.loadSlider();
      this.loadNews();
      this.loaded = true;
    }
  }

  @action
  public async loadSlider() {
    this.sliderItems = await callApi('slider');
    this.loadSliderItems();
  }

  @action
  public async loadSliderItems() {
    try {
      await Promise.all(this.sliderItems.map(r => preFetchImage(r)));
    } catch (err) {
      console.error(err);
    }

    this.sliderReady = true;
  }

  @action
  public async loadNews() {
    this._newsItems = await callApi('short-news');
  }

  @computed
  public get news() {
    const length = 9;
    return this._newsItems.slice(0, this.renderLastNews ? length : length - 1)
  }

  @action
  public onWindowResize = () => {
    const width = window.innerWidth;

    if (IS_BROWSER) {
      this.renderLastNews = width <= 1632 && width >= 1268 || width <= 871;
    }
  }
}
