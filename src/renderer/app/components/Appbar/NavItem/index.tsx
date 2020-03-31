import React from 'react';
import { withRouter } from 'react-router';

import { IRouterProps, INavItem } from '~/renderer/app/interfaces';
import { Menu } from '../Menu';
import { MenuItem } from '../Menu/style';
import { StyledNavItem, ExpandIcon, Link } from './style';
import { isAppbarItemSelected } from '~/renderer/app/utils/navigation';

interface Props extends INavItem {
  onClick?: () => void;
}

export const NavItem = withRouter((props: IRouterProps<Props>) => {
  const { onClick, to, label, location, subpages, useDefaultLink } = props;
  const selected = React.useMemo(() => isAppbarItemSelected(props), [
    location.pathname,
  ]);

  return (
    <StyledNavItem onClick={onClick}>
      <Link
        to={to}
        selected={selected}
        hasSubpages={!!subpages}
        useDefaultLink={useDefaultLink}
      >
        {label}
      </Link>
      {subpages && (
        <>
          <ExpandIcon />
          <Menu>
            {subpages.map((r) => (
              <MenuItem
                key={r.label}
                to={r.to}
                useDefaultLink={r.useDefaultLink}
              >
                {r.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </StyledNavItem>
  );
});
