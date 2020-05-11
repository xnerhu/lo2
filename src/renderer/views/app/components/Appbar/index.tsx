import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { ICON_BANNER } from '~/renderer/constants/icons';
import { navMap } from '../../constants/navigation';
import { INavItem } from '../../interfaces';
import { IRouterProps } from '~/renderer/interfaces';
import { isNavItemSelected } from '../../utils/navigation';
import { StyledAppbar, Banner, StyledNavItem, Container } from './style';

const NavItem = withRouter((props: IRouterProps<INavItem>) => {
  const { path, label } = props;
  const selected = isNavItemSelected(props);
  return (
    <StyledNavItem to={path} selected={selected}>
      {label}
    </StyledNavItem>
  );
});

export const Appbar = () => {
  return (
    <StyledAppbar>
      <Link to="/" aria-label="logo szkoły">
        <Banner src={ICON_BANNER} draggable={false} alt="logo szkoły" />
      </Link>
      <Container>
        {navMap.map((r) => (
          <NavItem key={r.path} {...r} />
        ))}
      </Container>
    </StyledAppbar>
  );
};
