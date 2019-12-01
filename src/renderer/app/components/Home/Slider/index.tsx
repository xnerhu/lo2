import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { StyledSlider, Controls, Control, Arrow } from './style';

export const Slider = observer(() => {
  const store = useStore();
  const items = store.home.sliderItems;

  const [selected, setSelected] = React.useState(0);

  const selectedUrl = React.useMemo(() => {
    if (!items || !items.length) return null;
    return items[selected];
  }, [selected, items]);

  const onControlClick = (index: number) => () => {
    setSelected(index);
  }

  const onSwitchLeft = React.useCallback(() => {
    setSelected(selected - 1 < 0 ? items.length - 1 : selected - 1);
  }, [selected]);

  const onSwitchRight = React.useCallback(() => {
    setSelected(selected + 1 >= items.length ? 0 : selected + 1);
  }, [selected]);

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0
  }

  return (
    <StyledSlider>
      <Image alt='slider' src={selectedUrl} forceSkeleton={!store.home.sliderReady} style={style} cache />
      <Controls>
        {items.map((r, index) => (
          <Control key={r} onClick={onControlClick(index)} selected={selectedUrl === r} />
        ))}
      </Controls>
      {store.home.sliderReady && (
        <>
          <Arrow className='arrow' onClick={onSwitchLeft} />
          <Arrow className='arrow' onClick={onSwitchRight} right />
        </>
      )}
    </StyledSlider>
  );
});
