import { action, observable } from 'mobx';

import { StoreBase } from '../models';
import { IAppState, INews } from '~/interfaces';
import { callApi } from '../utils';

export class ArticleStore extends StoreBase {
  @observable
  public data: INews = {};

  public inject({ article }: IAppState) {
    if (article) {
      this.data = article;
      this.loaded = true;
    }
  }

  @action
  public load(id: string) {
    const _id = parseInt(id);

    if (!Number.isInteger(_id)) return;

    if (this.data._id !== _id) {
      this.loadArticle(_id);
      this.loaded = true;
    }
  }

  @action
  public async loadArticle(_id: number) {
    this.data = await callApi<INews>('article', { _id });
  }
}
