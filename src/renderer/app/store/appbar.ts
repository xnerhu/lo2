import { observable, action } from 'mobx';

export class AppbarStore {
  @observable
  public expanded = false;

  @action
  public onMenuButtonClick = () => {
    this.expanded = !this.expanded;
  }
}
