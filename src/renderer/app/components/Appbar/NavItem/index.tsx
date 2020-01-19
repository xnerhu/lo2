import * as React from 'react';
import { withRouter } from 'react-router';

import { IRouterProps, INavItem } from '~/renderer/app/interfaces';
import { isAppbarItemSelected } from '~/renderer/app/utils';
import { Menu } from '../Menu';
import { MenuItem } from '../Menu/style';
import { StyledNavItem, ExpandIcon } from './style';

export const NavItem = withRouter((props: IRouterProps<INavItem>) => {
  const { to, label, location, subpages } = props;
  const selected = React.useMemo(() => isAppbarItemSelected(props), [
    location.pathname,
  ]);

  return (
    <StyledNavItem
      to={to}
      selected={selected}
      hasSubpages={subpages && !!subpages.length}
    >
      {label}
      {subpages && (
        <>
          <ExpandIcon />
          <Menu>
            {subpages.map(r => (
              <MenuItem key={r.label} to={r.to}>
                {r.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
    </StyledNavItem>
  );
});
