import { action, observable } from 'mobx';

import { StoreBase } from '../models';
import { IAppState, IGalleryAlbum } from '~/interfaces';
import { callApi } from '../utils';

export class AlbumStore extends StoreBase {
  @observable
  public data: IGalleryAlbum = {};

  public inject({ album }: IAppState) {
    if (album) {
      this.data = album;
      this.loaded = true;
    }
  }

  @action
  public load(id: string) {
    const _id = parseInt(id);

    if (!Number.isInteger(_id)) return;

    if (this.data._id !== _id) {
      this.loadAlbum(_id);
      this.loaded = true;
    }
  }

  @action
  public async loadAlbum(_id: number) {
    this.data = await callApi<IGalleryAlbum>('album', { _id });
  }
}
