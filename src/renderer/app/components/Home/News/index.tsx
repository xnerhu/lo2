import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Section, SectionTitle } from '~/renderer/components/Section';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Button } from '~/renderer/components/Button';
import { IS_BROWSER } from '~/renderer/constants';
import { NewsContainer } from '~/renderer/components/NewsContainer';

export const ShortNews = observer(() => {
  const store = useStore();

  if (IS_BROWSER) {
    React.useEffect(() => {
      store.home.onWindowResize();

      window.addEventListener('resize', store.home.onWindowResize);

      return () => {
        window.removeEventListener('resize', store.home.onWindowResize);
      }
    }, []);
  }

  return (
    <Section>
      <SectionTitle>Nowości</SectionTitle>
      <NewsContainer data={store.home.news} />
      <Button to='/news' style={{ marginTop: 32, marginBottom: 48 }}>Zobacz więcej</Button>
    </Section>
  );
});
