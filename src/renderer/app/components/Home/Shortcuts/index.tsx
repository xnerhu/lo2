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
} from '~/renderer/constants/icons';
import { StyledItem, Container, Circle, Title, Icon } from './style';

interface Props {
  icon: string;
  to?: string;
  useDefaultLink?: boolean;
  children?: React.ReactNode;
}

export const Item = ({ icon, to, useDefaultLink, children }: Props) => {
  return (
    <StyledItem to={to} useDefaultLink={useDefaultLink}>
      <Circle>
        <Icon src={icon} />
      </Circle>
      <Title>{children}</Title>
    </StyledItem>
  );
};

const LazyCmsShortcuts = loadable(() => import('../CmsShortcuts'), {
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
      <Item to={GOOGLE_MAPS_URL} icon={LOCATION_OUTLINE_ICON}>
        Google maps
      </Item>
      {appState?.signedIn && <LazyCmsShortcuts />}
    </Container>
  );
};
