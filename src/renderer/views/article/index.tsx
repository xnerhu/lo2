import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { IArticlePageData } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { ArticlesContainer } from '~/renderer/components/Article/style';
import { ArticleNotFoundError } from '~/renderer/components/Error/ArticleNotFound';

export default () => {
  const [data] = usePage<IArticlePageData>('article', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

  if (!data?.success) {
    return <ArticleNotFoundError />;
  }

  return (
    <ArticlesContainer>
      <Article
        data={data?.article}
        user={data?.author}
        category={data?.category}
      />
    </ArticlesContainer>
  );
};
