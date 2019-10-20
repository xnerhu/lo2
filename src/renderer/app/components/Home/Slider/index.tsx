import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { ISliderItem } from '~/renderer/app/interfaces';
import { Skeleton } from '~/renderer/components/Skeleton';
import { StyledSlider, Image, Controls, Control } from './style';

export const Slider = observer(() => {
  const store = useStore();
  const selected = store.slider.selected;

  const onControlClick = (item: ISliderItem) => () => {
    store.slider.select(item);
  }

  const skeletonStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    position: 'absolute'
  }

  return (
    <StyledSlider>
      <Image src={selected && selected.url} fetched={selected.fetched} />
      {!selected.fetched && <Skeleton style={skeletonStyle} />}
      <Controls>
        {store.slider.items.map(r => (
          <Control key={r.url} onClick={onControlClick(r)} selected={selected === r} />
        ))}
      </Controls>
    </StyledSlider>
  );
});
