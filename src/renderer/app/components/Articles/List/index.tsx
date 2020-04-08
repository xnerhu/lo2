import React from 'react';

import { INewsPageData } from '~/interfaces';
import { Background } from '~/renderer/components/Section';
import { ArticleCard } from '~/renderer/components/ArticleCard';
import { Pagination } from '../Pagination';
import { StyledArticles } from './style';

export const List = ({ data }: { data: INewsPageData }) => {
  const articles = data?.articles ?? [];

  return (
    <Background>
      <StyledArticles>
        {articles.map((r) => (
          <ArticleCard key={r.id} data={r} />
        ))}
        <Pagination nextPage={data.nextPage} />
      </StyledArticles>
    </Background>
  );
};
