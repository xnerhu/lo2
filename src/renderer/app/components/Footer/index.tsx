import React from 'react';

import { Content } from '~/renderer/components/Section';
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
  Badge,
  Bip,
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

export const Links = () => {
  return (
    <StyledLinks>
      <Link to="/cookies">Cookies</Link>
      <Link to="/rodo">RODO</Link>
    </StyledLinks>
  );
};

export const Social = () => {
  return (
    <StyledSocial>
      <Content>
        <FacebookIcon href={FACEBOOK_URL} aria-label="Facebook" />
        <YoutubeIcon href={YOUTUBE_URL} aria-label="Youtube" />
        <Bip aria-label="Biuletyn Informacji Publicznej" />
        <Badge aria-label="Najlepsze licea w Polsce - Perspektywy Złota Szkoła 2020" />
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
