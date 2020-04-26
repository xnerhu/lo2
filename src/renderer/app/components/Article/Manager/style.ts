import styled, { css } from 'styled-components';

import { CARD_SHADOW } from '~/renderer/constants/design';
import { robotoMedium } from '~/renderer/mixins/typography';
import { noUserSelect } from '~/renderer/mixins/user-selection';

export const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.64);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  will-change: opacity;
  transition: 0.1s opacity;

  ${({ toggled }: { toggled: boolean }) => css`
    opacity: ${toggled ? 1 : 0};
    pointer-events: ${toggled ? 'auto' : 'none'};
  `}
`;

export const StyledDialog = styled.div`
  width: 100%;
  max-width: 448px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: ${CARD_SHADOW};
`;

export const Title = styled.div`
  font-size: 24px;
  padding: 24px;
  ${robotoMedium()};
  ${noUserSelect()};
`;

export const DialogButtons = styled.div`
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  padding-right: 16px;

  & > div {
    min-width: 96px;
  }

  & > :first-child {
    margin-left: auto;
    margin-right: 4px;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;

  & > div:first-child {
    margin-right: 16px;
  }
`;
