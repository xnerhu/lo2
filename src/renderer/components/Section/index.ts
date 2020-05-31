import styled from 'styled-components';

import { CONTENT_WIDTH } from '~/renderer/constants/design';
import { robotoMedium } from '~/renderer/mixins/typography';

export const Content = styled.div`
  width: 100%;
  max-width: ${CONTENT_WIDTH}px;
  margin: 0 auto;

  @media (max-width: ${CONTENT_WIDTH + 256}px) {
    max-width: calc(100% - 128px);
  }

  @media (max-width: 767px) {
    max-width: calc(100% - 64px);
  }
`;

export const Background = styled.div`
  width: 100%;
  background-color: #fff;
`;

export const SectionTitle = styled.h5`
  display: flex;
  position: relative;
  padding: 36px 0px;
  ${robotoMedium()};
`;

export const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 24px;
  grid-template-columns: repeat(auto-fill, minmax(348px, 1fr));
`;
