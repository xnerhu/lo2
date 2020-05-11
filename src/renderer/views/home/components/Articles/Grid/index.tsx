import React from 'react';

import { IArticle } from '~/interfaces';
import { ArticleCard } from '../Card';
import { StyledArticlesGrid } from './style';

export const ArticlesGrid = ({ items }: { items: IArticle[] }) => {
  return (
    <StyledArticlesGrid>
      {items.map((r) => (
        <ArticleCard key={r._id} data={r} />
      ))}
    </StyledArticlesGrid>
  );
};
