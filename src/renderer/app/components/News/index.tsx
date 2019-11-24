import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { formatNewsFilter } from '~/utils';
import { useDidMountEffect } from '~/renderer/app/utils';
import { useStore } from '~/renderer/app/store';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Dropdown, IDropDownItem } from '~/renderer/components/Dropdown';
import { Input } from '~/renderer/components/Input';
import { IWithRouterProps } from '~/renderer/app/interfaces';
import { Pagination } from './Pagination';
import { NewsContainer } from '~/renderer/components/NewsCard/style';
import { Toolbar, StyledError, ErrorCircle, ErrorDescription } from './style';
import { INewsFilter } from '~/interfaces';

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
  const store = useStore();
  const { match, history } = props;
  const filter = React.useRef<INewsFilter>(formatNewsFilter(match.params));

  const onDropdown = React.useCallback((e: IDropDownItem) => {
    store.news.paginationOffset = 0;

    history.push({
      pathname: store.news.stringifyFilter({
        ...filter.current,
        category: e._id,
        page: 1,
      }),
    });

    store.news.loadNews(filter.current);
  }, [filter]);

  const onSearch = React.useCallback((text: string) => {
    history.push({
      pathname: store.news.stringifyFilter({
        ...filter.current,
        text,
        page: 1,
      }),
    });
  }, [filter]);

  useDidMountEffect(() => {
    filter.current = formatNewsFilter(match.params);
    store.news.loadNews(filter.current);
  }, [match.params]);

  console.log('xd');

  return (
    <>
      <Toolbar>
        <Dropdown items={store.news.categories} onChange={onDropdown} value={filter.current.category || -1} />
        <Input innerRef={store.news.inputRef} placeholder='Wyszukaj' onChange={onSearch} style={{ marginLeft: 'auto' }} />
      </Toolbar>
      <>
        <NewsContainer>
          {store.news.items.map(r => (
            <NewsCard key={r._id} data={r} />
          ))}
        </NewsContainer>
        <Pagination filter={filter.current} />
      </>
    </>
  );
}));
