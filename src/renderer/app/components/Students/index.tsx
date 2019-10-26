import * as React from 'react';

import { ListCard } from '~/renderer/components/ListCard';
import { Image } from '~/renderer/components/Image';
import { icons, EDZIENNIK_URL } from '~/renderer/constants';
import { Container, Column, ImgContainer } from '../About/style';

export const Students = () => {
  return (
    <Container>
      <Column>
        <ListCard to={EDZIENNIK_URL} target='_blank' icon={icons.register} style={{ marginTop: 0 }}>
          E-dziennik
        </ListCard>
        <ListCard to='/' icon={icons.group}>Kółka i olimpiady</ListCard>
        <ListCard to='/' icon={icons.plan}>Plany zajęć</ListCard>
        <ListCard to='/' icon={icons.replacement}>Zastępstwa</ListCard>
        <ListCard to='/' icon={icons.userShield}>Psycholog</ListCard>
        <ListCard to='/' icon={icons.user} >Pedagog</ListCard>
        <ListCard to='/' icon={icons.userQuestion}>Doradca zawodowy</ListCard>
        <ListCard to='/' icon={icons.money}>Staże zawodowe</ListCard>
        <ListCard to='/' icon={icons.document}>Matura</ListCard>
      </Column>
      <ImgContainer>
        <Image src='/static/about.jpg' />
      </ImgContainer>
    </Container>
  );
}
