import React from 'react';

import { FACEBOOK_URL, YOUTUBE_URL } from '~/renderer/constants';
import { Content } from '~/renderer/components/Section';
import {
  StyledFooter,
  Title,
  Subtitle,
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
      <Content>
        <FacebookIcon href={FACEBOOK_URL} />
        <YoutubeIcon href={YOUTUBE_URL} />
        <Copyright href="https://www.github.com/xnerhu" target="_blank">
          © 2020 Mikołaj Palkiewicz
        </Copyright>
      </Content>
    </StyledSocial>
  );
};

export class Footer extends React.PureComponent {
  render() {
    return (
      <StyledFooter>
        <Content>
          <Header />
          <Details />
        </Content>
        <Social />
      </StyledFooter>
    );
  }
}

// export const Footer = () => {
//   return (
//     <StyledFooter>
//       <Content>
//         <Header />
//         <Details />
//       </Content>
//       <Social />
//     </StyledFooter>
//   );
// };
