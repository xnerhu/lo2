import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { SectionTitle, Content, DarkBackground } from '~/renderer/components/Section';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Button } from '~/renderer/components/Button';
import { IS_BROWSER } from '~/renderer/constants';
import { NewsContainer } from '~/renderer/components/NewsCard/style';

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
    <DarkBackground>
      <Content>
        <SectionTitle>Nowości</SectionTitle>
        <NewsContainer>
          {store.home.news.map(r => (
            <NewsCard key={r._id} data={r} />
          ))}
        </NewsContainer>
        <Button to='/news' style={{ marginTop: 32, marginBottom: 48 }}>Zobacz więcej</Button>
      </Content>
    </DarkBackground>
  );
});
