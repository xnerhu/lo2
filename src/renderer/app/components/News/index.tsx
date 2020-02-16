import React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { formatNewsFilter } from '~/utils';
import { useStore } from '~/renderer/app/store';
import { IRouterProps } from '~/renderer/app/interfaces';
import { Background, Content } from '~/renderer/components/Section';
import { NewsGrid } from '~/renderer/components/NewsGrid';
import { Toolbar } from './Toolbar';
import { Pagination } from './Pagination';
import { Error } from '~/renderer/components/Error';

export default withRouter(
  observer((props: IRouterProps) => {
    const store = useStore();
    const { match } = props;

    const filter = React.useMemo(() => {
      return formatNewsFilter(match.params);
    }, [match.params]);

    React.useEffect(() => {
      store.news.fetchNews(filter);
    }, [filter]);

    React.useEffect(() => {
      store.news.fetchCategories();
    }, []);

    return (
      <Background>
        <Content>
          <Toolbar filter={filter} />
          <NewsGrid items={store.news.items} />
          <Pagination filter={filter} />
          {store.news.error && (
            <Error code="404" label="Oops! Nic nie znaleziono!">
              Posty, które szukasz mogły zostać usunięte.
            </Error>
          )}
        </Content>
      </Background>
    );
  }),
);
