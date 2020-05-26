import React from 'react';
import { IPosition } from 'spatium';

import { IS_BROWSER } from '~/renderer/constants/config';
import { StyledDraggableImg, Img } from './style';

const createTransform = ([x, y]: IPosition, scale: number) => {
  return `translate(${x}px, ${y}px) scale(${scale})`;
};

interface Props {
  src: string;
  onChange?: (offset: IPosition) => void;
}

export class DraggableImg extends React.PureComponent<Props> {
  private containerRef = React.createRef<HTMLDivElement>();

  private imgRef = React.createRef<HTMLImageElement>();

  private startPos: IPosition;

  private offset: IPosition = [0, 0];

  private scale = 1;

  constructor(props: Props) {
    super(props);

    if (IS_BROWSER) {
      this.removeListeners();
    }
  }

  private removeListeners() {
    window.removeEventListener('mousemove', this.onWindowMouseMove);
    window.removeEventListener('mouseup', this.onWindowMouseUp);
  }

  private onMouseDown = (e: React.MouseEvent) => {
    const [x, y] = this.offset;

    this.startPos = [e.pageX - x, e.pageY - y];

    window.addEventListener('mousemove', this.onWindowMouseMove);
    window.addEventListener('mouseup', this.onWindowMouseUp);
  };

  private onWindowMouseMove = (e: MouseEvent) => {
    const { onChange } = this.props;

    const containerRect = this.containerRef.current.getBoundingClientRect();
    const imgRect = this.imgRef.current.getBoundingClientRect();
    const [startX, startY] = this.startPos;

    const xPos = (imgRect.width - containerRect.width) / 2;
    const x = Math.max(Math.min(xPos, e.pageX - startX), -xPos);

    const yPos = Math.ceil((imgRect.height - containerRect.height) / 2);
    const y = Math.max(
      Math.min(yPos, e.pageY - startY),
      -yPos + 3 * (this.scale - 1),
    );

    this.offset = [x, y];
    this.update();

    onChange(this.offset);
  };

  private onWindowMouseUp = () => {
    this.removeListeners();
  };

  private update() {
    this.imgRef.current.style.transform = createTransform(
      this.offset,
      this.scale,
    );
  }

  public setScale(scale: number) {
    const delta = scale - this.scale;

    this.scale = scale;
    this.update();

    if (delta < 0) {
      this.fixRect();
    }
  }

  private fixRect() {
    const containerRect = this.containerRef.current.getBoundingClientRect();
    const imgRect = this.imgRef.current.getBoundingClientRect();
    const xPos = (imgRect.width - containerRect.width) / 2;
    const yPos = Math.ceil((imgRect.height - containerRect.height) / 2);

    let [x, y] = this.offset;

    x = Math.max(Math.min(xPos, x), -xPos);
    y = Math.max(Math.min(yPos, y), -yPos);

    this.offset = [x, y];
    this.update();
  }

  render() {
    const { src } = this.props;

    return (
      <StyledDraggableImg
        ref={this.containerRef}
        onMouseDown={this.onMouseDown}
      >
        <Img
          ref={this.imgRef}
          src={src}
          draggable={false}
          style={{ transform: createTransform(this.offset, this.scale) }}
        />
      </StyledDraggableImg>
    );
  }
}
