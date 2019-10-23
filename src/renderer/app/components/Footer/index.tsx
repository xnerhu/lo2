import * as React from 'react';

import { icons } from '~/renderer/constants';
import { StyledFooter, Container, Section, Title, Text, Icon, Copyright } from './style';

export const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Section>
          <Title>Kontakt</Title>
          <Text>
            Masz jakieś pytania? Napisz do nas!
            <br />
            <br />
            sekretariat@lo2.opole.pl
            <br />
            <br />
            Generała Kazimierza Pułaskiego 3
            <br />
            46-020 Opole
            </Text>
        </Section>
        <Section>
          <Title>Polityka</Title>
          <Text>Rodo</Text>
          <Text>Status szkoły</Text>
        </Section>
        <Section>
          <Title>Możesz znaleźć nas na</Title>
          <a href='https://www.facebook.com/WilkiZWarynskiego/' target='_blank'>
            <Icon src={icons.facebook} hoverColor='#3b5998' />
          </a>
          <a href='https://www.youtube.com/channel/UCWhfUoBYJxxZL4yj0GI1njw' target='_blank'>
            <Icon src={icons.youtube} style={{ marginLeft: 8 }} hoverColor='#ff0000' />
          </a>
        </Section>
      </Container>
      <Copyright href='https://www.github.com/xnerhu' target='_blank'>© 2019 Mikołaj Palkiewicz</Copyright>
    </StyledFooter>
  );
}
