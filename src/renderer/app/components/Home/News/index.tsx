import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { Button } from '~/renderer/components/Button';
import { IS_BROWSER } from '~/renderer/constants';
import { NewsGrid } from '~/renderer/components/NewsGrid';
import { Link } from 'react-router-dom';

export const ShortNews = observer(() => {
  const store = useStore();

  if (IS_BROWSER) {
    React.useEffect(() => {
      store.home.onWindowResize();

      window.addEventListener('resize', store.home.onWindowResize);

      return () => {
        window.removeEventListener('resize', store.home.onWindowResize);
      };
    }, []);
  }

  return (
    <Background style={{ marginTop: 56 }}>
      <Content>
        <Link to="/news">
          <SectionTitle>Aktualności</SectionTitle>
        </Link>
        <NewsGrid items={store.home.news} />
        <Button to="/news" style={{ margin: '32px auto 16px auto' }}>
          Zobacz więcej
        </Button>
      </Content>
    </Background>
  );
});
