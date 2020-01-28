import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { Slider } from './Slider';
import { Shortcuts } from './Shortcuts';
import { ShortNews } from './News';

export default observer(() => {
  const store = useStore();

  React.useEffect(() => {
    store.home.fetchAll();
  }, []);

  return (
    <>
      <Slider />
      <Shortcuts />
      <ShortNews />
    </>
  );
});
