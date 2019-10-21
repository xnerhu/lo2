import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { useStore } from '../../store';
import { Title, Navbar, StyledNavItem } from './style';

interface Props extends RouteComponentProps {
  to: string;
  children: any;
}

const NavItem = withRouter(({ to, children, location }: Props) => {
  const selected = to === location.pathname;

  return (
    <StyledNavItem to={to} selected={selected}>
      {children}
    </StyledNavItem>
  );
});

export const Appbar = () => {
  return (
    <>
      <Title>Publiczne Liceum Ogólnokształcące Nr II w Opolu</Title>
      <Navbar>
        <NavItem to='/'>Strona główna</NavItem>
        <NavItem to='/about'>O nas</NavItem>
        <NavItem to='/news'>Aktualności</NavItem>
        <NavItem to='/gallery'>Galeria</NavItem>
        <NavItem to='/students'>Dla uczniów</NavItem>
        <NavItem to='/parents'>Dla rodziców</NavItem>
        <NavItem to='/recruitment'>Rekrutacja</NavItem>
        <NavItem to='/contact'>Kontakt</NavItem>
      </Navbar>
    </>
  );
};
