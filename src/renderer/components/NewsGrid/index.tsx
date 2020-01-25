import * as React from 'react';

import { INews } from '~/interfaces';
import { NewsCard } from '../NewsCard';
import { StyledNewsGrid } from './style';

interface Props {
  items: INews[];
}

export const NewsGrid = ({ items }: Props) => {
  if (!items) return null;

  return (
    <StyledNewsGrid>
      {items.map(r => (
        <NewsCard key={r.id} data={r} />
      ))}
    </StyledNewsGrid>
  );
};
