import React from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import { usePage } from '../../utils/hooks';
import { createArticleFilter } from '~/utils/article';
import { INewsPageData } from '~/interfaces';
import { IArticleFilter, IArticleListChunk } from '~/interfaces/article';
import { Categories } from './Categories';
import { List } from './List';

export default withRouter(({ match }) => {
  const filter = createArticleFilter(match.params);

  const [data, setData, cachedFilter] = usePage<INewsPageData, IArticleFilter>(
    'news',
    filter,
  );

  React.useEffect(() => {
    if (
      filter.page !== cachedFilter.page ||
      filter.category !== cachedFilter.category
    ) {
      (async () => {
        const res = await axios.get<IArticleListChunk>(`/api/article/list`, {
          params: filter,
        });

        setData(res.data, filter);
      })();
    }
  }, [filter]);

  const categories = React.useMemo(
    () => <Categories data={data.categories ?? []} />,
    [data?.categories],
  );

  return (
    <>
      {categories}
      <List data={data} />
    </>
  );
});
