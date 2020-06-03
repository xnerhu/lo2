import React from 'react';
import loadable from '@loadable/component';

import { LOADABLE_OPTIONS } from '~/renderer/constants/loadable';
import { usePage } from '~/renderer/hooks/network';
import { IArticlePageData } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { ArticlesContainer } from '~/renderer/components/Article/style';
import { ArticleNotFoundError } from '~/renderer/components/Error/ArticleNotFound';

const LazyManage = loadable(() => import('./Manage'), LOADABLE_OPTIONS);

export default () => {
  const [data] = usePage<IArticlePageData>('article', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

  if (data?.success === false) {
    return <ArticleNotFoundError />;
  }

  return (
    <ArticlesContainer>
      {data?.canEdit && <LazyManage />}
      <Article
        data={data?.article}
        user={data?.author}
        category={data?.category}
        subcategory={data?.subcategory}
      />
    </ArticlesContainer>
  );
};
