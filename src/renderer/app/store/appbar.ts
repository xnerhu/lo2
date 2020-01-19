import { observable, action } from 'mobx';

import { IS_BROWSER, APPBAR_MOBILE_VIEW } from '~/renderer/constants';

export class AppbarStore {
  @observable
  public expanded = false;

  @observable
  public hideShadow = true;

  @observable
  public visible = true;

  protected lastScrollPos = 0;

  constructor() {
    if (IS_BROWSER) {
      window.removeEventListener('scroll', this.onScroll);
      window.addEventListener('scroll', this.onScroll);
    }
  }

  @action
  public onMenuButtonClick = () => {
    this.expanded = !this.expanded;

    document.body.style.overflowY = this.expanded ? 'hidden' : 'auto';
  };

  @action
  public onScroll = () => {
    if (window.innerWidth <= APPBAR_MOBILE_VIEW) {
      this.hideShadow = window.scrollY <= 16;

      if (window.scrollY >= 16) {
        this.visible = window.scrollY < this.lastScrollPos;
      }

      this.lastScrollPos = window.scrollY;
    }
  };
}
