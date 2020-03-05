import { observable, action } from 'mobx';

import { IS_BROWSER } from '~/renderer/constants/env';
import { APPBAR_MOBILE_VIEW } from '~/renderer/constants/design';

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
      window.addEventListener('resize', this.onResize);

      requestAnimationFrame(() => {
        window.addEventListener('scroll', this.onScroll);
        window.addEventListener('resize', this.onResize);
      });
    }
  }

  @action
  public toggle = (expanded = true) => {
    this.expanded = expanded;
    this.switchScroll(!expanded);
  };

  protected switchScroll(visible: boolean) {
    document.body.style.overflowY = visible ? 'auto' : 'hidden';
  }

  @action
  protected onScroll = () => {
    if (window.innerWidth <= APPBAR_MOBILE_VIEW) {
      this.hideShadow = window.scrollY <= 16;

      if (window.scrollY >= 16) {
        this.visible = window.scrollY < this.lastScrollPos || this.expanded;
      }

      this.lastScrollPos = window.scrollY;
    }
  };

  @action
  protected onResize = () => {
    if (window.innerWidth > APPBAR_MOBILE_VIEW) {
      this.visible = true;

      if (this.expanded) {
        this.expanded = false;
        this.switchScroll(true);
      }
    }
  };
}
