import React from 'react';

import {
  URL_FACEBOOK,
  URL_YOUTUBE,
  URL_BIP,
} from '~/renderer/constants/config';
import { Content } from '~/renderer/components/Section';
import {
  StyledFooter,
  Title,
  Subtitle,
  StyledHeader,
  StyledGrid,
  Link,
  StyledSocial,
  FacebookIcon,
  YoutubeIcon,
  Bip,
  Badge,
  Copyright,
  SocialContent,
  Container,
} from './style';

const Header = () => {
  return (
    <StyledHeader>
      <Title>Liceum Ogólnokształcące Nr II</Title>
      <Subtitle>im. Marii Konopnickiej w Opolu</Subtitle>
    </StyledHeader>
  );
};

const Grid = () => {
  return (
    <StyledGrid>
      <span>ul. Generała Kazimierza Pułaskiego 3</span>
      <span>sekretariat@lo2.opole.pl</span>
      <span>46-020 Opole</span>
      <span>(0-77) 454-22-86</span>
      <Link>Cookies</Link>
      <Link>Rodo</Link>
    </StyledGrid>
  );
};

export const Social = () => {
  return (
    <StyledSocial>
      <SocialContent>
        <FacebookIcon href={URL_FACEBOOK} aria-label="Facebook" />
        <YoutubeIcon href={URL_YOUTUBE} aria-label="Youtube" />
        <Bip href={URL_BIP} aria-label="Biuletyn Informacji Publicznej" />
        <Copyright href="https://www.github.com/xnerhu">
          © 2020 Mikołaj Palkiewicz
        </Copyright>
      </SocialContent>
    </StyledSocial>
  );
};

export const Footer = () => {
  return (
    <StyledFooter>
      <Content>
        <Header />
        <Container>
          <Grid />
          <Badge aria-label="Najlepsze licea w Polsce - Perspektywy Złota Szkoła 2020" />
        </Container>
      </Content>
      <Social />
    </StyledFooter>
  );
};
