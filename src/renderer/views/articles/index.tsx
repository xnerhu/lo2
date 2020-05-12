import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { Categories } from './components/Categories';
import { IArticlesPageData } from '~/interfaces';
import { List } from './components/List';

export default () => {
  const [data] = usePage<IArticlesPageData>('articles', {
    shouldFetch: (filter, cachedFilter, x) => {
      // console.log(x.articles);s
      // return false;
      return (
        filter.page !== cachedFilter?.page ||
        filter.category !== cachedFilter?.category
      );
    },
  });

  const categories = React.useMemo(() => {
    if (data?.categories != null) {
      return <Categories data={data.categories} />;
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
