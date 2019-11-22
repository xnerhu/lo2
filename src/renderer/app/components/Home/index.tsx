import * as React from 'react';

import { Slider } from './Slider';
import { Shortcuts } from './Shortcuts';
import { ShortNews } from './News';

export default () => {
  return (
    <>
      <Slider />
      <Shortcuts />
      <ShortNews />
    </>
  );
};
