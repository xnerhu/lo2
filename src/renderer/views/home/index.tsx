import React from 'react';

import { IHomePageData } from '~/interfaces';
import { usePage } from '../../hooks/network';
import { Slider } from './components/Slider';
import { Shortcuts } from './components/Shortcuts';
import { Articles } from './components/Articles';
import { Background } from '~/renderer/components/Section';

export default () => {
  const [data] = usePage<IHomePageData>('home');

  return (
    <>
      <Background>
        <Slider items={data?.sliderItems} />
        <Shortcuts />
      </Background>
      <Articles items={data?.articles} />
    </>
  );
};
