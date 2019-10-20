import { observable } from 'mobx';

export class SliderStore {
  @observable
  public items: string[] = [];

  @observable
  public selected: string;

  public timer: number;

  public updateTimer() {
    clearTimeout(this.timer);

    this.timer = setTimeout(() => {
      let index = this.items.indexOf(this.selected);

      if (++index > this.items.length - 1) {
        index = 0;
      }

      this.selected = this.items[index];

      this.updateTimer();
    }, 10 * 1000);
  }
}
