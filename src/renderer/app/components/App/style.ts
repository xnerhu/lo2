import styled from 'styled-components';

import { CONTENT_WIDTH } from '~/renderer/constants';

export const StyledApp = styled.div`
  width: 100%;
  max-width: ${CONTENT_WIDTH}px;
  margin: 0 auto;

  @media(max-width: ${CONTENT_WIDTH + 48 * 2}px) {
    max-width: calc(100% - 128px);
  }

  @media(max-width: 767px) {
    max-width: calc(100% - 96px);
  }
`;
