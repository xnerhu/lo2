import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Section, SectionTitle } from '~/renderer/components/Section';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Button } from '~/renderer/components/Button';
import { IS_BROWSER } from '~/renderer/constants';
import { CardsContainer } from '~/renderer/components/Card/style';

export const ShortNews = observer(() => {
  const store = useStore();

  if (IS_BROWSER) {
    React.useEffect(() => {
      store.shortNews.onWindowResize();

      window.addEventListener('resize', store.shortNews.onWindowResize);

      return () => {
        window.removeEventListener('resize', store.shortNews.onWindowResize);
      }
    }, []);
  }

  return (
    <Section>
      <SectionTitle>Nowości</SectionTitle>
      <CardsContainer>
        {store.shortNews.news.map(r => (
          <NewsCard key={r._id} data={r} />
        ))}
      </CardsContainer>
      <Button style={{ marginTop: 32, marginBottom: 48 }}>Zobacz więcej</Button>
    </Section>
  );
});
