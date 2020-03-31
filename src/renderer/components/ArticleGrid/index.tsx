import React from 'react';

import { INews } from '~/interfaces';
import { ArticleCard } from '../ArticleCard';
import { StyledArticleGrid } from './style';

interface Props {
  items: INews[];
  renderLast?: boolean;
}

export const ArticleGrid = ({ items, renderLast }: Props) => {
  if (!items) return null;

  return (
    <StyledArticleGrid renderLast={renderLast !== false}>
      {items.map((r) => (
        <ArticleCard key={r.id} data={r} />
      ))}
    </StyledArticleGrid>
  );
};
