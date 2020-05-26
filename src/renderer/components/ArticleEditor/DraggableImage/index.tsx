import React from 'react';
import { IPosition } from 'spatium';

import { StyledDraggableImg, Img } from './style';

interface Props {
  src: string;
  scale: number;
  onChange?: (offset: IPosition) => void;
}

const createTransform = ([x, y]: IPosition, scale: number) => {
  return `translate(${x}px, ${y}px) scale(${scale})`;
};

export const DraggableImg = ({ src, scale, onChange }: Props) => {
  const containerRef = React.useRef<HTMLDivElement>();
  const imgRef = React.useRef<HTMLImageElement>();

  const startPos = React.useRef<IPosition>();
  const offset = React.useRef<IPosition>([0, 0]);

  const [active, setActive] = React.useState(false);

  const update = React.useCallback(() => {
    imgRef.current.style.transform = createTransform(offset.current, scale);
  }, [scale]);

  const onMouseDown = React.useCallback((e: React.MouseEvent) => {
    const [x, y] = offset.current;

    startPos.current = [e.pageX - x, e.pageY - y];
    setActive(true);
  }, []);

  const onWindowMouseMove = React.useCallback(
    (e: MouseEvent) => {
      const containerRect = containerRef.current.getBoundingClientRect();
      const imgRect = imgRef.current.getBoundingClientRect();
      const [startX, startY] = startPos.current;

      const xPos = (imgRect.width - containerRect.width) / 2;
      const x = Math.max(Math.min(xPos, e.pageX - startX), -xPos);

      const yPos = Math.ceil((imgRect.height - containerRect.height) / 2);
      const y = Math.max(
        Math.min(yPos, e.pageY - startY),
        -yPos + 3 * (scale - 1),
      );

      offset.current = [x, y];

      update();
      onChange(offset.current);
    },
    [onChange, update, scale],
  );

  const onWindowMouseUp = React.useCallback(() => {
    setActive(false);
  }, []);

  React.useEffect(() => {
    if (active) {
      window.addEventListener('mousemove', onWindowMouseMove);
      window.addEventListener('mouseup', onWindowMouseUp);
    } else {
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
    }
  }, [active, onWindowMouseMove]);

  return (
    <StyledDraggableImg ref={containerRef} onMouseDown={onMouseDown}>
      <Img
        ref={imgRef}
        src={src}
        draggable={false}
        style={{ transform: createTransform(offset.current, scale) }}
      />
    </StyledDraggableImg>
  );
};
