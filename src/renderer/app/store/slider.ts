import { observable } from 'mobx';

import { ISliderItem } from '~/interfaces';

export class SliderStore {
  @observable
  public items: ISliderItem[] = [];

  @observable
  public selected: ISliderItem;
}
