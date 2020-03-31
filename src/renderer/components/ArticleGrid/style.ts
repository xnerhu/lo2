import styled, { css } from 'styled-components';

import { NEWS_GRID_GAP } from '~/renderer/constants/design';

const showLastCard = css`
  & > .article-card:last-child {
    display: flex;
  }
`;

export const StyledArticleGrid = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: ${NEWS_GRID_GAP}px;
  grid-column-gap: ${NEWS_GRID_GAP}px;
  grid-template-columns: repeat(auto-fill, minmax(348px, 1fr));

  ${({ renderLast }: { renderLast: boolean }) => css`
    ${!renderLast &&
    css`
      & > .article-card:last-child {
        display: none;
      }

      @media (min-width: 1230px) and (max-width: 1601px) {
        ${showLastCard}
      }

      @media (max-width: 872px) {
        ${showLastCard}
      }
    `}
  `}

  @media (max-width: 872px) {
    grid-template-columns: unset;
  }
`;
