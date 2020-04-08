import React from 'react';

import { Slider } from './Slider';
import { Shortcuts } from './Shortcuts';
import { Articles } from './Articles';
import { usePage } from '../../utils/hooks';
import { IHomePageData } from '~/interfaces';

export default () => {
  const [data] = usePage<IHomePageData>('home');

  return (
    <>
      <Slider items={data.sliderItems ?? []} />
      <Shortcuts />
      <Articles items={data.articles ?? []} />
    </>
  );
};
