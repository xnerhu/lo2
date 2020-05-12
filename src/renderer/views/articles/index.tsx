import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { Categories } from './components/Categories';
import { IArticlesPageData } from '~/interfaces';
import { List } from './components/List';

export default () => {
  const [data] = usePage<IArticlesPageData>('articles', {
    shouldFetch: ({ page, category }, cached) =>
      page !== cached?.page || category !== cached?.category,
  });

  const categories = React.useMemo(() => {
    if (data?.categories != null) {
      return (
        <Categories
          data={[
            {
              _id: 'all',
              label: 'all',
              name: 'Wszystko',
            },
            ...data.categories,
          ]}
        />
      );
    }

    return null;
  }, [data?.categories]);

  return (
    <>
      {categories}
      <List data={{ ...data, articles: data?.articles ?? [] }} />
    </>
  );
};
