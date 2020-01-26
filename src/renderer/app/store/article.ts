import { action, observable } from 'mobx';

import { IAppState, INews, IArticleChunk } from '~/interfaces';
import { callApi } from '../utils';

export class ArticleStore {
  @observable
  public data: INews = {};

  @observable
  public proposedNews: INews[] = [];

  @observable
  public error = false;

  public inject({ article }: IAppState) {
    if (article) {
      this.update(article);
    }
  }

  public async fetch(label: string) {
    if (this.data && this.data.label === label) return;

    const data = await callApi<IArticleChunk>('article', { label });

    this.update(data);
  }

  @action
  protected update(article: IArticleChunk) {
    const { data, proposed, error } = article;

    this.data = data;
    this.proposedNews = proposed;
    this.error = error;
  }
}
