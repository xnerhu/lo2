import React from 'react';

import { IHomePageData } from '~/interfaces';
import { usePage } from '../../hooks/network';
import { Slider } from './components/Slider';
import { Shortcuts } from './components/Shortcuts';
// import { Slider } from './Slider';
// import { Shortcuts } from './Shortcuts';
// import { Articles } from './Articles';

export default () => {
  const [data] = usePage<IHomePageData>('home');

  return (
    <>
      <Slider items={data?.sliderItems ?? []} />
      <Shortcuts />
      {/*<Articles items={data.articles ?? []} /> */}
    </>
  );
};
