import * as React from 'react';
import { withRouter } from 'react-router-dom';
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

  return (
    <>
      <StyledAppbar
        visible={store.appbar.visible}
        hideShadow={store.appbar.hideShadow}
      >
        <Container>
          <NavItems expanded={store.appbar.expanded}>
            {navigationItems.map(r => (
              <NavItem key={r.label} {...r} />
            ))}
          </NavItems>
          <Banner src={icons.banner} alt="logo szkoły" draggable={false} />
        </Container>
        <MenuIcon
          expanded={store.appbar.expanded}
          onClick={store.appbar.onMenuButtonClick}
        />
      </StyledAppbar>
      <Placeholder />
    </>
  );
});
