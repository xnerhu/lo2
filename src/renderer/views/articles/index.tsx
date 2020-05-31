import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { Categories } from './components/Categories';
import { IArticlesPageData } from '~/interfaces';
import { List } from './components/List';
import { splitArticleCategories } from '~/renderer/utils/article';

const shouldFetch = (
  { page, category, subcategory }: any,
  cached: any = {},
) => {
  return (
    page !== cached.page ||
    category !== cached.category ||
    subcategory !== cached.subcategory
  );
};

export default () => {
  const [data] = usePage<IArticlesPageData>('articles', {
    shouldFetch,
  });

  const list = React.useMemo(() => splitArticleCategories(data?.categories), [
    data?.categories,
  ]);

  const categoriesBar = React.useMemo(() => {
    if (list?.categories != null) {
      return (
        <Categories
          data={[
            {
              _id: 'all',
              label: 'all',
              name: 'Wszystko',
            },
            ...list?.categories,
          ]}
        />
      );
    }

    return null;
  }, [list]);

  return (
    <>
      {categoriesBar}
      <List
        nextPage={data?.nextPage}
        users={data?.users}
        articles={data?.articles}
        categories={list?.categories}
        subcategories={list?.subcategories}
      />
    </>
  );
};
