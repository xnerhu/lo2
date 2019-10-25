import styled from 'styled-components';

import { aspectRatio } from '~/renderer/mixins';
import { WIDE_RATIO, STANDARD_RATIO } from '~/renderer/constants';

export const StyledCard = styled.article`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 6px 16px 0px rgba(0, 0, 0, 0.12);
  transition: 0.1s transform;

  &:hover {
    transform: scale(1.05);
  }
`;

export const CardsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-gap: 48px;
  grid-row-gap: 48px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 48px;

  @media(max-width: 1365px) {
    grid-template-columns: repeat(2, 1fr);

    & .dynamic-image {
      ${aspectRatio(WIDE_RATIO)};
    }
  }

  @media(max-width: 1079px) {
    grid-template-columns: repeat(2, 1fr);

    & .dynamic-image {
      ${aspectRatio(STANDARD_RATIO)};
    }
  }

  @media(max-width: 676px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
