import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { StyledAppbar, MenuItems, StyledMenuItem } from './style';
import { icons, navigationItems } from '~/renderer/constants';
import { INavItem, IRouterProps } from '../../interfaces';
import { isAppbarItemSelected } from '../../utils';

const MenuItem = withRouter((props: IRouterProps<INavItem>) => {
  const { to, label, location } = props;
  const selected = React.useMemo(() => isAppbarItemSelected(props), [
    location.pathname,
  ]);

  return (
    <StyledMenuItem selected={selected} to={to}>
      {label}
    </StyledMenuItem>
  );
});

export const Appbar = observer(() => {
  const store = useStore();

  return (
    <StyledAppbar>
      <img height={56} src={icons.banner} alt="logo szkoły" />
      <MenuItems>
        {navigationItems.map(r => (
          <MenuItem key={r.to} {...r} />
        ))}
      </MenuItems>
    </StyledAppbar>
  );
});

// <MenuItem>Aktualności</MenuItem>
// <MenuItem>O nas</MenuItem>
// <MenuItem>Gazetka</MenuItem>
// <MenuItem>Dla uczniów</MenuItem>
// <MenuItem>Dla rodziców</MenuItem>
// <MenuItem>Rekrutacja</MenuItem>
// <MenuItem>Kontakt</MenuItem>
