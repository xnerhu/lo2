import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { NAVIGATION_ITEMS } from '../../constants';
import { INavigationItem } from '../../interfaces';
import { Title, Navbar, StyledNavItem, MenuButton } from './style';

interface Props extends RouteComponentProps {
  data: INavigationItem;
}

const NavItem = withRouter(({ data, location }: Props) => {
  const store = useStore();

  const { to, label } = data;
  const selected = to === location.pathname;

  const onClick = React.useCallback(() => {
    store.menu.visible = false;
  }, []);

  return (
    <StyledNavItem to={to} selected={selected} onClick={onClick}>
      {label}
    </StyledNavItem>
  );
});

export const Appbar = observer(() => {
  const store = useStore();

  const onMenuClick = React.useCallback(() => {
    store.menu.visible = !store.menu.visible;
  }, []);

  return (
    <>
      <Title>Publiczne Liceum Ogólnokształcące Nr II w Opolu</Title>
      <Navbar visible={store.menu.visible}>
        {NAVIGATION_ITEMS.map(r => (
          <NavItem key={r.to} data={r}></NavItem>
        ))}
      </Navbar>
      <MenuButton onClick={onMenuClick} />
    </>
  );
});
