import { observable, action, computed } from 'mobx';

import { INewsCategory, INews, IAppState, INewsChunk, INewsFilter } from '~/interfaces';
import { callApi } from '../utils';
import { PAGINATION_COUNT } from '~/renderer/constants';
import { StoreBase } from '../models';

export class NewsStore extends StoreBase {
  @observable
  public items: INews[] = [];

  @observable
  public categories: INewsCategory[] = [
    {
      _id: -1,
      title: 'Wszystko'
    }
  ]

  @observable
  public pagesCount = 0;

  @observable
  public paginationOffset = 0;

  @observable
  public error = false;

  public inject({ news, newsCategories }: IAppState) {
    if (news && newsCategories) {
      this.items = news.items;
      this.pagesCount = news.pagesCount;
      this.categories = [...this.categories, ...newsCategories];
      this.error = this.items.length === 0;
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
    const chunk = await callApi<INewsChunk>('news', filter);

    this.items = chunk.items;
    this.pagesCount = chunk.pagesCount;
    this.error = chunk.items.length === 0;
  }

  @action
  public async loadCategories() {
    const items = await callApi<INewsCategory[]>('news-categories');
    this.categories = [...this.categories, ...items];
  }

  public stringifyFilter(filter: INewsFilter) {
    filter = { page: 1, category: -1, text: '', ...filter };
    return `/news/${filter.page}/${filter.category}/${filter.text}`;
  }

  @action
  public setPaginationOffset(page: number) {
    this.paginationOffset = Math.ceil(page / PAGINATION_COUNT) - 1;
  }

  @computed
  public get paginationLength() {
    return Math.min(this.pagesCount, PAGINATION_COUNT);
  }

  @computed
  public get maxPaginationLength() {
    return Math.ceil(this.pagesCount / this.paginationLength) - 1;
  }

  @computed
  public get canSwitch() {
    return this.pagesCount > PAGINATION_COUNT;
  }

  @computed
  public get canGoStart() {
    return this.paginationOffset > 0;
  }

  @computed
  public get canGoEnd() {
    return this.paginationOffset < this.maxPaginationLength;
  }

  @action
  public goBackward = () => {
    if (--this.paginationOffset < 0) {
      this.goEnd();
    }
  }

  @action
  public goForward = () => {
    if (++this.paginationOffset > this.maxPaginationLength) {
      this.goStart();
    }
  }

  @action
  public goStart = () => {
    this.paginationOffset = 0;
  }

  @action
  public goEnd = () => {
    this.paginationOffset = this.maxPaginationLength;
  }
}
