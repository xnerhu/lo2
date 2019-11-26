import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Menu } from './Menu';
import { Icon } from '~/renderer/components/Icon';
import { icons } from '~/renderer/constants';
import { Content } from '~/renderer/components/Section';
import { MenuItem } from './Menu/style';
import { Header, Navbar, StyledNavItem, MenuButton, ExpandIcon } from './style';

interface Props extends RouteComponentProps {
  label: string;
  to?: string;
  children?: React.ReactNode;
}

const NavItem = withRouter(({ label, to, children, location }: Props) => {
  const [expanded, setExpanded] = React.useState(true);

  const store = useStore();

  const { pathname } = location;
  const selected = to && (to === '/' ? pathname === to : pathname.startsWith(to));

  const onClick = React.useCallback(() => {
    if (to) {
      store.menu.visible = false;
    } else {
      setExpanded(!expanded);
    }
  }, [expanded, to]);

  return (
    <>
      <StyledNavItem to={to} selected={selected} onClick={onClick}>
        {label}
        {!to && <ExpandIcon src={icons.chevron} size={24} expanded={expanded} />}
        {expanded && children}
      </StyledNavItem>
    </>
  );
});

export const Appbar = observer(() => {
  const store = useStore();

  const onMenuClick = React.useCallback(() => {
    store.menu.visible = !store.menu.visible;
  }, []);

  return (
    <Content>
      <Header>Publiczne Liceum Ogólnokształcące Nr II w Opolu</Header>
      <Navbar>
        <NavItem to='/' label='Strona główna' />
        <NavItem label='O nas'>
          <Menu>
            <MenuItem>Nauczyciele</MenuItem>
            <MenuItem>Nasza patronka</MenuItem>
            <MenuItem>Statut szkoły</MenuItem>
            <MenuItem>Historia szkoły</MenuItem>
            <MenuItem>Osiągnięcia</MenuItem>
            <MenuItem>Piszą o nas</MenuItem>
          </Menu>
        </NavItem>
        <NavItem to='/news' label='Aktualności' />
        <NavItem to='/gallery' label='Galeria' />
        <NavItem to='/students' label='Dla uczniów' />
        <NavItem to='/parents' label='Dla rodziców' />
        <NavItem to='/recruitment' label='Rekrutacja' />
        <NavItem to='/contact' label='Kontakt' />
      </Navbar>
      <MenuButton onClick={onMenuClick} />
    </Content>
  );
});
