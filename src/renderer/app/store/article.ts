import { observable, action } from 'mobx';
import axios from 'axios';

import { INews, IAppState } from '~/interfaces';

export class ArticleStore {
  @observable
  public data: INews = {};

  @action
  public async fetch(_id: number) {
    if (this.data != null && this.data._id !== _id) {
      console.log(this.data);
      const { data } = await axios.get(`/api/article`, { params: { _id } });

      this.data = data;
    }
  }

  @action
  public inject(appState: IAppState) {
    this.data = appState.article || {};
  }
}
