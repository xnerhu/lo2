import React from 'react';
import loadable from '@loadable/component';

import {
  URL_EDZIENNIK,
  URL_LESSONS_PLAN,
  URL_REPLACEMENTS,
  URL_MICROSOFT_OFFICE,
} from '~/renderer/constants/config';
import { useAppState } from '~/renderer/hooks/app-state';
import {
  ICON_REGISTER,
  ICON_PLAN,
  ICON_MICROSOFT_OFFICE,
  ICON_REPLACEMENT,
} from '~/renderer/constants/icons';
import { StyledItem, Container, Circle, Title } from './style';
import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';

const LazyCmsShortcuts = loadable(() => import('./Cms'), LOADABLE_OPTIONS);

interface Props {
  icon: string;
  to?: string;
  useDefaultLink?: boolean;
  children?: React.ReactNode;
}

export const Item = ({ icon, to, useDefaultLink, children }: Props) => {
  return (
    <StyledItem className="bg" to={to} useDefaultLink={useDefaultLink}>
      <Circle src={icon} />
      <Title>{children}</Title>
    </StyledItem>
  );
};
export const Shortcuts = () => {
  const appState = useAppState();

  return (
    <Container>
      <Item to={URL_EDZIENNIK} icon={ICON_REGISTER}>
        E-dziennik
      </Item>
      <Item to={URL_LESSONS_PLAN} icon={ICON_PLAN}>
        Plan lekcji
      </Item>
      <Item to={URL_REPLACEMENTS} icon={ICON_REPLACEMENT}>
        Zastępstwa
      </Item>
      <Item to={URL_MICROSOFT_OFFICE} icon={ICON_MICROSOFT_OFFICE}>
        Office 365
      </Item>
      {appState?.signedIn && <LazyCmsShortcuts />}
    </Container>
  );
};
