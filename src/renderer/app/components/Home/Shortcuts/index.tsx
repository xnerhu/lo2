import * as React from 'react';

import { Section, SectionTitle } from '../Section';
import { icons } from '~/renderer/constants';
import { StyledCard, CardsContainer } from '~/renderer/components/Card/style';
import { Title, Icon } from './style';

interface Props {
  icon?: string;
  title?: string;
  link?: string;
}

const Card = ({ icon, title, link }: Props) => {
  return (
    <StyledCard style={{ flexDirection: 'row', alignItems: 'center', height: 64 }}>
      <Icon style={{ backgroundImage: `url(${icon})` }} />
      <Title>{title}</Title>
    </StyledCard>
  )
}

export const Shortcuts = () => {
  return (
    <Section>
      <SectionTitle>Skróty</SectionTitle>
      <CardsContainer>
        <Card title='E-dziennik' icon={icons.register} />
        <Card title='Plan lekcji' icon={icons.plan} />
        <Card title='Zastępstwa' icon={icons.replacement} />
        <Card title='Google maps' icon={icons.location} />
      </CardsContainer>
    </Section>
  );
};
