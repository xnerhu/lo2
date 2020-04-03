import React from 'react';

import { Slider } from './Slider';
import { Shortcuts } from './Shortcuts';
import { ShortNews } from './News';
import { usePage } from '../../utils/hooks';
import { IHomePageData } from '~/interfaces';

export default () => {
  const data = usePage<IHomePageData>('home');

  return (
    <>
      <Slider items={data.sliderItems ?? []} />
      <Shortcuts />
      <ShortNews items={data.articles ?? []} />
    </>
  );
};
