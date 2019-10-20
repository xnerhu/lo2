import * as React from 'react';

import { Section, SectionTitle } from '../Section';
import { StyledCard, CardsContainer } from '../News/style';
import { CardImage } from '../News';
import { Title } from './style';
import { images } from '~/renderer/constants';

interface Props {
  image?: string;
  title?: string;
  link?: string;
}

const Card = ({ image, title, link }: Props) => {
  return (
    <StyledCard>
      <CardImage src={image} />
      <Title>{title}</Title>
    </StyledCard>
  )
}

export const Shortcuts = () => {
  return (
    <Section>
      <SectionTitle>Skróty</SectionTitle>
      <CardsContainer>
        <Card title='E-dziennik' image={images.edziennik} />
        <Card title='Plan lekcji' image={images.planLekcji} />
        <Card title='Zastępstwa' image={images.zastepstwa} />
        <Card title='Google maps' image={images.googleMaps} />
      </CardsContainer>
    </Section>
  );
};
