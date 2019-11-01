import * as React from 'react';

import { ListCard } from '~/renderer/components/ListCard';
import { icons } from '~/renderer/constants';
import { Image } from '~/renderer/components/Image';
import { Container, Column, ImgContainer } from './style';

export const About = () => {
  return (
    <Container>
      <Column>
        <ListCard to='/news' icon={icons.news} style={{ marginTop: 0 }}>Aktualności</ListCard>
        <ListCard to='/about/teachers' icon={icons.group}>Nauczyciele</ListCard>
        <ListCard to='/about/patron' icon={icons.info}>Nasza patronka</ListCard>
        <ListCard to='/static/statut.pdf' target='_blank' icon={icons.document}>Statut szkoły</ListCard>
        <ListCard to='/about/history' icon={icons.history}>Historia szkoły</ListCard>
        <ListCard to='/news/achievements' icon={icons.trophy}>Osiągnięcia</ListCard>
        <ListCard to='/about/articles' icon={icons.newsPaper}>Piszą o nas</ListCard>
      </Column>
      <ImgContainer>
        <Image src='/static/about' />
      </ImgContainer>
    </Container>
  );
}
