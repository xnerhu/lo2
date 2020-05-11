import React from 'react';
import loadable from '@loadable/component';

import { useScroll } from '~/renderer/hooks/ui';
import { Bottombar } from './Bottombar';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';

const LazyMenu = loadable(() => import('./Menu'), LOADABLE_OPTIONS);

export default () => {
  const [barVisible] = useScroll();
  const [menuVisible, toggleMenu] = React.useState(false);

  const onMenuClick = React.useCallback(() => {
    toggleMenu(true);
  }, []);

  const onMenuClose = React.useCallback(() => {
    toggleMenu(false);
  }, []);

  React.useEffect(() => {
    document.body.style.overflowY = menuVisible ? 'hidden' : 'auto';
  }, [menuVisible]);

  return (
    <>
      <Bottombar visible={barVisible} onMenuClick={onMenuClick} />
      {menuVisible && <LazyMenu onClose={onMenuClose} />}
    </>
  );
};
