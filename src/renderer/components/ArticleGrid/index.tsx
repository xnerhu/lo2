import React from 'react';

import { INews } from '~/interfaces';
import { ArticleCard } from '../ArticleCard';
import { StyledNewsGrid } from './style';

interface Props {
  items: INews[];
  renderLast?: boolean;
}

export const ArticleGrid = ({ items, renderLast }: Props) => {
  if (!items) return null;

  return (
    <StyledNewsGrid renderLast={renderLast !== false}>
      {items.map((r) => (
        <ArticleCard key={r.id} data={r} />
      ))}
    </StyledNewsGrid>
  );
};
