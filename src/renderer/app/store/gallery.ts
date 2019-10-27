import { observable } from 'mobx';

import { IGallerySection } from '~/interfaces';

export class GalleryStore {
  @observable
  public items: IGallerySection[];
}
