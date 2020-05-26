import React from 'react';
import { IPosition } from 'spatium';

import { StyledCanvas } from './style';

interface Props {
  src: string;
  width: number;
  height: number;
}

export class Canvas extends React.PureComponent<Props> {
  private ref = React.createRef<HTMLCanvasElement>();

  private imgRef: HTMLImageElement;

  private active = false;

  private startPos: IPosition;

  private startCursorPos: IPosition;

  private offset: IPosition = [0, 0];

  private ctxInstance: CanvasRenderingContext2D;

  public addImg(img: HTMLImageElement) {
    this.imgRef = img;
    this.ctx.drawImage(img, 0, 0);
  }

  private get ctx() {
    if (!this.ctxInstance) {
      this.ctxInstance = this.ref.current.getContext('2d');
    }

    return this.ctxInstance;
  }

  private removeListeners() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
  }

  private onMouseDown = (e: React.MouseEvent) => {
    const [x, y] = this.offset;

    this.active = true;
    this.startPos = [e.pageX - x, e.pageY - y];
    this.startCursorPos = [e.pageX, e.pageY];

    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
  };

  private onWindowMouseMove = (e: MouseEvent) => {
    const [startX, startY] = this.startPos;
    const offset: IPosition = [e.pageX - startX, e.pageY - startY];

    this.offset = offset;
    this.update();
  };

  private onWindowMouseUp = () => {
    this.active = false;
    this.removeListeners();
  };

  private update() {
    const [x, y] = this.offset;

    this.ctx.setTransform(x, y);
  }

  render() {
    const { width, height } = this.props;

    return (
      <StyledCanvas
        ref={this.ref}
        onMouseDown={this.onMouseDown}
        width={width}
        height={height}
        style={{ backgroundColor: 'blue' }}
      />
    );
  }
}
