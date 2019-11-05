import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Dropdown } from '~/renderer/components/Dropdown';
import { Input } from '~/renderer/components/Input';
import { CardsContainer } from '~/renderer/components/Card/style';
import { Toolbar, Pages, Page, Chevron, Container, Error, ErrorCircle, ErrorDescription } from './style';

const Pagination = observer(() => {
  const store = useStore();
  const length = store.news.paginationLength;

  const onClick = (page: number) => () => {
    store.news.switchPage(page);
  }

  return (
    <Pages>
      <Chevron onClick={store.news.goStart} disabled={!store.news.canGoStart} double />
      <Chevron onClick={store.news.goBackward} disabled={!store.news.canSwitch} />
      <Container>{Array.from({ length }, (r, i) => {
        const page = store.news.paginationOffset * length + i + 1;
        const disabled = page > store.news.pagesCount;

        return (
          <Page
            key={i}
            selected={store.news.currentPage === page}
            onClick={!disabled ? onClick(page) : null}
            disabled={disabled}
          >
            {page}
          </Page>
        )
      })}</Container>
      <Chevron onClick={store.news.goForward} disabled={!store.news.canSwitch} right />
      <Chevron onClick={store.news.goEnd} disabled={!store.news.canGoEnd} right double />
    </Pages>
  );
});

export const News = observer(() => {
  const store = useStore();

  return (
    <>
      <Toolbar>
        <Dropdown items={store.newsCategories.items} onChange={store.news.onDropdown} />
        <Input placeholder='Wyszukaj' onChange={store.news.onSearch} style={{ marginLeft: 'auto' }} />
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
      {store.news.error && (
        <Error>
          <ErrorCircle>
            404
          </ErrorCircle>
          <b><h4>Oops! Nic nie znaleziono!</h4></b>
          <ErrorDescription>Posty, które szukasz mogły zostać usunięte lub zmienione.</ErrorDescription>
        </Error>
      )}
    </>
  );
});
