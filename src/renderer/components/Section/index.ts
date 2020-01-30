import styled, { css } from 'styled-components';

import { noUserSelect, robotoMedium } from '~/renderer/mixins';
import { CONTENT_WIDTH } from '~/renderer/constants';

export const Section = styled.section`
  width: 100%;
  margin-top: 32px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: ${CONTENT_WIDTH}px;
  margin: 0 auto;

  @media (max-width: ${CONTENT_WIDTH + 48 * 2}px) {
    max-width: calc(100% - 128px);
  }

  @media (max-width: 767px) {
    max-width: calc(100% - 64px);
  }
`;

export const Background = styled.div`
  width: 100%;
  background-color: #fafafc;
  padding-bottom: 32px;
`;

export const SectionTitle = styled.h5`
  height: 96px;
  display: flex;
  align-items: center;
  position: relative;
  ${robotoMedium()};

  ${({ center, selectable }: { center?: boolean; selectable?: boolean }) => css`
    width: ${center ? '100%' : 'fit-content'};
    justify-content: ${center ? 'center' : 'unset'};
    ${!selectable && noUserSelect()}
  `}
`;
