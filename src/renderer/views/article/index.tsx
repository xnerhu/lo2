import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { IArticlePageData } from '~/interfaces';
import { Article } from '~/renderer/components/Article';
import { ArticlesContainer } from '~/renderer/components/Article/style';

export default () => {
  const [data] = usePage<IArticlePageData>('article', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

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
