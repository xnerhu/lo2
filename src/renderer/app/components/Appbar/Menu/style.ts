import styled from 'styled-components';

import { shadows } from '~/renderer/mixins';
import { MOBILE_VIEW, NAVBAR_HEIGHT } from '~/renderer/constants';

export const StyledMenu = styled.ul`
  width: 256px;
  height: auto;
  position: absolute;
  top: 54px;
  left: 0;
  padding: 8px 0px;
  margin: 0;
  z-index: 10;
  background-color: #fff;
  border-radius: 6px;
  opacity: 0;
  pointer-events: none;
  transition: 0.1s opacity;
  box-shadow: ${shadows(4)};

  @media(max-width: ${MOBILE_VIEW}px) {
    width: 100%;
    position: relative;
    box-shadow: unset;
    background-color: transparent;
  }
`;

export const MenuItem = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.1s background-color;

  &:hover {
    background-color: #f5f5f5;
  }

  @media(max-width: ${MOBILE_VIEW}px) {
    height: ${NAVBAR_HEIGHT}px;
  }
`;
