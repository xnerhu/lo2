import React from 'react';
import loadable from '@loadable/component';

import { useAppState } from '~/renderer/app/store';
import {
  EDZIENNIK_URL,
  LESSONS_PLAN_URL,
  REPLACEMENTS_URL,
  GOOGLE_MAPS_URL,
} from '~/renderer/constants/env';
import {
  REPLACEMENT_ICON,
  REGISTER_ICON,
  PLAN_ICON,
  LOCATION_OUTLINE_ICON,
  MICROSOFT_OFFICE_ICON,
} from '~/renderer/constants/icons';
import { StyledItem, Container, Circle, Title } from './style';

interface Props {
  icon: string;
  to?: string;
  useDefaultLink?: boolean;
  children?: React.ReactNode;
}

export const Item = ({ icon, to, useDefaultLink, children }: Props) => {
  return (
    <StyledItem to={to} useDefaultLink={useDefaultLink}>
      <Circle className="home-shortcut-circle" src={icon} />
      <Title>{children}</Title>
    </StyledItem>
  );
};

const LazyCmsShortcuts = loadable(() => import('./Cms'), {
  ssr: true,
});

export const Shortcuts = () => {
  const appState = useAppState();

  return (
    <Container>
      <Item to={EDZIENNIK_URL} icon={REGISTER_ICON}>
        E-dziennik
      </Item>
      <Item to={LESSONS_PLAN_URL} icon={PLAN_ICON}>
        Plan lekcji
      </Item>
      <Item to={REPLACEMENTS_URL} icon={REPLACEMENT_ICON}>
        Zastępstwa
      </Item>
      <Item
        to="http://www.lo2.opole.pl/aktualnosci/pliki/korzystanie_office365_online.pdf"
        icon={MICROSOFT_OFFICE_ICON}
      >
        Office 365
      </Item>
      {appState?.signedIn && <LazyCmsShortcuts />}
    </Container>
  );
};
