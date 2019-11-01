import { EventEmitter } from 'events';
import { observable, action } from 'mobx';
import axios from 'axios';

import { IStoreOptions } from '../interfaces';
import { IAppState } from '~/interfaces';

export declare interface StoreBase<T> {
  on(event: 'load', listener: (data: T[]) => void): this;
}

export class StoreBase<T> extends EventEmitter {
  @observable
  public items: T[] = [];

  constructor(public options: IStoreOptions) {
    super();
  }

  public inject(appState: IAppState) {
    const { name } = this.options;

    this.updateItems(appState[name] as T[]);
  }

  public async fetch(params?: { [key: string]: string }) {
    if (!this.items.length) {
      const { api } = this.options;
      const { data } = await axios.get(`/api/${api}`, { params });

      this.updateItems(data as T[]);
    }
  }

  @action
  private updateItems(data: T[]) {
    if (data) {
      this.items = data;
      this.emit('load', data);
    }
  }
}
