import * as React from 'react';

import { icons, PRIMARY_COLOR } from '~/renderer/constants';
import {
  StyledFooter,
  Title,
  Subtitle,
  Container,
  ColumnContainer,
  Column,
  Label,
  StyledSocial,
  FacebookIcon,
  YoutubeIcon,
  Copyright,
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
    <ColumnContainer style={{ marginTop: 32 }}>
      <Column>
        <Label>ul. Generała Kazimierza Pułaskiego 3</Label>
        <Label>46-020 Opole</Label>
      </Column>
      <Column>
        <Label>sekretariat@lo2.opole.pl</Label>
        <Label>(0-77) 454-22-86</Label>
      </Column>
    </ColumnContainer>
  );
};

export const Social = () => {
  return (
    <StyledSocial>
      <Container>
        <FacebookIcon />
        <YoutubeIcon />
        <Copyright href="https://www.github.com/xnerhu" target="_blank">
          © 2020 Mikołaj Palkiewicz
        </Copyright>
      </Container>
    </StyledSocial>
  );
};

export const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Header />
        <Details />
      </Container>
      <Social />
    </StyledFooter>
  );
};
