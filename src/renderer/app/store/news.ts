import { computed, observable, action } from 'mobx';

import { StoreBase } from '../models';
import { INews, INewsChunk, INewsFilter } from '~/interfaces';
import { PAGINATION_COUNT } from '~/renderer/constants';
import { IDropDownItem } from '~/renderer/components/Dropdown';

export class NewsStore extends StoreBase<INews> {
  @observable
  public pagesCount = 0;

  @observable
  public currentPage = 1;

  @observable
  public paginationOffset = 0;

  @observable
  public error = false;

  public searchedText = '';

  public selectedCategory = -1;

  constructor() {
    super({
      api: 'news',
      name: 'news',
      path: '/news',
    });
  }

  @action
  protected updateItems(data: INewsChunk) {
    if (data) {
      this.items = data.items;
      this.pagesCount = data.pagesCount;
      this.error = data.error;
    }
  }

  public onSearch = (str: string) => {
    this.searchedText = str;
    this.refresh();
  }

  @action
  public onDropdown = (item: IDropDownItem) => {
    this.currentPage = 1;
    this.paginationOffset = 0;
    this.selectedCategory = item._id;
    this.refresh();
  }

  @action
  public refresh(page = false) {
    const data: INewsFilter = {
      category: this.selectedCategory,
      text: this.searchedText
    };

    if (page) {
      data.page = this.currentPage;
    }

    this.fetch(data, true);
  }

  public switchPage(page: number) {
    this.currentPage = page;
    this.refresh(true);
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
