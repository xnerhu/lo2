import styled from 'styled-components';

import { CONTENT_WIDTH } from '~/renderer/constants/design';

export const Container = styled.div`
  width: 100%;
  max-width: ${CONTENT_WIDTH}px;
  height: 100%;
  display: flex;
  margin: 0 auto;
`;

export const StyledArticles = styled.div`
  width: 100%;
  max-width: 768px;
  margin: 0 auto;
`;
