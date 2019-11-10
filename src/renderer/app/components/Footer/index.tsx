import * as React from 'react';

import { icons, PRIMARY_COLOR } from '~/renderer/constants';
import { Icon } from '~/renderer/components/Icon';
import { StyledFooter, Container, Column, Title, Subtitle, Copyright, Contact, StyledContactItem, Label, MediaIcon } from './style';

interface Props {
  icon: string;
  label: string;
  sublabel: string;
  iconSize?: number;
}

const ContactItem = ({ icon, iconSize, label, sublabel }: Props) => {
  return (
    <StyledContactItem>
      <Icon src={icon} size={iconSize || 36} fill={PRIMARY_COLOR} style={{ marginRight: 8 }} />
      <div>
        <Label>{label}</Label>
        <Label>{sublabel}</Label>
      </div>
    </StyledContactItem>
  )
}

export const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <Column>
          <Title>Liceum Ogólnokształcące Nr II</Title>
          <Subtitle>im. Marii Konopnickiej w Opolu</Subtitle>
          <Contact>
            <ContactItem icon={icons.location} label='46-020 Opole' sublabel='Generała Kazimierza Pułaskiego 3' />
            <ContactItem icon={icons.email} iconSize={32} label='sekretariat@lo2.opole.pl' sublabel='(0-77) 454-22-86' />
          </Contact>
        </Column>
        <Column>
          <Title>Znajdź nas</Title>
          <Subtitle>media społecznościowe</Subtitle>
          <a href='https://www.facebook.com/WilkiZWarynskiego/' target='_blank' aria-label='facebook'>
            <MediaIcon src={icons.facebook} size={32} fill='#3b5998' />
          </a>
          <a href='https://www.youtube.com/channel/UCWhfUoBYJxxZL4yj0GI1njw' target='_blank' aria-label='youtube'>
            <MediaIcon src={icons.youtube} size={32} fill='#ff0000' style={{ marginLeft: 8 }} />
          </a>
        </Column>
      </Container>
      <Copyright href='https://www.github.com/xnerhu' target='_blank'>© 2019 Mikołaj Palkiewicz</Copyright>
    </StyledFooter>
  );
}
