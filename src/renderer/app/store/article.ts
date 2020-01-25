import { action, observable } from 'mobx';

import { StoreBase } from '../models';
import { IAppState, INews } from '~/interfaces';
import { callApi } from '../utils';

export class ArticleStore extends StoreBase {
  @observable
  public data: INews = {};

  @observable
  public proposedNews: INews[] = [];

  public inject({ article, proposedNews }: IAppState) {
    if (article && proposedNews) {
      this.data = article;
      this.proposedNews = proposedNews;
      this.loaded = true;
    }
  }

  @action
  public load(id: string) {
    const _id = parseInt(id);

    if (!Number.isInteger(_id)) return;

    if (this.data.id !== _id) {
      this.loadArticle(_id);
      this.loadProposed(_id);
      this.loaded = true;
    }
  }

  @action
  public async loadArticle(id: number) {
    this.data = await callApi<INews>('article', { id });
  }

  @action
  public async loadProposed(id: number) {
    this.proposedNews = await callApi<INews[]>('proposed-news', { id });
  }
}
