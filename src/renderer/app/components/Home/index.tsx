import * as React from 'react';

import { Slider } from './Slider';
import { ShortNews } from './News';
import { Shortcuts } from './Shortcuts';

export const Home = () => {
  return (
    <>
      <Slider />
      <Shortcuts />
      <ShortNews />
    </>
  );
};
