import styled from 'styled-components';

import { NEWS_GRID_GAP } from '~/renderer/constants';

export const StyledNewsGrid = styled.div`
  width: 100%;
  column-count: 4;
  grid-gap: ${NEWS_GRID_GAP}px;
  margin-top: -${NEWS_GRID_GAP}px;

  & > * {
    margin-top: ${NEWS_GRID_GAP}px;
  }
`;
