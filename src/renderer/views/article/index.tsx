import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { IArticlePageData } from '~/interfaces';
import { Background } from '~/renderer/components/Section';
import { Article } from '~/renderer/components/Article';
import { ArticlesContainer } from '~/renderer/components/Article/style';

export default () => {
  const [data] = usePage<IArticlePageData>('article', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

  return (
    <Background>
      <ArticlesContainer>
        <Article
          data={data?.article}
          user={data?.author}
          category={data?.category}
        />
      </ArticlesContainer>
    </Background>
  );
};
