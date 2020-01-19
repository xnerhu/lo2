import * as React from 'react';

import { INews } from '~/interfaces';
import { NewsCard } from '../NewsCard';
import { StyledNewsGrid } from './style';

interface Props {
  items: INews[];
}

export const NewsGrid = ({ items }: Props) => {
  return (
    <StyledNewsGrid>
      {items.map(r => (
        <NewsCard key={r._id} data={r} />
      ))}
    </StyledNewsGrid>
  );
};
