import * as React from 'react';
import { observable, action } from 'mobx';

import { getMenuPosition } from '~/renderer/app/utils';
import { IPos } from '../interfaces';

export type ContextMenuContent = 'about';

export class ContextMenuStore {
  @observable
  public visible = false;

  @observable
  public pos: IPos = {
    top: 0,
    left: 0
  }

  @observable
  public content: ContextMenuContent = 'about';

  public ref = React.createRef<HTMLDivElement>();

  private target: HTMLElement;

  private hovered = false;

  private targetHovered = false;

  constructor() {
    if (typeof window === 'object') {
      window.removeEventListener('mousedown', this.onWindowMouseDown);
      window.addEventListener('mousedown', this.onWindowMouseDown);
    }
  }

  @action
  private onWindowMouseDown = () => {
    this.visible = false;
  }

  @action
  public show = (content: ContextMenuContent, e: React.MouseEvent | MouseEvent, hover = false) => {
    this.content = content;
    this.visible = true;

    let pos: IPos = {};

    if (!hover) {
      pos = {
        top: e.pageY,
        left: e.pageX
      }

      this.target = null;
    } else {
      this.target = e.target as HTMLElement;
      this.targetHovered = true;

      const { bottom, left } = this.target.getBoundingClientRect();

      pos = { top: bottom, left };

      this.target.addEventListener('mouseleave', this.onMouseLeave(true));
    }

    this.pos = getMenuPosition(this.ref.current, pos);
  }

  public onMouseLeave = (target = false) => () => {
    if (target) {
      this.targetHovered = false;
    } else {
      this.hovered = false;
    }

    requestAnimationFrame(() => {
      if (target ? !this.hovered : !this.targetHovered) {
        this.hide();
      }
    });
  }

  public onMouseEnter = () => {
    this.hovered = true;
  }

  @action
  public hide() {
    this.visible = false;
  }
}
