import { action, observable } from 'mobx';

import { StoreBase } from '../models';
import { IAppState, IGallerySection } from '~/interfaces';
import { callApi } from '../utils';

export class GalleryStore extends StoreBase {
  @observable
  public sections: IGallerySection[] = [];

  public inject({ gallerySections }: IAppState) {
    if (gallerySections) {
      this.sections = gallerySections;
      this.loaded = true;
    }
  }

  @action
  public load() {
    if (!this.loaded) {
      this.loadSections();
      this.loaded = true;
    }
  }

  @action
  public async loadSections() {
    this.sections = await callApi<IGallerySection[]>('gallery');
  }
}
