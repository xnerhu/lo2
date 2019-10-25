import * as React from 'react';

import { icons } from '~/renderer/constants';
import { Section, SectionTitle } from '~/renderer/components/Section';
import { CardsContainer } from '~/renderer/components/Card/style';
import { ListCard } from '~/renderer/components/ListCard';

export const Shortcuts = () => {
  return (
    <Section>
      <SectionTitle>Skróty</SectionTitle>
      <CardsContainer>
        <ListCard icon={icons.register}>E-dziennik</ListCard>
        <ListCard icon={icons.plan}>Plan lekcji</ListCard>
        <ListCard icon={icons.replacement}>Zastępstwa</ListCard>
        <ListCard icon={icons.location}>Google maps</ListCard>
      </CardsContainer>
    </Section>
  );
};
