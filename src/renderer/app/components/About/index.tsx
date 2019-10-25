import * as React from 'react';

import { ListCard } from '~/renderer/components/ListCard';
import { icons } from '~/renderer/constants';
import { Image } from '~/renderer/components/Image';
import { Container, Column, ImgContainer } from './style';

export const About = () => {
  return (
    <Container>
      <Column>
        <ListCard icon={icons.news}>Aktualności</ListCard>
        <ListCard icon={icons.group}>Nauczyciele</ListCard>
        <ListCard icon={icons.info}>Nasza patronka</ListCard>
        <ListCard icon={icons.document}>Statut szkoły</ListCard>
        <ListCard icon={icons.history}>Historia szkoły</ListCard>
        <ListCard icon={icons.trophy}>Osiągnięcia</ListCard>
        <ListCard icon={icons.newsPaper}>Piszą o nas</ListCard>
      </Column>
      <ImgContainer>
        <Image src='/static/images/about.jpg' />
      </ImgContainer>
    </Container>
  );
}
