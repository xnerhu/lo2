import React from 'react';
import { observer } from 'mobx-react-lite';

import {
  icons,
  EDZIENNIK_URL,
  GOOGLE_MAPS_URL,
  LESSONS_PLAN_URL,
  REPLACEMENTS_URL,
} from '~/renderer/constants';
import { useStore } from '~/renderer/app/store';
import { StyledItem, Container, Circle, Title, Icon } from './style';

interface Props {
  icon: string;
  to?: string;
  useDefaultLink?: boolean;
  children?: React.ReactNode;
}

const Item = ({ icon, to, useDefaultLink, children }: Props) => {
  return (
    <StyledItem to={to} useDefaultLink={useDefaultLink}>
      <Circle>
        <Icon src={icon} />
      </Circle>
      <Title>{children}</Title>
    </StyledItem>
  );
};

const CmsShortcuts = () => {
  return (
    <>
      <Item to="/add-article" icon={icons.addArticle}>
        Dodaj artykuł
      </Item>
      <Item to="/change-password" icon={icons.key}>
        Zmień hasło
      </Item>
      <Item to="/account" icon={icons.account}>
        Konto
      </Item>
      <Item to="/logout" icon={icons.logout} useDefaultLink>
        Wyloguj się
      </Item>
    </>
  );
};

export const Shortcuts = observer(() => {
  const store = useStore();
  const isLogged = store.account.isLogged;

  return (
    <Container>
      <Item to={EDZIENNIK_URL} icon={icons.register}>
        E-dziennik
      </Item>
      <Item to={LESSONS_PLAN_URL} icon={icons.plan}>
        Plan lekcji
      </Item>
      <Item to={REPLACEMENTS_URL} icon={icons.replacement}>
        Zastępstwa
      </Item>
      <Item to={GOOGLE_MAPS_URL} icon={icons.locationOutline}>
        Google maps
      </Item>
      {isLogged && <CmsShortcuts />}
    </Container>
  );
});
