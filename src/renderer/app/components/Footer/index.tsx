import React from 'react';
import { observer } from 'mobx-react-lite';

import { Content } from '~/renderer/components/Section';
import { useStore } from '~/renderer/app/store';
import {
  STATUE_URL,
  FACEBOOK_URL,
  YOUTUBE_URL,
} from '~/renderer/constants/env';
import {
  StyledFooter,
  Title,
  Subtitle,
  StyledDetails,
  StyledLinks,
  StyledSocial,
  FacebookIcon,
  YoutubeIcon,
  Copyright,
  Container,
  Link,
} from './style';

const Header = () => {
  return (
    <>
      <Title>Liceum Ogólnokształcące Nr II</Title>
      <Subtitle>im. Marii Konopnickiej w Opolu</Subtitle>
    </>
  );
};

const Details = () => {
  return (
    <StyledDetails>
      <span>ul. Generała Kazimierza Pułaskiego 3</span>
      <span>sekretariat@lo2.opole.pl</span>
      <span>46-020 Opole</span>
      <span>(0-77) 454-22-86</span>
    </StyledDetails>
  );
};

export const Links = observer(() => {
  const store = useStore();
  const isLogged = store.account.isLogged;

  return (
    <StyledLinks>
      <Link to="/cookies">Cookies</Link>
      <Link to="/rodo">RODO</Link>
      <Link to={STATUE_URL} useDefaultLink>
        Statut szkoły
      </Link>
      <Link to={isLogged ? '/logout' : '/login'} useDefaultLink={isLogged}>
        {isLogged ? 'Wyloguj' : 'Zaloguj'} się
      </Link>
    </StyledLinks>
  );
});

export const Social = () => {
  return (
    <StyledSocial>
      <Content>
        <FacebookIcon href={FACEBOOK_URL} aria-label="Facebook" />
        <YoutubeIcon href={YOUTUBE_URL} aria-label="Youtube" />
        <Copyright href="https://www.github.com/xnerhu">
          © 2020 Mikołaj Palkiewicz
        </Copyright>
      </Content>
    </StyledSocial>
  );
};

export const Footer = () => {
  return (
    <StyledFooter>
      <Content>
        <Header />
        <Container>
          <Details />
          <Links />
        </Container>
      </Content>
      <Social />
    </StyledFooter>
  );
};
