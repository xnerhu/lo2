import * as React from 'react';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Menu } from './Menu';
import { MOBILE_VIEW } from '~/renderer/constants';
import { MenuItem } from './Menu/style';
import { isAppbarItemSelected } from '~/renderer/app/utils';
import { StyledAppbar, Header, Navbar, StyledNavItem, ExpandIcon, MenuButton } from './style';

export interface IAppBarItemProps extends RouteComponentProps {
  label: string;
  to?: string;
  subpages?: string[];
  children?: React.ReactNode;
}

const NavItem = withRouter((props: IAppBarItemProps) => {
  const store = useStore();

  const { to, label, location, children } = props;
  const [expanded, setExpanded] = React.useState(false);
  const selected = React.useMemo(() => isAppbarItemSelected(props), [location.pathname]);

  const onClick = React.useCallback(() => {
    if (!children) {
      store.appbar.expanded = false;
    }

    if (window.innerWidth <= MOBILE_VIEW) {
      setExpanded(!expanded);
    }
  }, [expanded, !!children]);

  return (
    <StyledNavItem onClick={onClick} selected={selected} menuVisible={!!children} expanded={expanded}>
      <Link to={to || '/'}>
        {label}
        {children && (
          <>
            <ExpandIcon className='appbar-expand-icon' expanded={expanded} />
            {children}
          </>
        )}
      </Link>
    </StyledNavItem>
  );
});

export const Appbar = observer(() => {
  const store = useStore()

  return (
    <StyledAppbar>
      <Header>Publiczne Liceum Ogólnokształcące Nr II w Opolu</Header>
      <Navbar expanded={store.appbar.expanded}>
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
        <NavItem to='/news' subpages={['/article']} label='Aktualności' />
        <NavItem to='/gallery' label='Galeria' />
        <NavItem to='/students' label='Dla uczniów' />
        <NavItem to='/parents' label='Dla rodziców' />
        <NavItem to='/recruitment' label='Rekrutacja' />
        <NavItem to='/contact' label='Kontakt' />
      </Navbar>
      <MenuButton onClick={store.appbar.onMenuButtonClick} />
    </StyledAppbar>
  );
});
