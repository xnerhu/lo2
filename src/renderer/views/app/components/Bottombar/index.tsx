import React from 'react';
import { withRouter } from 'react-router-dom';
import loadable from '@loadable/component';

import { ICON_MENU } from '~/renderer/constants/icons';
import { mobileNavMap } from '../../constants/navigation';
import { IRouterProps } from '~/renderer/interfaces';
import { IMobileNavItem } from '../../interfaces';
import { isNavItemSelected } from '../../utils/navigation';
import { StyledBottombar, StyledItem } from './style';

const LazyMenu = loadable(() => import('./Menu'), {
  ssr: true,
});

const NavItem = withRouter((props: IRouterProps<IMobileNavItem>) => {
  const { path, icon } = props;
  const selected = isNavItemSelected(props);

  return <StyledItem to={path} icon={icon} selected={selected} />;
});

export const Bottombar = () => {
  const [menuVisible, toggleMenu] = React.useState(false);

  const onMenuClick = React.useCallback(() => {
    toggleMenu(true);
  }, []);

  const onMenuClose = React.useCallback(() => {
    toggleMenu(false);
  }, []);

  return (
    <>
      <StyledBottombar>
        {mobileNavMap.map((r) => (
          <NavItem key={r.path} {...r} />
        ))}
        <StyledItem icon={ICON_MENU} onClick={onMenuClick} />
      </StyledBottombar>
      {menuVisible && <LazyMenu onClose={onMenuClose} />}
    </>
  );
};
