import React from 'react';

import { usePage } from '~/renderer/hooks/network';
import { IArticlePageData } from '~/interfaces';
import { Content, Background } from '~/renderer/components/Section';
import { Article } from '~/renderer/components/Article';

export default () => {
  const [data] = usePage<IArticlePageData>('article', {
    shouldFetch: ({ label }, cached) => label !== cached?.label,
  });

  return (
    <Background>
      <Content>
        <Article
          data={data?.article}
          user={data?.author}
          category={data?.category}
        />
      </Content>
    </Background>
  );
};
