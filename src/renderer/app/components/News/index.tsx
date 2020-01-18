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
import { Toolbar, StyledError, ErrorCircle, ErrorDescription } from './style';
import { DEFAULT_NEWS_FILTER } from '~/constants';

// const Error = () => {
//   return (
//     <StyledError>
//       <ErrorCircle>
//         404
//       </ErrorCircle>
//       <b><h4 style={{ fontWeight: 500 }}>Oops! Nic nie znaleziono!</h4></b>
//       <ErrorDescription>Posty, które szukasz mogły zostać usunięte lub zmienione.</ErrorDescription>
//     </StyledError>
//   );
// }

export default withRouter(
  observer((props: IWithRouterProps) => {
    // const store = useStore();
    // const { match, history } = props;

    // const inputRef = React.useRef<HTMLInputElement>();
    // const filter = React.useMemo(() => {
    //   return { ...DEFAULT_NEWS_FILTER, ...formatNewsFilter(match.params) };
    // }, [match.params]);

    // const onDropdown = React.useCallback((e: IDropDownItem) => {
    //   store.news.paginationOffset = 0;

    //   history.push({
    //     pathname: store.news.stringifyFilter({
    //       text: filter.text,
    //       category: e._id,
    //     })
    //   });
    // }, [filter]);

    // const onSearch = React.useCallback((text: string) => {
    //   store.news.paginationOffset = 0;

    //   history.push({
    //     pathname: store.news.stringifyFilter({
    //       category: filter.category,
    //       text,
    //     })
    //   });
    // }, [filter]);

    // useDidMountEffect(() => {
    //   inputRef.current.value = filter.text;
    //   store.news.loadNews(filter);
    //   store.news.setPaginationOffset(filter.page);
    // }, [filter], !!store.news.items.length);

    return <>xd</>;
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
