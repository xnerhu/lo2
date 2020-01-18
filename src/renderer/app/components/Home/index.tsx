import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { Shortcuts } from './Shortcuts';
import { ShortNews } from './News';
import { Carousel } from '~/renderer/components/Carousel';
import { Content } from '~/renderer/components/Section';

const Slider = observer(() => {
  const store = useStore();

  return (
    <Content>
      <Carousel items={store.home.sliderItems} />
    </Content>
  );
});

export default () => {
  return (
    <>
      <Slider />
      <Shortcuts />
      <ShortNews />
    </>
  );
};
