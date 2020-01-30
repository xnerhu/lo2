import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { useStore } from '~/renderer/app/store';
import {
  SectionTitle,
  Content,
  Background,
} from '~/renderer/components/Section';
import { Button } from '~/renderer/components/Button';
import { NewsGrid } from '~/renderer/components/NewsGrid';

export const ShortNews = observer(() => {
  const store = useStore();

  return (
    <Background style={{ marginTop: 56 }}>
      <Content>
        <Link to="/news">
          <SectionTitle>Aktualności</SectionTitle>
        </Link>
        <NewsGrid items={store.home.newsItems} renderLast={false} />
        <Button to="/news" style={{ margin: '32px auto 16px auto' }}>
          Zobacz więcej
        </Button>
      </Content>
    </Background>
  );
});
