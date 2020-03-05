import { action, observable } from 'mobx';

import { IAppState, INews, IArticlePagePacket } from '~/interfaces';
import { callApi } from '../utils/network';

export class ArticleStore {
  @observable
  public data: INews = {};

  @observable
  public proposedNews: INews[] = [];

  @observable
  public error = false;

  @observable
  public editable = false;

  public inject({ articlePage }: IAppState) {
    if (articlePage) {
      this.update(articlePage);
    }
  }

  public async fetch(label: string) {
    if (this.data && this.data.label === label) return;

    const data = await callApi<IArticlePagePacket>('article', { label });

    this.update(data);
  }

  @action
  protected update(article: IArticlePagePacket) {
    const { data, proposed, error, editable } = article;

    this.data = data;
    this.proposedNews = proposed;
    this.error = error;
    this.editable = editable;
  }

  @action
  public clear() {
    this.data = {};
  }
}
