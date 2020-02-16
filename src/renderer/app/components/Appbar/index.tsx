import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { icons, navigationItems } from '~/renderer/constants';
import { NavItem } from './NavItem';
import {
  StyledAppbar,
  Banner,
  BannerImg,
  NavItems,
  MenuIcon,
  Container,
  Placeholder,
} from './style';

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
          <Banner to="/" aria-label="logo szkoły">
            <BannerImg src={icons.banner} draggable={false} alt="logo szkoły" />
          </Banner>
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
