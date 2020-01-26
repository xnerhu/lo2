import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { useStore } from '../../store';
import { View } from './View';
import { NewsCard } from '~/renderer/components/NewsCard';
import {
  Content,
  SectionTitle,
  Background,
} from '~/renderer/components/Section';
import { IRouterProps } from '../../interfaces';
import { NewsContainer } from './style';

export default withRouter(
  observer((props: IRouterProps) => {
    const store = useStore();
    const { match } = props;

    React.useEffect(() => {
      store.article.fetch(match.params.label);
    }, [match.params]);

    return (
      <>
        <View />
        <Background style={{ height: '100%' }}>
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
  }),
);
