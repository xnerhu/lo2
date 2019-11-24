import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '~/renderer/app/store';
import { Pages, Page, Chevron, Container } from './style';
import { INewsFilter } from '~/interfaces';

export const Pagination = observer(({ filter }: { filter: INewsFilter }) => {
  const store = useStore();
  const length = store.news.paginationLength;

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
            to={store.news.stringifyFilter({ ...filter, page })}
            selected={filter.page === page}
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
