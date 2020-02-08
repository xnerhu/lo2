import styled from 'styled-components';

import { PRIMARY_COLOR, EASING_FUNCTION } from '~/renderer/constants';

export const StyledProgressbar = styled.div`
  width: 100%;
  max-width: 512px;
  height: 4px;
  position: relative;
`;

const BarBase = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${PRIMARY_COLOR};
`;

export const Background = styled(BarBase)`
  opacity: 0.6;
`;

export const Bar = styled(BarBase)`
  position: absolute;
  top: 0;
  left: 0;
  will-change: width;
  transition: 0.1s ${EASING_FUNCTION} width;
`;
