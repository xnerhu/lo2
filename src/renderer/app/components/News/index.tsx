import * as React from 'react';
import { withRouter } from 'react-router';

import { INewsFilter } from '~/interfaces';
import { useStore } from '~/renderer/app/store';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Dropdown } from '~/renderer/components/Dropdown';
import { Input } from '~/renderer/components/Input';
import { Pagination } from './Pagination';
import { observableWithRouter } from '../../utils';
import { CardsContainer } from '~/renderer/components/Card/style';
import { Toolbar, StyledError, ErrorCircle, ErrorDescription } from './style';

const Error = () => {
  return (
    <StyledError>
      <ErrorCircle>
        404
      </ErrorCircle>
      <b><h4>Oops! Nic nie znaleziono!</h4></b>
      <ErrorDescription>Posty, które szukasz mogły zostać usunięte lub zmienione.</ErrorDescription>
    </StyledError>
  );
}

const SearchInput = withRouter(({ history }) => {
  const store = useStore();

  const onChange = React.useCallback(e => {
    store.news.onSearch(e);

    history.push({
      pathname: store.news.getPathname(),
    });
  }, []);

  return (
    <Input placeholder='Wyszukaj' onChange={onChange} style={{ marginLeft: 'auto' }} />
  )
});

export const News = observableWithRouter((props: any) => {
  const store = useStore();
  const params: INewsFilter = props.match.params;

  React.useEffect(() => {
    store.news.injectParams(params);
  }, [params]);

  return (
    <>
      <Toolbar>
        <Dropdown items={store.newsCategories.items} onChange={store.news.onDropdown} />
        <SearchInput />
      </Toolbar>
      {!store.news.error && (
        <>
          <CardsContainer>
            {store.news.items.map(r => (
              <NewsCard key={r._id} data={r} />
            ))}
          </CardsContainer>
          <Pagination />
        </>
      )}
      {store.news.error && <Error />}
    </>
  );
});
