import styled from 'styled-components';

import { NEWS_GRID_GAP, MOBILE_VIEW } from '~/renderer/constants';

export const StyledNewsGrid = styled.div`
  width: 100%;
  column-count: 4;
  grid-gap: ${NEWS_GRID_GAP}px;
  margin-top: -${NEWS_GRID_GAP}px;

  & > * {
    margin-top: ${NEWS_GRID_GAP}px;
  }

  @media (max-width: 1366px) {
    column-count: 3;
  }

  @media (max-width: ${MOBILE_VIEW}px) {
    column-count: 2;
  }

  @media (max-width: 872px) {
    column-count: 1;
  }
`;
