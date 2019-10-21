import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Image } from '~/renderer/components/Image';
import { StyledSlider, Controls, Control } from './style';

export const Slider = observer(() => {
  const store = useStore();
  const selected = store.slider.selected;

  const onControlClick = (url: string) => () => {
    store.slider.selected = url;
  }

  const style: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0
  }

  return (
    <StyledSlider>
      <Image src={selected} forceSkeleton={!store.slider.fetched} style={style} />
      <Controls>
        {store.slider.items.map(r => (
          <Control key={r} onClick={onControlClick(r)} selected={selected === r} />
        ))}
      </Controls>
    </StyledSlider>
  );
});
