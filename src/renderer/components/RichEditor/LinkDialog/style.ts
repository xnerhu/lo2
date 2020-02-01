import styled, { css } from 'styled-components';

import { CARD_SHADOW } from '~/renderer/constants';
import { Button } from '../../Button';

export const StyledDialog = styled.div`
  width: 100%;
  max-width: 384px;
  border-radius: 8px;
  box-shadow: ${CARD_SHADOW};
  background-color: #fff;
  padding: 16px;
  position: absolute;
  z-index: 10;

  ${({ visible }: { visible: boolean }) => css`
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? 'auto' : 'none'};
  `}
`;

export const Title = styled.div`
  font-size: 16px;
`;

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ApplyButton = styled(Button)`
  min-width: 96px;
  height: 36px;
  font-size: 14px;
  margin-left: 8px;
`;
