import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { StyledSlider, Controls, Control, Arrow } from './style';

export const Slider = observer(() => {
  const store = useStore();
  const { selected, fetched } = store.slider;

  const onControlClick = (index: number) => () => {
    store.slider.selectedIndex = index;
  }

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0
  }

  return (
    <StyledSlider>
      <Image src={selected} forceSkeleton={!fetched} style={style} />
      <Controls>
        {store.slider.items.map((r, index) => (
          <Control key={r} onClick={onControlClick(index)} selected={selected === r} />
        ))}
      </Controls>
      {fetched && (
        <>
          <Arrow className='arrow' onClick={store.slider.switchLeft} />
          <Arrow className='arrow' onClick={store.slider.switchRight} right />
        </>
      )}
    </StyledSlider>
  );
});
