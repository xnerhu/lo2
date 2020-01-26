import * as React from 'react';
import { withRouter } from 'react-router';

import { IRouterProps, INavItem } from '~/renderer/app/interfaces';
import { isAppbarItemSelected } from '~/renderer/app/utils';
import { Menu } from '../Menu';
import { MenuItem } from '../Menu/style';
import { StyledNavItem, ExpandIcon, Link } from './style';

export const NavItem = withRouter((props: IRouterProps<INavItem>) => {
  const { to, label, location, subpages, useDefaultLink } = props;
  const selected = React.useMemo(() => isAppbarItemSelected(props), [
    location.pathname,
  ]);

  return (
    <StyledNavItem>
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
            {subpages.map(r => (
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
