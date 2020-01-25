import { observable, action } from 'mobx';

import {
  INewsCategory,
  INews,
  IAppState,
  INewsChunk,
  INewsFilter,
} from '~/interfaces';
import { callApi } from '../utils';
import { StoreBase } from '../models';
import { IDropDownItem } from '~/renderer/components/Dropdown';

export class NewsStore extends StoreBase {
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

  public inject({ news, newsCategories }: IAppState) {
    if (news && newsCategories) {
      this.items = news.items;
      this.nextPage = news.nextPage;
      this.error = this.items.length === 0;
      this.dropdownItems = [
        ...this.dropdownItems,
        ...newsCategories.map(r => {
          return { id: r.label, name: r.name } as IDropDownItem;
        }),
      ];
      this.loaded = true;
    }
  }

  public load() {
    if (!this.loaded) {
      this.loadNews();
      this.loadCategories();
      this.loaded = true;
    }
  }

  @action
  public async loadNews(filter: INewsFilter = {}) {
    const { items, nextPage } = await callApi<INewsChunk>('news', filter);

    this.items = items;
    this.nextPage = nextPage;
    this.error = items.length === 0;
  }

  @action
  public async loadCategories() {
    const items = await callApi<INewsCategory[]>('news-categories');

    this.dropdownItems = [
      ...this.dropdownItems,
      ...items.map(r => {
        return { id: r.label, name: r.name } as IDropDownItem;
      }),
    ];
  }
}
