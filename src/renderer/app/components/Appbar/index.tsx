import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { icons, navigationItems } from '~/renderer/constants';
import {
  StyledAppbar,
  Banner,
  NavItems,
  MenuIcon,
  Container,
  Placeholder,
} from './style';
import { NavItem } from './NavItem';

export const Appbar = observer(() => {
  const store = useStore();

  const onMenuButtonClick = React.useCallback(() => {
    store.appbar.toggle(!store.appbar.expanded);
  }, []);

  const onNavItemClick = React.useCallback(() => {
    store.appbar.toggle(false);
  }, []);

  return (
    <>
      <StyledAppbar
        visible={store.appbar.visible}
        hideShadow={store.appbar.hideShadow}
      >
        <Container>
          <NavItems expanded={store.appbar.expanded}>
            {navigationItems.map(r => (
              <NavItem key={r.label} onClick={onNavItemClick} {...r} />
            ))}
          </NavItems>
          <Banner src={icons.banner} alt="logo szkoły" draggable={false} />
        </Container>
        <MenuIcon
          expanded={store.appbar.expanded}
          onClick={onMenuButtonClick}
        />
      </StyledAppbar>
      <Placeholder />
    </>
  );
});
