import React from 'react';
import { withRouter } from 'react-router-dom';

import { ICON_MENU } from '~/renderer/constants/icons';
import { mobileNavMap } from '../../constants/navigation';
import { IRouterProps } from '~/renderer/interfaces';
import { IMobileNavItem } from '../../interfaces';
import { isNavItemSelected } from '../../utils/navigation';
import { StyledBottombar, StyledItem } from './style';

const NavItem = withRouter((props: IRouterProps<IMobileNavItem>) => {
  const { path, icon } = props;
  const selected = isNavItemSelected(props);

  return <StyledItem to={path} icon={icon} selected={selected} />;
});

export const Bottombar = () => {
  return (
    <StyledBottombar>
      {mobileNavMap.map((r) => (
        <NavItem key={r.path} {...r} />
      ))}
      <StyledItem icon={ICON_MENU} />
    </StyledBottombar>
  );
};
