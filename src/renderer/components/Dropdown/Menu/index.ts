import styled, { css } from 'styled-components';

import { EASING_FUNCTION, CARD_SHADOW } from '~/renderer/constants/design';
import { noButtons } from '~/renderer/mixins/scroll';
import { transparency } from '~/renderer/constants/transparency';

export const Menu = styled.div`
  width: 256px;
  max-height: 264px;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 8px;
  position: absolute;
  top: 100%;
  z-index: 1;
  left: 0;
  padding: 8px 0px;
  transition-timing-function: ${EASING_FUNCTION};
  box-shadow: ${CARD_SHADOW};
  border: 1px solid rgba(0, 0, 0, 0.08);
  opacity: 0;
  pointer-events: none;
  margin-top: -8px;
  ${noButtons()};

  &.expanded {
    opacity: 1;
    pointer-events: auto;
    margin-top: 4px;
    transition: 0.2s opacity, 0.1s margin-top;
  }
`;

export const MenuItem = styled.div`
  width: 100%;
  padding: 12px 16px;
  font-size: 13px;
  color: rgba(0, 0, 0, ${transparency.text.high});
  will-change: background-color;
  transition: 0.1s background-color;

  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.12);
  }
`;
