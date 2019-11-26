import styled, { css } from 'styled-components';

import { noUserSelect } from '~/renderer/mixins';
import { GRADIENT, CONTENT_WIDTH } from '~/renderer/constants';

export const Section = styled.section`
  width: 100%;
  margin-top: 32px;
`;

export const SectionTitle = styled.h5`
  width: fit-content;
  position: relative;
  padding-bottom: 8px;
  margin-bottom: 24px;
  ${noUserSelect()};

  &::after {
    content: '';
    display: block;
    width: 100%;
    max-width: 128px;
    height: 2px;
    position: absolute;
    bottom: 0;
    background: ${GRADIENT};
  }
`;

export const Content = styled.div`
  width: 100%;
  max-width: ${CONTENT_WIDTH}px;
  margin: 0 auto;

  @media(max-width: ${CONTENT_WIDTH + 48 * 2}px) {
    max-width: calc(100% - 128px);
  }

  @media(max-width: 767px) {
    max-width: calc(100% - 64px);
  }
`;

export const DarkBackground = styled.div`
  width: 100%;
  background-color: #fafafa;
`;
