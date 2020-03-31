import styled from 'styled-components';

import { NEWS_GRID_GAP } from '~/renderer/constants/design';

export const NewsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 24px;

  & > .article-card:not(:first-child) {
    margin-left: ${NEWS_GRID_GAP}px;
  }

  @media (max-width: 1024px) {
    flex-direction: column;
    justify-content: unset;
    align-items: center;

    & > .article-card {
      width: 100%;
      margin-left: 0px !important;

      &:not(:first-child) {
        margin-top: ${NEWS_GRID_GAP}px;
      }
    }
  }
`;
