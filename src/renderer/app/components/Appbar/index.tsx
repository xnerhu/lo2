import * as React from 'react';

import { useStore } from '../../store';
import { Title, Navbar, StyledNavItem } from './style';

const NavItem = ({ selected, children }: { selected?: boolean, children: any }) => {
  const store = useStore();

  return (
    <StyledNavItem selected={selected}>
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
        <NavItem>O nas</NavItem>
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
