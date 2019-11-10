import * as React from 'react';

import { useStore } from '~/renderer/app/store';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Dropdown } from '~/renderer/components/Dropdown';
import { Input } from '~/renderer/components/Input';
import { Pagination } from './Pagination';
import { NewsContainer } from '~/renderer/components/NewsCard/style';
import { Toolbar, StyledError, ErrorCircle, ErrorDescription } from './style';
import { observer } from 'mobx-react-lite';

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

export default observer(() => {
  const store = useStore();

  return (
    <>
      <Toolbar>
        <Dropdown items={store.newsCategories.items} onChange={store.news.onDropdown} defaultId={store.news.selectedCategory} />
        <Input placeholder='Wyszukaj' onChange={store.news.onSearch} style={{ marginLeft: 'auto' }} />
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
});
