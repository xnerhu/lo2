import * as React from 'react';
import { computed, observable, action } from 'mobx';

import { StoreBase } from '../models';
import { INews, INewsChunk, INewsFilter, INewsCategory } from '~/interfaces';
import { PAGINATION_COUNT } from '~/renderer/constants';
import { IDropDownItem } from '~/renderer/components/Dropdown';
import { IWithRouterProps } from '../interfaces';

export class NewsStore extends StoreBase<INews> {
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
  public filter: INewsFilter = {
    page: 0,
    category: -1,
    text: '',
  }

  @observable
  public paginationOffset = 0;

  @observable
  public error = false;

  public inputRef = React.createRef<HTMLInputElement>();

  protected history: any;

  constructor() {
    super({
      api: 'news',
      name: 'news',
      filter: (str) => {
        return str.startsWith('/news');
      },
    });

    this.on('inject', appState => {
      this.categories = [...this.categories, ...appState.newsCategories];
    });
  }

  @action
  public onLoad = (props: IWithRouterProps) => {
    const { text, page } = props.match.params;

    if (text) {
      this.inputRef.current.value = text;
    }

    if (page) {
      const _page = parseInt(page);

      console.log(_page);
    }
  }

  @action
  protected updateItems(data: INewsChunk) {
    if (data) {
      this.items = data.items;
      this.pagesCount = data.pagesCount;
      // this.error = data.error;
    }
  }

  @action
  public onDropdown = (item: IDropDownItem) => {
    this.paginationOffset = 0;

    this.history.push({
      pathname: this.getPathname({ page: 1, category: item._id })
    });
  }

  @action
  public onSearch = (str: string) => {
    this.history.push({
      pathname: this.getPathname({ page: 1, text: str })
    });
  }

  @action
  public refresh() {
    this.fetch(this.filter, true);
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

  public hasChanged({ page, category, text }: INewsFilter) {
    const f = this.filter;
    return f.page !== page || f.category !== category || f.text !== text;
  }

  @action
  public syncWithRouter({ match, history }: IWithRouterProps) {
    const { page, category, text } = match.params;

    this.history = history;

    const filter: INewsFilter = {
      page: parseInt(page || 1),
      category: parseInt(category || -1),
      text: text || '',
    }

    if (this.hasChanged(filter)) {
      this.filter = filter;
      this.refresh();
    }
  }

  public getPathname(filter: INewsFilter = {}) {
    filter = { ...this.filter, ...filter };

    return `/news/${filter.page}/${filter.category}/${filter.text}`;
  }
}
