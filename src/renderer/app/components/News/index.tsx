import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { useStore } from '~/renderer/app/store';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Dropdown } from '~/renderer/components/Dropdown';
import { Input } from '~/renderer/components/Input';
import { IWithRouterProps } from '~/renderer/app/interfaces';
import { Pagination } from './Pagination';
import { NewsContainer } from '~/renderer/components/NewsCard/style';
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

export default withRouter(observer((props: IWithRouterProps) => {
  return <div>xdd</div>

  const store = useStore();
  const filter = store.news.filter;

  React.useEffect(() => {
    store.news.syncWithRouter(props as any);
  }, [props.location.pathname]);

  React.useEffect(() => {
    store.news.onLoad(props);
  }, []);

  return (
    <>
      <Toolbar>
        <Dropdown items={store.news.categories} onChange={store.news.onDropdown} value={filter.category} />
        <Input innerRef={store.news.inputRef} placeholder='Wyszukaj' onChange={store.news.onSearch} style={{ marginLeft: 'auto' }} />
      </Toolbar>
      {!store.news.error && (
        <>
          <NewsContainer>
            {store.news.items.map(r => (
              <NewsCard key={r._id} data={r} />
            ))}
          </NewsContainer>
          <Pagination />
        </>
      )}
      {store.news.error && <Error />}
    </>
  );
}));
