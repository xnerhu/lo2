import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Section, SectionTitle } from '~/renderer/components/Section';
import { NewsCard } from '~/renderer/components/NewsCard';
import { CardsContainer } from '~/renderer/components/Card/style';
import { Button } from '~/renderer/components/Button';
import { IS_BROWSER } from '~/renderer/constants';

const canRenderLast = () => {
  if (!IS_BROWSER) return false;
  return window.innerWidth <= 1632 && window.innerWidth >= 1268 || window.innerWidth <= 871;
}

export const ShortNews = observer(() => {
  const [renderLast, setRenderLast] = React.useState(canRenderLast());
  const store = useStore();
  const length = store.shortNews.items.length;

  const items = React.useMemo(() => {
    return store.shortNews.items.slice(0, renderLast ? length : length - 1)
  }, [renderLast, store.shortNews]);

  if (IS_BROWSER) {
    React.useEffect(() => {
      window.addEventListener('resize', () => {
        setRenderLast(canRenderLast());
      });
    }, []);
  }

  return (
    <Section>
      <SectionTitle>Nowości</SectionTitle>
      <CardsContainer>
        {items.map(r => (
          <NewsCard key={r._id} data={r} />
        ))}
      </CardsContainer>
      <Button style={{ marginTop: 32, marginBottom: 48 }}>Zobacz więcej</Button>
    </Section>
  );
});
