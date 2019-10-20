import { observable } from 'mobx';

export class SliderStore {
  @observable
  public items: string[] = [];

  @observable
  public selected: string;
}
