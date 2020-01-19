import styled from 'styled-components';

import { NEWS_GRID_GAP } from '~/renderer/constants';

export const StyledNewsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: ${NEWS_GRID_GAP}px;
  grid-column-gap: ${NEWS_GRID_GAP}px;
  grid-template-columns: repeat(auto-fill, minmax(348px, 1fr));

  @media (max-width: 872px) {
    grid-template-columns: unset;
  }
`;
