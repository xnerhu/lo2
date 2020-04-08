import styled from 'styled-components';

import { NEWS_GRID_GAP } from '~/renderer/constants/design';

export const StyledArticleGrid = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: ${NEWS_GRID_GAP}px;
  grid-column-gap: ${NEWS_GRID_GAP}px;
  grid-template-columns: repeat(auto-fill, minmax(348px, 1fr));

  @media (min-width: 858px) and (max-width: 1229px), (min-width: 1602px) {
    & > .article-card:last-child {
      display: none;
    }
  }
`;
