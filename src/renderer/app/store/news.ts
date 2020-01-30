import { observable, action } from 'mobx';

import {
  INewsCategory,
  INews,
  IAppState,
  INewsChunk,
  INewsFilter,
} from '~/interfaces';
import { callApi } from '../utils';
import { IDropDownItem } from '~/renderer/components/Dropdown';

export class NewsStore {
  @observable
  public items: INews[] = [];

  @observable
  public dropdownItems: IDropDownItem[] = [
    {
      id: 'all',
      name: 'Wszystko',
    },
  ];

  @observable
  public nextPage = true;

  @observable
  public error = false;

  protected categoriesLoaded = false;

  public inject({ newsPage }: IAppState) {
    if (newsPage) {
      this.updateNews(newsPage.news);
      this.updateCategories(newsPage.categories);
      this.categoriesLoaded = true;
    }
  }

  public async fetchNews(filter: INewsFilter = {}) {
    const data = await callApi<INewsChunk>('news', filter);

    this.updateNews(data);
  }

  public async fetchCategories() {
    if (!this.categoriesLoaded) {
      this.categoriesLoaded = true;

      const items = await callApi<INewsCategory[]>('news-categories');

      this.updateCategories(items);
    }
  }

  @action
  protected updateNews(data: INewsChunk) {
    const { items, nextPage } = data;

    this.items = items;
    this.nextPage = nextPage;
    this.error = items.length === 0;
  }

  @action
  protected updateCategories(items: INewsCategory[]) {
    this.dropdownItems = [
      ...this.dropdownItems,
      ...items.map(r => {
        return { id: r.label, name: r.name } as IDropDownItem;
      }),
    ];
  }
}
