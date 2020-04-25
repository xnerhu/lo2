import React from 'react';

import { INewsPageData } from '~/interfaces';
import { Background } from '~/renderer/components/Section';
import { Pagination } from '../Pagination';
import { ArticleList } from '~/renderer/components/ArticleList';
import { StyledArticles } from './style';

interface Props {
  data: INewsPageData;
}

export const List = ({ data }: Props) => {
  const { articles, categories, users } = data;

  return (
    <Background>
      <StyledArticles>
        {articles?.map((r) => (
          <ArticleList
            key={r.id}
            data={r}
            category={categories.find((x) => x.id === r.categoryId)}
            user={users.find((x) => x.id === r.authorId)}
          />
        ))}
        <Pagination nextPage={data.nextPage} />
      </StyledArticles>
    </Background>
  );
};
