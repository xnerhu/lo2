import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Section, SectionTitle } from '~/renderer/components/Section';
import { NewsCard } from '~/renderer/components/NewsCard';
import { CardsContainer } from '~/renderer/components/Card/style';
import { Button } from '~/renderer/components/Button';

export const ShortNews = observer(() => {
  const store = useStore();

  return (
    <Section>
      <SectionTitle>Nowości</SectionTitle>
      <CardsContainer>
        {store.shortNews.items.map(r => (
          <NewsCard key={r._id} data={r} />
        ))}
      </CardsContainer>
      <Button>Zobacz więcej</Button>
    </Section>
  );
});
