import styled from 'styled-components';

import { shadows } from '~/renderer/mixins';
import { MOBILE_VIEW } from '~/renderer/constants';

export const StyledMenu = styled.ul`
  width: 256px;
  height: auto;
  position: absolute;
  top: 54px;
  left: 0;
  padding: 8px 0px;
  margin: 0;
  display: none;
  z-index: 10;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: ${shadows(4)};

  /* @media(max-width: ${MOBILE_VIEW}px) {
    width: 100%;
    position: relative;
    top: 0px;
    box-shadow: unset;
    display: block;
    background-color: transparent;
  } */
`;

export const MenuItem = styled.li`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }

  /* @media(max-width: ${MOBILE_VIEW}px) {
    padding-left: 32px;
    height: 56px;
  } */
`;
