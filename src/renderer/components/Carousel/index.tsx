import * as React from 'react';

import { StyledCarousel, Arrow, Image, Controls, Control } from './style';

interface Props {
  items: string[];
}

export const Carousel = ({ items }: Props) => {
  const [selected, setSelected] = React.useState(0);
  const src = items.length && items[selected];

  const onSwitchLeft = React.useCallback(() => {
    setSelected(selected - 1 < 0 ? items.length - 1 : selected - 1);
  }, [selected]);

  const onSwitchRight = React.useCallback(() => {
    setSelected(selected + 1 >= items.length ? 0 : selected + 1);
  }, [selected]);

  const onControlClick = (index: number) => () => {
    setSelected(index);
  };

  return (
    <>
      <StyledCarousel>
        <Image alt={src} src={src} cache />
        <Arrow className="arrow" onClick={onSwitchLeft} />
        <Arrow className="arrow" onClick={onSwitchRight} right />
      </StyledCarousel>
      <Controls>
        {items.map((r, index) => (
          <Control
            key={r}
            onClick={onControlClick(index)}
            selected={r === src}
          />
        ))}
      </Controls>
    </>
  );
};
