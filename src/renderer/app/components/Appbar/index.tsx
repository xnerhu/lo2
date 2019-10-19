import * as React from 'react';

import { useStore } from '../../store';
import { ContextMenuContent } from '../../store/context-menu';
import { INavigationPage } from '../../interfaces';
import { Title, Navbar, StyledNavItem } from './style';

const NavItem = ({ menuType, selected, children }: { menuType?: ContextMenuContent, selected?: boolean, children: any }) => {
  const store = useStore();

  const onMouseEnter = menuType && React.useCallback(e => {
    store.contextMenu.show(menuType, e, true);
  }, []);

  return (
    <StyledNavItem onMouseEnter={onMouseEnter} selected={selected}>
      {children}
    </StyledNavItem>
  );
}

export const Appbar = () => {
  return (
    <>
      <Title>Publiczne Liceum Ogólnokształcące Nr II w Opolu</Title>
      <Navbar>
        <NavItem selected>Strona główna</NavItem>
        <NavItem menuType='about'>O nas</NavItem>
        <NavItem>Aktualności</NavItem>
        <NavItem>Galeria</NavItem>
        <NavItem>Dla uczniów</NavItem>
        <NavItem>Dla rodziców</NavItem>
        <NavItem>Rekrutacja</NavItem>
        <NavItem>Kontakt</NavItem>
      </Navbar>
    </>
  );
}
