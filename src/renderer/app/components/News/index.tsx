import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { withRouter } from 'react-router-dom';

import { formatNewsFilter } from '~/utils';
import { useDidMountEffect } from '~/renderer/app/utils';
import { useStore } from '~/renderer/app/store';
import { NewsCard } from '~/renderer/components/NewsCard';
import { Dropdown, IDropDownItem } from '~/renderer/components/Dropdown';
import { Input } from '~/renderer/components/Input';
import { IWithRouterProps, IRouterProps } from '~/renderer/app/interfaces';
import { Pagination } from './Pagination';
import { Background, Content } from '~/renderer/components/Section';
import { DEFAULT_NEWS_FILTER } from '~/constants';
import { NewsGrid } from '~/renderer/components/NewsGrid';
import { INewsFilter } from '~/interfaces';
import { StyledToolbar } from './style';

interface ToolbarProps {
  filter: INewsFilter;
}

const Toolbar = withRouter(
  observer((props: IRouterProps<ToolbarProps>) => {
    const { match, history, filter } = props;

    const store = useStore();
    const inputRef = React.useRef<HTMLInputElement>();

    const onDropdown = React.useCallback(
      (e: IDropDownItem) => {
        store.news.paginationOffset = 0;

        history.push({
          pathname: store.news.stringifyFilter({
            text: filter.text,
            category: e._id,
          }),
        });
      },
      [filter],
    );

    const onSearch = React.useCallback(
      (text: string) => {
        store.news.paginationOffset = 0;

        history.push({
          pathname: store.news.stringifyFilter({
            category: filter.category,
            text,
          }),
        });
      },
      [filter],
    );

    return (
      <StyledToolbar>
        <Dropdown items={store.news.categories} value={-1} />
        <Input placeholder="Wyszukaj" style={{ marginLeft: 8 }} />
      </StyledToolbar>
    );
  }),
);

export default withRouter(
  observer((props: IWithRouterProps) => {
    const store = useStore();
    const { match, history } = props;

    const filter = React.useMemo(() => {
      return { ...DEFAULT_NEWS_FILTER, ...formatNewsFilter(match.params) };
    }, [match.params]);

    // useDidMountEffect(() => {
    //   inputRef.current.value = filter.text;
    //   store.news.loadNews(filter);
    //   store.news.setPaginationOffset(filter.page);
    // }, [filter], !!store.news.items.length);

    return (
      <Background style={{ paddingBottom: 48 }}>
        <Content>
          <Toolbar filter={filter} />
          <NewsGrid items={store.news.items} />
        </Content>
      </Background>
    );
  }),
);

/*      <Toolbar>
        <Dropdown items={store.news.categories} onChange={onDropdown} value={filter.category} />
        <Input innerRef={inputRef} placeholder='Wyszukaj' onChange={onSearch} style={{ marginLeft: 'auto' }} defaultValue={filter.text} label='Wyszukaj' />
      </Toolbar>
      <>
        <NewsContainer>
          {store.news.items.map(r => (
            <NewsCard key={r._id} data={r} />
          ))}
        </NewsContainer>
        {!store.news.error && <Pagination filter={filter} />}
      </>
      {store.news.error && <Error />}*/
