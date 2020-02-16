import React from 'react';

import { INews } from '~/interfaces';
import { NewsCard } from '../NewsCard';
import { StyledNewsGrid } from './style';

interface Props {
  items: INews[];
  renderLast?: boolean;
}

export const NewsGrid = ({ items, renderLast }: Props) => {
  if (!items) return null;

  return (
    <StyledNewsGrid renderLast={renderLast !== false}>
      {items.map(r => (
        <NewsCard key={r.id} data={r} />
      ))}
    </StyledNewsGrid>
  );
};
