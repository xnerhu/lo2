import styled from 'styled-components';

import { Grid } from '~/renderer/components/Section';

export const StyledArticlesGrid = styled(Grid)`
  @media (min-width: 858px) and (max-width: 1229px), (min-width: 1602px) {
    & > .article-card:last-child {
      display: none;
    }
  }

  @media (max-width: 857px) {
    grid-template-columns: unset;
  }
`;
