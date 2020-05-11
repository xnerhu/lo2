import React from 'react';
import loadable from '@loadable/component';

import { useScroll } from '~/renderer/hooks/scroll';
import { Bottombar } from './Bottombar';

const LazyMenu = loadable(() => import('./Menu'), {
  ssr: true,
});

export const MobileNav = () => {
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
