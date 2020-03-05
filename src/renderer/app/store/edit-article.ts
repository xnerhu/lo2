import { observable, action } from 'mobx';

import { IEditArticleItem, IAppState, IEditArticlePacket } from '~/interfaces';
import { callApi } from '../utils/network';

export class EditArticleStore {
  @observable
  public data: IEditArticleItem;

  @observable
  public error = '';

  protected label: string;

  public inject({ editArticlePage }: IAppState) {
    if (editArticlePage) {
      this.update(editArticlePage);
    }
  }

  public async fetch(label: string) {
    if (this.label === label) return;

    const data = await callApi<IEditArticlePacket>('edit-article', { label });

    this.update(data);
  }

  @action
  public update(data: IEditArticlePacket) {
    this.data = data.item;
    this.label = data.label;
    this.error = !data.success && data.error;
  }

  @action
  public clear() {
    this.label = null;
  }
}
