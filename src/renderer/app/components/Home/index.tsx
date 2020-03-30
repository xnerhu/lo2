import React from 'react';

import { Slider } from './Slider';
import { Shortcuts } from './Shortcuts';
import { ShortNews } from './News';
import { usePage } from '../../utils/hooks';
import { IHomePagePacket } from '~/interfaces';

export default () => {
  const data = usePage<IHomePagePacket>('home', 'homePage');

  return (
    <>
      <Slider items={data?.sliderItems} />
      <Shortcuts />
      <ShortNews items={data?.news} />
    </>
  );
};
