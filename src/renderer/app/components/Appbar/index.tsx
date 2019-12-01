import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Menu } from './Menu';
import {
  MOBILE_VIEW,
  EDZIENNIK_URL,
  CONTEST_URL,
  LESSONS_PLAN_URL,
  REPLACEMENTS_URL,
  PSYCHOLOGIST_URL,
  EDUCATOR_URL,
  CAREER_URL,
  INTERNSHIPS_URL,
  STATUE_URL,
  EXAM_URL,
  ACHIEVEMENTS_URL,
  PRESS_URL,
  RECRUITMENT_URL,
  PARENTS_URL
} from '~/renderer/constants';
import { MenuItem } from './Menu/style';
import { isAppbarItemSelected } from '~/renderer/app/utils';
import { Link } from '~/renderer/components/Link';
import { StyledAppbar, Header, Navbar, StyledNavItem, ExpandIcon, MenuButton } from './style';

export interface IAppBarItemProps extends RouteComponentProps {
  label: string;
  to?: string;
  subpages?: string[];
  disabled?: boolean;
  children?: React.ReactNode;
}

const NavItem = withRouter((props: IAppBarItemProps) => {
  const store = useStore();

  const { to, label, location, children, disabled } = props;
  const [expanded, setExpanded] = React.useState(false);
  const selected = !disabled && React.useMemo(() => isAppbarItemSelected(props), [location.pathname]);

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
      <Link className='appbar-item' to={to}>
        {label}
        {children && <ExpandIcon className='appbar-expand-icon' expanded={expanded} />}
      </Link>
      {children}
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
        <NavItem to='/news' subpages={['/article']} label='Aktualności' />
        <NavItem label='O nas' subpages={['/teachers', '/patron', '/history']}>
          <Menu>
            <MenuItem to='/teachers'>Nauczyciele</MenuItem>
            <MenuItem to='/patron'>Nasza patronka</MenuItem>
            <MenuItem to={STATUE_URL} target='_blank' rel='noopener'>Statut szkoły</MenuItem>
            <MenuItem to='/history'>Historia szkoły</MenuItem>
            <MenuItem to={ACHIEVEMENTS_URL}>Osiągnięcia</MenuItem>
            <MenuItem to={PRESS_URL}>Piszą o nas</MenuItem>
          </Menu>
        </NavItem>
        <NavItem to='/gallery' label='Galeria' />
        <NavItem label='Dla uczniów' disabled>
          <Menu>
            <MenuItem to={EDZIENNIK_URL} target='_blank'>E-dziennik</MenuItem>
            <MenuItem to={CONTEST_URL}>Kółka i olimpiady</MenuItem>
            <MenuItem to={LESSONS_PLAN_URL}>Plany zajęć</MenuItem>
            <MenuItem to={REPLACEMENTS_URL} target='_blank' rel='noopener'>Zastępstwa</MenuItem>
            <MenuItem to={PSYCHOLOGIST_URL}>Psycholog</MenuItem>
            <MenuItem to={EDUCATOR_URL}>Pedagog</MenuItem>
            <MenuItem to={CAREER_URL}>Doradca zawodowy</MenuItem>
            <MenuItem to={INTERNSHIPS_URL}>Staże zawodowe</MenuItem>
            <MenuItem to={EXAM_URL}>Matura</MenuItem>
          </Menu>
        </NavItem>
        <NavItem to={PARENTS_URL} label='Dla rodziców' disabled />
        <NavItem to={RECRUITMENT_URL} label='Rekrutacja' disabled />
        <NavItem to='/contact' label='Kontakt' />
      </Navbar>
      <MenuButton onClick={store.appbar.onMenuButtonClick} />
    </StyledAppbar>
  );
});
