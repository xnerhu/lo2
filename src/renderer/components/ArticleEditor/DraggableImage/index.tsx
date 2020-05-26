import React from 'react';
import { IPosition } from 'spatium';

import { IS_BROWSER } from '~/renderer/constants/config';
import { StyledDraggableImg, Img } from './style';

interface Props {
  src: string;
  scale: number;
  innerRef?: React.RefCallback<HTMLImageElement>;
  onChange?: (offset: IPosition) => void;
}

export class DraggableImg extends React.PureComponent<Props> {
  private containerRef = React.createRef<HTMLDivElement>();

  private imgRef: HTMLImageElement;

  private startPos: IPosition;

  private offset: IPosition = [0, 0];

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
    const { scale, onChange } = this.props;

    const containerRect = this.containerRef.current.getBoundingClientRect();
    const imgRect = this.imgRef.getBoundingClientRect();
    const [startX, startY] = this.startPos;

    const xPos = (imgRect.width - containerRect.width) / 2;
    const x = Math.max(Math.min(xPos, e.pageX - startX), -xPos);

    const yPos = Math.ceil((imgRect.height - containerRect.height) / 2);
    const y = Math.max(
      Math.min(yPos, e.pageY - startY),
      -yPos + 3 * (scale - 1),
    );

    this.offset = [x, y];
    this.update();

    onChange(this.offset);
  };

  private onWindowMouseUp = () => {
    this.removeListeners();
  };

  private update() {
    const { scale } = this.props;
    const [x, y] = this.offset;

    this.imgRef.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  render() {
    const { src, innerRef, scale } = this.props;

    return (
      <StyledDraggableImg
        ref={this.containerRef}
        onMouseDown={this.onMouseDown}
      >
        <Img
          ref={(r) => {
            this.imgRef = r;
            // if (innerRef) innerRef(r);
          }}
          src={src}
          draggable={false}
          style={{ transform: `scale(${scale})` }}
        />
      </StyledDraggableImg>
    );
  }
}
