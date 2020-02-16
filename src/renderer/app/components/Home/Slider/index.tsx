import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Content } from '~/renderer/components/Section';
import { Carousel } from '~/renderer/components/Carousel';

export const Slider = observer(() => {
  const store = useStore();

  return (
    <Content>
      <Carousel items={store.home.sliderItems} />
    </Content>
  );
});
