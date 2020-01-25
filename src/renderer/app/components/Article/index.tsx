import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '../../store';
import { View } from './View';
import { NewsCard } from '~/renderer/components/NewsCard';
import {
  Content,
  SectionTitle,
  Background,
} from '~/renderer/components/Section';
import { NewsContainer } from './style';

export default observer(() => {
  const store = useStore();

  return (
    <>
      <View />
      <Background>
        <Content>
          <SectionTitle center>Proponowane</SectionTitle>
          <NewsContainer>
            {store.article.proposedNews.map(r => (
              <NewsCard key={r.id} data={r} />
            ))}
          </NewsContainer>
        </Content>
      </Background>
    </>
  );
});
